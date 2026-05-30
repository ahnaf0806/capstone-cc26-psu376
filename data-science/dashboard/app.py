import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt 
import seaborn as sns

st.set_page_config(page_title="Dashboard Kopi & Kesehatan", page_icon="☕", layout="wide")

#judul dashboard
st.title("Capstone CC26-PSU376 - Dashboard Kopi & Kesehatan")
st.markdown("Selamat datang di dashboard interaktif! Aplikasi ini menampilkan hasil analisis pengaruh konsumsi kafein dan gaya hidup terhadap risiko masalah kesehatan.")

# Load data
@st.cache_data
def load_data():
    df = pd.read_csv("data-science/data/dataset_kopi.csv")
    return df 

df=load_data()

#menampilakn cuplikan data
if st.checkbox("Tampilkan Cuplikan Data"):
    st.write(df.head())

st.divider()

# Analisis 1: Konsumsi Kafein vs durasi dan kualitas tidur pengguna
st.subheader("1. Pengaruh Konsumsi Kafein terhadap Durasi dan Kualitas Tidur")
st.markdown("**Pertanyaan Bisnis:** Bagaimana pola pengaruh jumlah konsumsi kafein (kopi) terhadap kualitas tidur pengguna?")
# Membuat layout kolom agar lebih rapi (Grafik di kiri, Penjelasan di kanan)
col1, col2 = st.columns([2, 1])

with col1:
    fig1, ax1 = plt.subplots(figsize=(8, 5))
    sns.barplot(x='Sleep_Quality', y='Caffeine_mg', data=df, errorbar=None, palette='Blues', ax=ax1)
    ax1.set_title('Rata-rata Konsumsi Kafein berdasarkan Kualitas Tidur', fontsize=12)
    ax1.set_xlabel('Kualitas Tidur', fontsize=10)
    ax1.set_ylabel('Rata-rata Konsumsi Kafein (mg)', fontsize=10)
    st.pyplot(fig1)

with col2:
    st.info("""
    **Insight:**
    Berdasarkan visualisasi di samping, dapat dilihat bahwa terdapat korelasi antara konsumsi kafein yang tinggi dengan kualitas tidur yang buruk.
    
    Pengguna yang memiliki kualitas tidur **'Poor' (Buruk)** mencatat rata-rata asupan kafein tertinggi, sedangkan pengguna dengan kualitas tidur **'Excellent' (Sangat Baik)** memiliki rata-rata asupan kafein yang jauh lebih rendah.
    """)

st.divider()

# Analisis 2: korelasi konsumsi kopi harian dengan tingkat stress
st.header("2. Korelasi Konsumsi Kopi dengan Tingkat Stres")
st.markdown("**Pertanyaan Bisnis:** Apakah tingkat konsumsi kopi harian yang tinggi akan berkorelasi terhadap tingkat stres seseorang?")

col3, col4 = st.columns([2, 1])

with col3:
    fig2, ax2 = plt.subplots(figsize=(8, 5))
    sns.barplot(x='Stress_Level', y='Coffee_Intake', data=df, errorbar=None, palette='Reds', ax=ax2)
    ax2.set_title('Rata-rata Konsumsi Kopi berdasarkan Tingkat Stres', fontsize=12)
    ax2.set_xlabel('Tingkat Stres', fontsize=10)
    ax2.set_ylabel('Rata-rata Konsumsi Kopi (cangkir/hari)', fontsize=10)
    st.pyplot(fig2)

with col4:
    st.success("""
    **Insight:**
    Visualisasi ini menunjukan hubungan positif antara tingkat konsumsi kopi dengan tingkat stres.
    
    Responden dengan tingkat stres **"High" (Tinggi)** rata-rata mengonsumsi kopi lebih banyak (sekitar 2.9 cangkir per hari) dibandingkan dengan responden yang memiliki tingkat stres **"Low" (Rendah)** yang hanya mengonsumsi sekitar 2.3 cangkir per hari.
    """)


# Analisis 3: korelasi konsumsi kopi dan rendahnya durasi tidur dengan resiko masalah kesehatan
st.subheader("3. Dampak Konsumsi Kopi terhadap Kualitas Tidur")
st.markdown("Grafik ini menunjukkan sebaran konsumsi kopi harian berdasarkan kualitas tidur pengguna.")

