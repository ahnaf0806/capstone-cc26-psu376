import os
import joblib
import numpy as np
import pandas as pd
import tensorflow as tf
import google.generativeai as genai

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# =====================
# LOAD MODEL & ARTIFACTS
# =====================
print("⏳ Loading models...")
stress_model = tf.keras.models.load_model("models/stress_model.keras")
health_model = tf.keras.models.load_model("models/health_model.keras")
scaler       = joblib.load("models/scaler.pkl")
encoders     = joblib.load("models/encoders.pkl")
print("✅ Models loaded!")

# =====================
# FITUR TAMBAHAN MEMBERI REKOMENDASI 
# =====================
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    print("✅ Gemini AI configured!")
else:
    print("⚠️ GEMINI_API_KEY tidak ditemukan, rekomendasi akan pakai mode fallback.")

# =====================
# FASTAPI APP
# =====================
app = FastAPI(
    title       = "Coffee & Health Prediction API",
    description = "Prediksi tingkat stres dan kesehatan berdasarkan kebiasaan konsumsi kopi",
    version     = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["*"],
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)

# =====================
# INPUT SCHEMA
# =====================
class UserInput(BaseModel):
    Age                    : float
    Gender                 : str
    Country                : str
    Coffee_Intake          : float
    Caffeine_mg            : float
    Sleep_Hours            : float
    Sleep_Quality          : str
    BMI                    : float
    Heart_Rate             : float
    Physical_Activity_Hours: float
    Occupation             : str

# =====================
# HELPER: REKOMENDASI
# =====================
FEATURES_ORDER = [
    "Age", "Gender", "Country", "Coffee_Intake", "Caffeine_mg",
    "Sleep_Hours", "Sleep_Quality", "BMI", "Heart_Rate",
    "Physical_Activity_Hours", "Occupation",
    "Caffeine_Impact_Ratio", "BMI_Activity_Ratio", "Sleep_Deficit"
]

def preprocess(data: dict) -> np.ndarray:
    df = pd.DataFrame([data])

    # Feature engineering (sama seperti saat training)
    df["Caffeine_Impact_Ratio"] = df["Caffeine_mg"] / (df["Age"] + 1)
    df["BMI_Activity_Ratio"]    = df["BMI"] / (df["Physical_Activity_Hours"] + 1)
    df["Sleep_Deficit"]         = (df["Sleep_Hours"] < 6).astype(int)

    # Encode categorical
    for col in ["Gender", "Country", "Sleep_Quality", "Occupation"]:
        le = encoders[col]
        val = df[col][0]
        df[col] = le.transform([val]) if val in le.classes_ else [0]

    df = df[FEATURES_ORDER]
    return scaler.transform(df)


def fallback_recommendation(stress_level: str, health_status: str, u: dict) -> str:
    recs = []

    if u.get("Coffee_Intake", 0) > 4:
        recs.append("Kurangi konsumsi kopi, maksimal 2-3 cangkir/hari.")
    elif u.get("Coffee_Intake", 0) > 2 and stress_level == "High":
        recs.append("Batasi kopi 1-2 cangkir/hari karena stres tinggi.")
    else:
        recs.append("Konsumsi kopi sudah dalam batas wajar.")

    if u.get("Sleep_Hours", 0) < 6:
        recs.append("Durasi tidur sangat kurang, targetkan minimal 7-8 jam/malam.")
    elif u.get("Sleep_Hours", 0) < 7:
        recs.append("Tingkatkan durasi tidur ke 7-8 jam untuk pemulihan optimal.")
    else:
        recs.append("Durasi tidur sudah baik, pertahankan.")

    if stress_level == "High":
        recs.append("Stres tinggi terdeteksi — coba meditasi atau pernapasan dalam 10 menit/hari.")
    elif stress_level == "Medium":
        recs.append("Stres sedang — kurangi kafein malam hari dan perbanyak aktivitas fisik ringan.")

    if u.get("Physical_Activity_Hours", 0) < 2:
        recs.append("Mulai dengan jalan kaki 30 menit/hari untuk meningkatkan kesehatan.")

    if health_status == "Fatigue":
        recs.append("Kelelahan terdeteksi — perbanyak minum air putih dan pastikan istirahat cukup.")
    elif health_status == "Headache":
        recs.append("Sakit kepala sering terjadi akibat kafein berlebih — kurangi dan perbanyak air putih.")

    return "\n".join(f"{i+1}. {r}" for i, r in enumerate(recs))


def generate_recommendation(stress_level: str, health_status: str, u: dict) -> str:
    if not GEMINI_API_KEY:
        return fallback_recommendation(stress_level, health_status, u)

    try:
        gemini_model = genai.GenerativeModel("gemini-2.5-flash")
        prompt = f"""
Kamu adalah asisten kesehatan digital yang ahli di bidang nutrisi, tidur, dan manajemen stres.
Berikan rekomendasi personal yang spesifik, praktis, dan mudah diterapkan berdasarkan data pengguna berikut:

- Tingkat Stres     : {stress_level}
- Kondisi Kesehatan : {health_status}
- Konsumsi Kopi     : {u.get('Coffee_Intake', 0)} cangkir/hari
- Kafein            : {u.get('Caffeine_mg', 0)} mg/hari
- Jam Tidur         : {u.get('Sleep_Hours', 0)} jam
- Kualitas Tidur    : {u.get('Sleep_Quality', '-')}
- BMI               : {u.get('BMI', 0)}
- Detak Jantung     : {u.get('Heart_Rate', 0)} bpm
- Aktivitas Fisik   : {u.get('Physical_Activity_Hours', 0)} jam/hari
- Pekerjaan         : {u.get('Occupation', '-')}

Berikan tepat 5 rekomendasi konkret dalam Bahasa Indonesia dengan format:
1. [rekomendasi pertama]
2. [rekomendasi kedua]
dst.
"""
        response = gemini_model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"⚠️  Gemini error: {e}, menggunakan fallback.")
        return fallback_recommendation(stress_level, health_status, u)


# =====================
# ROUTES
# =====================
@app.get("/")
def home():
    return {
        "status"   : "API is running",
        "title"    : "Coffee & Health Prediction API",
        "endpoints": {
            "GET  /"       : "Info API",
            "GET  /health" : "Health check",
            "POST /predict": "Prediksi stress & health",
            "GET  /docs"   : "Swagger UI"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "OK", "message": "API berjalan normal"}


@app.post("/predict")
def predict(data: UserInput):
    try:
        input_dict   = data.dict()
        input_scaled = preprocess(input_dict)

        # Stress prediction
        stress_pred  = stress_model.predict(input_scaled, verbose=0)
        stress_class = int(np.argmax(stress_pred))
        stress_prob  = float(np.max(stress_pred))
        stress_label = encoders["Stress_Level"].inverse_transform([stress_class])[0]

        # Health prediction
        health_pred  = health_model.predict(input_scaled, verbose=0)
        health_class = int(np.argmax(health_pred))
        health_prob  = float(np.max(health_pred))
        health_label = encoders["Health_Issues"].inverse_transform([health_class])[0]

        # Recommendation
        recommendation = generate_recommendation(stress_label, health_label, input_dict)

        return {
            "status"             : "success",
            "stress_level"       : stress_label,
            "stress_probability" : round(stress_prob, 4),
            "health_status"      : health_label,
            "health_probability" : round(health_prob, 4),
            "recommendation"     : recommendation
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}