col5, col6 = st.columns([2, 1])
with col5:
    fig1, ax1 = plt.subplots(figsize=(10, 5))
    sns.violinplot(data=df, x='Sleep_Quality', y='Coffee_Intake', palette='Pastel1', inner="quart", ax=ax1)
    ax1.set_xlabel('Kualitas Tidur')
    ax1.set_ylabel('Konsumsi Kopi (Cangkir/hari)')
    st.pyplot(fig1) # Render grafik ke Streamlit

with col6: #nanti benerin, ini cuman kreangka aja
    st.warning("""
    **Insight:**
    Grafik violin ini menunjukkan bahwa pengguna dengan kualitas tidur yang buruk cenderung memiliki konsumsi kopi yang lebih tinggi dan lebih bervariasi dibandingkan dengan pengguna yang memiliki kualitas tidur yang baik.
    
    Pengguna dengan kualitas tidur **"Poor" (Buruk)** menunjukkan distribusi konsumsi kopi yang lebih lebar, dengan beberapa individu mengonsumsi hingga 5 cangkir per hari, sementara pengguna dengan kualitas tidur **"Excellent" (Sangat Baik)** cenderung mengonsumsi kopi dalam jumlah yang lebih rendah dan lebih konsisten.
    """)

# Analisis 4:BMI tinggi dan aktivitas fisik rendah dengan detak jantung tinggi
st.subheader("4. Beban Fisiologis: BMI vs Detak Jantung")
st.markdown("Menunjukkan bagaimana tingkat stres memperparah dampak BMI terhadap detak jantung pengguna.")

col7, col8 = st.columns([2, 1])

with col7:
    fig3, ax3 = plt.subplots(figsize=(10, 5))
    sns.scatterplot(data=df, x='BMI', y='Heart_Rate', hue='Stress_Level', palette='coolwarm', alpha=0.5, ax=ax3)
    # Streamlit sedikit kesulitan dengan sns.lmplot karena lmplot memanggil figure baru,
    # jadi kita gunakan scatterplot biasa di sini atau regplot.
    sns.regplot(data=df[df['Stress_Level'] == 'High'], x='BMI', y='Heart_Rate', scatter=False, color='red', ax=ax3, label='Tren Stres Tinggi')
    sns.regplot(data=df[df['Stress_Level'] == 'Low'], x='BMI', y='Heart_Rate', scatter=False, color='blue', ax=ax3, label='Tren Stres Rendah')
    ax3.set_xlabel('Body Mass Index (BMI)')
    ax3.set_ylabel('Detak Jantung (BPM)')
    ax3.legend()
    st.pyplot(fig3)

with col8:#baru kerangka
    st.error("""
    **Insight:**
    Terdapat korelasi positif yang nyata antara peningkatan Body Mass Index (BMI) dengan tingginya Detak Jantung (Heart Rate). Yang lebih mengkhawatirkan, korelasi ini menjadi jauh lebih ekstrem pada kelompok pengguna yang memiliki Tingkat Stres Tinggi ("High").
    """)

# Analisis 5: konsumsi kopi tinggi dengan tingkat stress tinggi
st.subheader("5. Interaksi Kafein, Durasi Tidur, dan Masalah Kesehatan")
st.markdown("Titik-titik di bawah ini memetakan pengguna berdasarkan asupan kafein dan durasi tidur mereka.")

col9, col10 = st.columns([2, 1])

with col9:
    fig2, ax2 = plt.subplots(figsize=(10, 5))
    sns.scatterplot(data=df, x='Caffeine_mg', y='Sleep_Hours', hue='Health_Issues', palette='Set1', alpha=0.6, ax=ax2)
    ax2.set_xlabel('Asupan Kafein (mg)')
    ax2.set_ylabel('Durasi Tidur (Jam)')
    st.pyplot(fig2)

with col10: #masih kerangka, nanti benerin
    st.info("""
    **Insight:**
    Grafik ini menunjukkan distribusi asupan kafein dan durasi tidur pengguna, dengan warna yang menunjukkan keberadaan masalah kesehatan.
    
    Pengguna dengan masalah kesehatan cenderung memiliki asupan kafein yang lebih tinggi dan durasi tidur yang lebih pendek dibandingkan dengan pengguna tanpa masalah kesehatan.
    """)

# Footer
st.divider()
st.caption("Dibuat oleh Tim Data Science CC26-PSU376 (Dini & Putri)")