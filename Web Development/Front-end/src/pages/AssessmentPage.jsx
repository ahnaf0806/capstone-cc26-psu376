import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { ArrowRight, ArrowLeft, User, Coffee, Activity } from "lucide-react";
import { predictionService } from "../service/predictionService";
import { useAuthStore } from "../store/authStore";

const coffeeTypeOptions = [
  { value: "Espresso", label: "Espresso : 60-80 mg" },
  { value: "Kopi Instan", label: "Kopi Instan : 60-100 mg" },
  { value: "Latte / Cappuccino", label: "Latte/Cappucino : 60-125 mg" },
  { value: "Cold Brew", label: "Cold Brew : 100-200 mg" },
];

const activityOptions = [
  { key: "Sedentary", label: "SEDENTARY", sublabel: "<1 Jam/Minggu", icon: "🪑" },
  { key: "Lightly Active", label: "LIGHTLY ACTIVE", sublabel: "1-3 Jam/Minggu", icon: "🚶" },
  { key: "Very Active", label: "VERY ACTIVE", sublabel: "4-8 Jam/Minggu", icon: "🏃" },
  { key: "Athlete", label: "ATHLETE", sublabel: ">8 Jam/Minggu", icon: "⚡" },
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: "",
      weight: "",
      height: "",
      sex: "",
      dailyCups: "",
      lastConsumptionTime: "",
      coffeeType: "",
      sleepHours: "7",
      activityLevel: "",
      stressLevel: "3",
      caffeineSensitivity: "",
      sleepDisorder: false,
      anxiety: false,
      goal: "",
    },
  });

  const selectedSex = watch("sex");
  const selectedCoffeeType = watch("coffeeType");
  const selectedActivityLevel = watch("activityLevel");
  const sleepHoursValue = watch("sleepHours");
  const stressLevelValue = watch("stressLevel");
  const selectedCaffeineSensitivity = watch("caffeineSensitivity");
  const selectedGoal = watch("goal");
  const sleepDisorderOn = watch("sleepDisorder");
  const anxietyOn = watch("anxiety");

  // Handles per-step validation before progressing
  const handleNextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = ["age", "weight", "height", "sex"];
    } else if (step === 2) {
      fieldsToValidate = ["dailyCups", "coffeeType", "activityLevel"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  // Sleep labels helper
  const getSleepLabel = (val) => {
    const v = Number(val);
    if (v < 6) return { label: `${v} Jam`, color: "#e05a2b" };
    if (v <= 9) return { label: `${v} Jam`, color: "#1b6d24" };
    return { label: `${v} Jam`, color: "#e05a2b" };
  };

  // Stress label helper
  const getStressLabel = (val) => {
    const v = Number(val);
    if (v <= 3) return "Rendah";
    if (v <= 6) return "Moderat";
    return "Tinggi";
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    // Show confirmation modal first
    setPendingData(data);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    // Cek status login dari Zustand
    const isLoggedIn = useAuthStore.getState().isLoggedIn;

    try {
      if (!isLoggedIn) {
        // ── OPSI B: belum login → simpan form ke sessionStorage, redirect ke register ──
        sessionStorage.setItem(
          "pendingAssessment",
          JSON.stringify(pendingData),
        );
        navigate("/register");
        return;
      }

      // ── Sudah login → langsung kirim ke backend ──
      const response = await predictionService.create(pendingData);

      // Navigate ke ResultPage dengan data hasil
      navigate("/result", { state: { result: response.data } });
    } catch (error) {
      console.error("Submission Error:", error);
      const message =
        error.response?.data?.message ||
        "Gagal mengirim data. Silakan coba lagi.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#fdf5ea] flex flex-col font-sans overflow-x-hidden text-[#030712]">
        {/* Navbar: High-Fidelity Figma Styling in Indonesian */}
        <Header />

        {/* Main Form Box Container */}
        <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5 px-4">
          <div className="w-full max-w-[768px] d-flex flex-col gap-4">
            {/* Step Progress Tracker in Indonesian */}
            <div className="d-flex flex-col gap-2 w-100 mb-2">
              <div className="d-flex justify-content-between align-items-center w-full">
                <span
                  className="text-[#553722] fw-bold tracking-widest uppercase text-xs"
                  style={{ fontSize: "12px" }}
                >
                  {step === 1 && "PROFIL FISIK"}
                  {step === 2 && "KONSUMSI & GAYA HIDUP"}
                  {step === 3 && "RIWAYAT KESEHATAN & TUJUAN"}
                </span>
                <span
                  className="text-[#50453e] fw-medium text-xs"
                  style={{
                    fontSize: "12px",
                    fontStyle: step >= 2 ? "italic" : "normal",
                  }}
                >
                  {step >= 2
                    ? "KopiMetric Analisis kebutuhan kafein"
                    : `Langkah ${step} dari 3`}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div
                className="bg-[#eae7e7] w-full rounded-full overflow-hidden"
                style={{ height: "8px" }}
              >
                <div
                  className="bg-[#1b6d24] h-100 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Card Content with Animations */}
            <div className="bg-white border border-[#d4c3ba] p-4 sm:p-5 rounded-4 shadow-sm relative transition-all duration-300">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* STEP 1: PROFIL FISIK */}
                {step === 1 && (
                  <div className="d-flex flex-col gap-4 animate-fade-in">
                    {/* Step Header */}
                    <div className="d-flex gap-3 align-items-center mb-2">
                      <div
                        className="bg-[#a0f399] rounded-circle d-inline-flex align-items-center justify-content-center text-[#1b6d24] shrink-0"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="fs-4 fw-bold text-[#553722] m-0">
                          Data Fisik
                        </h3>
                        <p className="fs-6 text-[#50453e] m-0">
                          Beritahu kami tentang kondisi fisiologis dasar Anda.
                        </p>
                      </div>
                    </div>

                    {/* Input Grid */}
                    <div className="row g-4">
                      <div className="col-12 col-sm-4">
                        <label
                          className="form-label text-dark fw-medium mb-1.5"
                          style={{ fontSize: "13.5px" }}
                        >
                          Umur (Tahun)
                        </label>
                        <input
                          type="number"
                          min="12"
                          max="90"
                          placeholder="contoh: 28"
                          className={`form-control py-2.5 px-3 border rounded-3 text-dark focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 ${errors.age ? "border-danger" : "border-[#d4c3ba]"}`}
                          style={{ fontSize: "15px" }}
                          onKeyDown={(e) => {
                            if (["-", "e", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const paste = e.clipboardData.getData("text");
                            if (paste.includes("-")) {
                              e.preventDefault();
                            }
                          }}
                          {...register("age", {
                            required: "Umur wajib diisi",
                            min: {
                              value: 12,
                              message: "Minimal berumur 12 tahun",
                            },
                            max: {
                              value: 90,
                              message: "Maksimal berumur 90 tahun",
                            },
                          })}
                        />
                        {errors.age && (
                          <span className="text-danger text-xs mt-1 d-block">
                            {errors.age.message}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-sm-4">
                        <label
                          className="form-label text-dark fw-medium mb-1.5"
                          style={{ fontSize: "13.5px" }}
                        >
                          Berat Badan (kg)
                        </label>
                        <input
                          type="number"
                          min="30"
                          max="200"
                          placeholder="contoh: 72"
                          className={`form-control py-2.5 px-3 border rounded-3 text-dark focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 ${errors.weight ? "border-danger" : "border-[#d4c3ba]"}`}
                          style={{ fontSize: "15px" }}
                          onKeyDown={(e) => {
                            if (["-", "e", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const paste = e.clipboardData.getData("text");
                            if (paste.includes("-")) {
                              e.preventDefault();
                            }
                          }}
                          {...register("weight", {
                            required: "Berat badan wajib diisi",
                            min: { value: 30, message: "Berat minimal 30 kg" },
                            max: {
                              value: 200,
                              message: "Berat maksimal 200 kg",
                            },
                          })}
                        />
                        {errors.weight && (
                          <span className="text-danger text-xs mt-1 d-block">
                            {errors.weight.message}
                          </span>
                        )}
                      </div>

                      {/* ↓↓↓ FIELD BARU: HEIGHT ↓↓↓ */}
                      <div className="col-12 col-sm-4">
                        <label
                          className="form-label text-dark fw-medium mb-1.5"
                          style={{ fontSize: "13.5px" }}
                        >
                          Tinggi Badan (cm)
                        </label>
                        <input
                          type="number"
                          min="100"
                          max="230"
                          placeholder="contoh: 175"
                          className={`form-control py-2.5 px-3 border rounded-3 text-dark focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 ${errors.height ? "border-danger" : "border-[#d4c3ba]"}`}
                          style={{ fontSize: "15px" }}
                          onKeyDown={(e) => {
                            if (["-", "e", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const paste = e.clipboardData.getData("text");
                            if (paste.includes("-")) {
                              e.preventDefault();
                            }
                          }}
                          {...register("height", {
                            required: "Tinggi badan wajib diisi",
                            min: {
                              value: 100,
                              message: "Tinggi minimal 100 cm",
                            },
                            max: {
                              value: 230,
                              message: "Tinggi maksimal 230 cm",
                            },
                          })}
                        />
                        {errors.height && (
                          <span className="text-danger text-xs mt-1 d-block">
                            {errors.height.message}
                          </span>
                        )}
                      </div>

                      <div className="col-12">
                        <label
                          className="form-label text-dark fw-medium mb-1.5"
                          style={{ fontSize: "13.5px" }}
                        >
                          Jenis Kelamin Biologis
                        </label>
                        <div className="row g-2">
                          {["Laki-laki", "Perempuan", "Lainnya"].map(
                            (gender) => {
                              const isActive = selectedSex === gender;
                              return (
                                <div key={gender} className="col-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setValue("sex", gender, {
                                        shouldValidate: true,
                                      })
                                    }
                                    className={`btn w-100 py-2.5 border rounded-3 fw-medium transition-all text-center ${
                                      isActive
                                        ? "bg-[#1b6d24] border-[#1b6d24] text-white shadow-sm"
                                        : "bg-white border-[#d4c3ba] text-[#1b1c1c] hover:bg-gray-50"
                                    }`}
                                    style={{ fontSize: "14.5px" }}
                                  >
                                    {gender}
                                  </button>
                                </div>
                              );
                            },
                          )}
                        </div>
                        <input
                          type="hidden"
                          {...register("sex", {
                            required:
                              "Silakan pilih jenis kelamin biologis Anda",
                          })}
                        />
                        {errors.sex && (
                          <span className="text-danger text-xs mt-2 d-block">
                            {errors.sex.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: KONSUMSI & GAYA HIDUP */}
                {step === 2 && (
                  <div className="d-flex flex-col gap-4 animate-fade-in text-[#030712]">
                    {/* Main Heading */}
                    <div className="mb-1 text-start">
                      <h3
                        className="fw-bold text-[#553722] m-0 mb-1"
                        style={{ fontSize: "28px", letterSpacing: "-0.32px" }}
                      >
                        Konsumsi &amp; Gaya Hidup
                      </h3>
                      <p
                        className="text-[#50453e] m-0"
                        style={{ fontSize: "15px" }}
                      >
                        Informasi ini membantu algoritma kami memetakan
                        metabolisme kafein Anda
                        <br className="d-none d-sm-block" /> berdasarkan ritme
                        sirkadian dan tingkat stres harian.
                      </p>
                    </div>

                    {/* Section 1: Konsumsi Kafein */}
                    <div
                      className="p-4 rounded-4 border border-[#e5e7eb] shadow-sm text-start"
                      style={{ background: "#ffffff" }}
                    >
                      <div className="d-flex gap-2 align-items-center mb-4">
                        <Coffee size={24} className="text-[#553722]" />
                        <h4
                          className="fw-bold text-[#553722] m-0"
                          style={{ fontSize: "22px" }}
                        >
                          Konsumsi Kafein
                        </h4>
                      </div>

                      {/* Frequency & Last Time Row */}
                      <div className="row g-4 mb-4">
                        <div className="col-12 col-md-6">
                          <label
                            className="form-label fw-medium text-[#1b1c1c] mb-2"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            Frekuensi Konsumsi (Harian)
                          </label>
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="15"
                              placeholder="0"
                              className={`form-control border rounded-3 text-center ${errors.dailyCups ? "border-danger" : "border-[#e5e7eb]"}`}
                              style={{
                                fontSize: "16px",
                                width: "100px",
                                height: "46px",
                                background: "#ffffff",
                              }}
                              onKeyDown={(e) => {
                                if (["-", "e", "+"].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              onPaste={(e) => {
                                const paste = e.clipboardData.getData("text");
                                if (paste.includes("-")) {
                                  e.preventDefault();
                                }
                              }}
                              {...register("dailyCups", {
                                required: "Konsumsi harian wajib diisi",
                                min: { value: 0, message: "Minimal 0 cangkir" },
                                max: {
                                  value: 15,
                                  message: "Maksimal 15 cangkir",
                                },
                              })}
                            />
                            <span
                              className="text-[#1b1c1c] fw-normal"
                              style={{ fontSize: "15px" }}
                            >
                              cangkir / hari
                            </span>
                          </div>
                          {errors.dailyCups && (
                            <span
                              className="text-danger d-block mt-1"
                              style={{ fontSize: "12px" }}
                            >
                              {errors.dailyCups.message}
                            </span>
                          )}
                        </div>

                        <div className="col-12 col-md-6">
                          <label
                            className="form-label fw-medium text-[#1b1c1c] mb-2"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            Rata-rata Waktu Konsumsi Terakhir
                          </label>
                          <input
                            type="time"
                            className="form-control border border-[#e5e7eb] rounded-3 text-dark"
                            style={{ fontSize: "16px", height: "46px", background: "#ffffff" }}
                            {...register("lastConsumptionTime")}
                          />
                        </div>
                      </div>

                      {/* Coffee Types - Pill chips */}
                      <div className="mb-2">
                        <label
                          className="form-label fw-medium text-[#1b1c1c] mb-3"
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          Jenis kopi yang sering dikonsumsi
                        </label>
                        <div className="row g-3">
                          {coffeeTypeOptions.map((opt) => {
                            const isActive = selectedCoffeeType === opt.value;
                            return (
                              <div key={opt.value} className="col-12 col-sm-6">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setValue("coffeeType", opt.value, {
                                      shouldValidate: true,
                                    })
                                  }
                                  className={`btn w-100 py-2.5 px-4 border rounded-pill transition-all text-center ${
                                    isActive
                                      ? "bg-[#1b6d24] border-[#1b6d24] text-white font-semibold shadow-sm"
                                      : "bg-white border-[#e5e7eb] text-[#374151] hover:bg-gray-50"
                                  }`}
                                  style={{
                                    fontSize: "15px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  {opt.label}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <input
                          type="hidden"
                          {...register("coffeeType", {
                            required:
                              "Pilih jenis kopi yang sering Anda konsumsi",
                          })}
                        />
                        {errors.coffeeType && (
                          <span
                            className="text-danger d-block mt-3"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.coffeeType.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Section 2: Data Gaya Hidup */}
                    <div
                      className="p-4 rounded-4 border border-[#e5e7eb] shadow-sm text-start"
                      style={{ background: "#ffffff" }}
                    >
                      <div className="d-flex gap-2 align-items-center mb-4">
                        <Activity size={24} className="text-[#553722]" />
                        <h4
                          className="fw-bold text-[#553722] m-0"
                          style={{ fontSize: "22px" }}
                        >
                          Data Gaya Hidup
                        </h4>
                      </div>

                      {/* Sleep Duration Slider */}
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label
                            className="form-label fw-medium text-[#1b1c1c] m-0"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            Durasi Tidur Rata-rata
                          </label>
                          <span
                            className="fw-bold"
                            style={{
                              fontSize: "16px",
                              color: "#1b6d24",
                            }}
                          >
                            {sleepHoursValue} Jam
                          </span>
                        </div>
                        <input
                          type="range"
                          min="3"
                          max="14"
                          step="0.5"
                          className="w-100 custom-range-slider"
                          style={{
                            accentColor: "#1b6d24",
                            height: "8px",
                            cursor: "pointer",
                            borderRadius: "9999px",
                            background: `linear-gradient(to right, #1b6d24 ${((sleepHoursValue - 3) / 11) * 100}%, #e5e7eb ${((sleepHoursValue - 3) / 11) * 100}%)`,
                            appearance: "none",
                            WebkitAppearance: "none",
                          }}
                          {...register("sleepHours")}
                        />
                        <div className="d-flex justify-content-between mt-2">
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#82746d",
                              fontWeight: "500",
                              letterSpacing: "0.5px",
                            }}
                          >
                            KURANG
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#82746d",
                              fontWeight: "500",
                              letterSpacing: "0.5px",
                            }}
                          >
                            OPTIMAL (7-9 JAM)
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#82746d",
                              fontWeight: "500",
                              letterSpacing: "0.5px",
                            }}
                          >
                            BERLEBIH
                          </span>
                        </div>
                      </div>

                      {/* Physical Activity Level */}
                      <div className="mb-4">
                        <label
                          className="form-label fw-medium text-[#1b1c1c] mb-3"
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          Tingkat Aktivitas Fisik
                        </label>
                        <div className="row g-2">
                          {activityOptions.map(({ key, label, sublabel, icon }) => {
                            const isActive = selectedActivityLevel === key;
                            return (
                              <div key={key} className="col-6 col-md-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setValue("activityLevel", key, {
                                      shouldValidate: true,
                                    })
                                  }
                                  className={`btn w-100 d-flex flex-column align-items-center justify-content-center gap-1 border-2 transition-all ${
                                    isActive
                                      ? "border-[#1b6d24] bg-[#d1e7dd] text-[#1b6d24]"
                                      : "bg-white border-[#e5e7eb] text-[#374151] hover:bg-gray-50"
                                  }`}
                                  style={{
                                    borderRadius: "12px",
                                    padding: "24px 12px",
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <span className="mb-1" style={{ fontSize: "24px" }}>
                                    {icon}
                                  </span>
                                  <span className="fw-bold tracking-wide" style={{ fontSize: "12.5px" }}>
                                    {label}
                                  </span>
                                  <span className="text-[#82746d]" style={{ fontSize: "11px" }}>
                                    {sublabel}
                                  </span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <input
                          type="hidden"
                          {...register("activityLevel", {
                            required: "Pilih tingkat aktivitas fisik Anda",
                          })}
                        />
                        {errors.activityLevel && (
                          <span
                            className="text-danger d-block mt-2"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.activityLevel.message}
                          </span>
                        )}
                      </div>

                      {/* Stress Level Slider */}
                      <div>
                        <label
                          className="form-label fw-medium text-[#1b1c1c] mb-3"
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          Tingkat Stres Saat Ini
                        </label>
                        <div className="d-flex flex-column w-100">
                          <div className="d-flex align-items-center gap-3">
                            <span style={{ fontSize: "24px", flexShrink: 0 }}>😊</span>
                            <div className="flex-grow-1">
                              <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                className="w-100 custom-range-slider"
                                style={{
                                  accentColor: "#1b6d24",
                                  height: "8px",
                                  cursor: "pointer",
                                  borderRadius: "9999px",
                                  background: `linear-gradient(to right, #1b6d24 ${((stressLevelValue - 1) / 9) * 100}%, #e5e7eb ${((stressLevelValue - 1) / 9) * 100}%)`,
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                }}
                                {...register("stressLevel")}
                              />
                              <div className="d-flex justify-content-between mt-2">
                                <span
                                  style={{
                                    fontSize: "11px",
                                    color: "#82746d",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  RENDAH
                                </span>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    color: "#82746d",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  MODERAT
                                </span>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    color: "#82746d",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  TINGGI
                                </span>
                              </div>
                            </div>
                            <span style={{ fontSize: "24px", flexShrink: 0 }}>😰</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: RIWAYAT KESEHATAN & TUJUAN */}
                {step === 3 && (
                  <div className="d-flex flex-col gap-4 animate-fade-in">
                    {/* Main Heading */}
                    <div className="mb-1">
                      <h3
                        className="fw-bold text-[#553722] m-0 mb-1"
                        style={{ fontSize: "28px", letterSpacing: "-0.32px" }}
                      >
                        Riwayat Kesehatan &amp; Tujuan
                      </h3>
                      <p
                        className="text-[#50453e] m-0"
                        style={{ fontSize: "15px" }}
                      >
                        Langkah terakhir untuk mengoptimalkan analisis presisi
                        Anda.
                      </p>
                    </div>

                    {/* Two-column layout */}
                    <div className="row g-3">
                      {/* LEFT: Health History Card */}
                      <div className="col-12 col-md-5">
                        <div className="d-flex flex-col gap-3">
                          {/* Health Card */}
                          <div className="bg-white border border-[#d4c3ba] rounded-3 p-4 shadow-sm">
                            <div className="d-flex gap-2 align-items-center mb-3">
                              <span style={{ fontSize: "20px" }}>🏥</span>
                              <h4
                                className="fw-bold text-[#1b1c1c] m-0"
                                style={{ fontSize: "18px" }}
                              >
                                Riwayat Kesehatan
                              </h4>
                            </div>

                            {/* Caffeine Sensitivity */}
                            <div className="mb-4">
                              <label
                                className="form-label fw-medium text-[#50453e] mb-2"
                                style={{
                                  fontSize: "13.5px",
                                  letterSpacing: "0.14px",
                                }}
                              >
                                Sensitivitas Kafein
                              </label>
                              <div className="row g-2">
                                {["Rendah", "Sedang", "Tinggi"].map((level) => {
                                  const isActive =
                                    selectedCaffeineSensitivity === level;
                                  return (
                                    <div key={level} className="col-4">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setValue(
                                            "caffeineSensitivity",
                                            level,
                                            { shouldValidate: true },
                                          )
                                        }
                                        className="btn w-100 border fw-semibold transition-all"
                                        style={{
                                          borderRadius: "8px",
                                          padding: "10px 4px",
                                          fontSize: "12px",
                                          letterSpacing: "0.6px",
                                          textTransform: "uppercase",
                                          background: isActive
                                            ? "#a0f399"
                                            : "#fff",
                                          borderColor: isActive
                                            ? "#1b6d24"
                                            : "#d4c3ba",
                                          color: isActive
                                            ? "#217128"
                                            : "#1b1c1c",
                                        }}
                                      >
                                        {level}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                              <input
                                type="hidden"
                                {...register("caffeineSensitivity", {
                                  required: "Pilih sensitivitas kafein Anda",
                                })}
                              />
                              {errors.caffeineSensitivity && (
                                <span
                                  className="text-danger d-block mt-1"
                                  style={{ fontSize: "12px" }}
                                >
                                  {errors.caffeineSensitivity.message}
                                </span>
                              )}
                            </div>

                            {/* Toggle: Sleep Disorder */}
                            <div className="d-flex justify-content-between align-items-center py-3 border-top border-[#f0eded]">
                              <div>
                                <p
                                  className="fw-semibold text-[#1b1c1c] m-0"
                                  style={{ fontSize: "15px" }}
                                >
                                  Riwayat Gangguan Tidur
                                </p>
                                <p
                                  className="text-[#50453e] m-0"
                                  style={{
                                    fontSize: "12px",
                                    letterSpacing: "0.6px",
                                  }}
                                >
                                  Insomnia atau kesulitan tidur lelap
                                </p>
                              </div>
                              <div
                                role="switch"
                                aria-checked={sleepDisorderOn}
                                onClick={() =>
                                  setValue("sleepDisorder", !sleepDisorderOn)
                                }
                                className="flex-shrink-0 cursor-pointer transition-all"
                                style={{
                                  width: "44px",
                                  height: "24px",
                                  borderRadius: "9999px",
                                  background: sleepDisorderOn
                                    ? "#1b6d24"
                                    : "#e4e2e1",
                                  padding: "2px",
                                  cursor: "pointer",
                                  position: "relative",
                                  transition: "background 0.2s",
                                }}
                              >
                                <div
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    background: "#fff",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    position: "absolute",
                                    top: "2px",
                                    left: sleepDisorderOn
                                      ? "calc(100% - 22px)"
                                      : "2px",
                                    transition: "left 0.2s",
                                  }}
                                />
                              </div>
                              <input
                                type="hidden"
                                {...register("sleepDisorder")}
                              />
                            </div>

                            {/* Toggle: Anxiety */}
                            <div className="d-flex justify-content-between align-items-center py-3 border-top border-[#f0eded]">
                              <div>
                                <p
                                  className="fw-semibold text-[#1b1c1c] m-0"
                                  style={{ fontSize: "15px" }}
                                >
                                  Riwayat Kecemasan
                                </p>
                                <p
                                  className="text-[#50453e] m-0"
                                  style={{
                                    fontSize: "12px",
                                    letterSpacing: "0.6px",
                                  }}
                                >
                                  Kecenderungan gelisah setelah kafein
                                </p>
                              </div>
                              <div
                                role="switch"
                                aria-checked={anxietyOn}
                                onClick={() => setValue("anxiety", !anxietyOn)}
                                className="flex-shrink-0"
                                style={{
                                  width: "44px",
                                  height: "24px",
                                  borderRadius: "9999px",
                                  background: anxietyOn ? "#1b6d24" : "#e4e2e1",
                                  padding: "2px",
                                  cursor: "pointer",
                                  position: "relative",
                                  transition: "background 0.2s",
                                }}
                              >
                                <div
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    background: "#fff",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    position: "absolute",
                                    top: "2px",
                                    left: anxietyOn
                                      ? "calc(100% - 22px)"
                                      : "2px",
                                    transition: "left 0.2s",
                                  }}
                                />
                              </div>
                              <input type="hidden" {...register("anxiety")} />
                            </div>
                          </div>

                          {/* Green Info Tip Box */}
                          <div
                            className="d-flex gap-2 p-3 rounded-3"
                            style={{
                              background: "rgba(27,109,36,0.05)",
                              border: "1px solid rgba(27,109,36,0.1)",
                            }}
                          >
                            <span style={{ fontSize: "16px", flexShrink: 0 }}>
                              📍
                            </span>
                            <p
                              className="m-0 fw-medium text-[#217128]"
                              style={{
                                fontSize: "13.5px",
                                letterSpacing: "0.14px",
                                lineHeight: "1.5",
                              }}
                            >
                              Informasi ini membantu algoritma kami menentukan
                              waktu &ldquo;Cut-off&rdquo; kafein yang ideal
                              untuk kualitas tidur Anda.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT: Goals Card */}
                      <div className="col-12 col-md-7">
                        <div className="bg-white border border-[#d4c3ba] rounded-3 p-4 shadow-sm h-100">
                          <div className="d-flex gap-2 align-items-center mb-3">
                            <span style={{ fontSize: "20px" }}>🎯</span>
                            <h4
                              className="fw-bold text-[#1b1c1c] m-0"
                              style={{ fontSize: "18px" }}
                            >
                              Tujuan Penggunaan
                            </h4>
                          </div>

                          {/* 2×2 Bento Goal Grid */}
                          <div className="row g-2 mb-3">
                            {[
                              {
                                key: "fokus",
                                icon: "💼",
                                title: ["Meningkatkan", "Fokus Kerja"],
                                desc: "Optimalkan produktivitas puncak selama jam kantor.",
                              },
                              {
                                key: "olahraga",
                                icon: "🏋️",
                                title: ["Performa", "Olahraga"],
                                desc: "Gunakan kafein sebagai peningkat performa fisik.",
                              },
                              {
                                key: "energi",
                                icon: "🔋",
                                title: ["Manajemen", "Energi Harian"],
                                desc: 'Hindari "caffeine crash" dan jaga energi tetap stabil.',
                              },
                              {
                                key: "lacak",
                                icon: "📊",
                                title: ["Hanya Melacak", "Kebiasaan"],
                                desc: "Pantau asupan harian tanpa target spesifik.",
                              },
                            ].map(({ key, icon, title, desc }) => {
                              const isActive = selectedGoal === key;
                              return (
                                <div key={key} className="col-6">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setValue("goal", key, {
                                        shouldValidate: true,
                                      })
                                    }
                                    className="btn w-100 h-100 d-flex flex-col align-items-start border text-start transition-all"
                                    style={{
                                      borderRadius: "12px",
                                      padding: "20px",
                                      borderColor: isActive
                                        ? "#1b6d24"
                                        : "#d4c3ba",
                                      borderWidth: isActive ? "2px" : "1px",
                                      background: isActive ? "#a0f399" : "#fff",
                                      boxShadow: isActive
                                        ? "0 0 0 3px rgba(27,109,36,0.2)"
                                        : "none",
                                      transition: "all 0.2s ease",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "24px",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      {icon}
                                    </span>
                                    <p
                                      className="fw-bold m-0 mb-1"
                                      style={{
                                        fontSize: "15px",
                                        lineHeight: "1.4",
                                        color: isActive ? "#1b4d20" : "#1b1c1c",
                                      }}
                                    >
                                      {title[0]}
                                      <br />
                                      {title[1]}
                                    </p>
                                    <p
                                      className="m-0"
                                      style={{
                                        fontSize: "12px",
                                        letterSpacing: "0.3px",
                                        lineHeight: "1.5",
                                        color: isActive ? "#217128" : "#50453e",
                                      }}
                                    >
                                      {desc}
                                    </p>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <input
                            type="hidden"
                            {...register("goal", {
                              required: "Pilih tujuan penggunaan Anda",
                            })}
                          />
                          {errors.goal && (
                            <span
                              className="text-danger d-block mb-2"
                              style={{ fontSize: "12px" }}
                            >
                              {errors.goal.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Controls Buttons */}
                <div className="d-flex justify-content-between align-items-center border-top border-[#d4c3ba] pt-4 mt-4 w-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                      className="btn d-inline-flex align-items-center gap-2 text-[#553722] fw-bold py-2 px-4 transition-all"
                      style={{
                        borderRadius: "8px",
                        fontSize: "15px",
                        background: "transparent",
                        border: "none",
                      }}
                    >
                      <ArrowLeft size={16} />
                      Kembali
                    </button>
                  ) : (
                    <div /> /* Empty block to preserve right-alignment */
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn bg-[#171717] hover:bg-[#1b6d24] text-white hover:text-white py-2 px-4 d-inline-flex align-items-center gap-2 transition-all duration-200"
                      style={{
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: "500",
                        border: "none",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      Selanjutnya
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn bg-[#171717] hover:bg-[#1b6d24] text-white hover:text-white py-2 px-4 d-inline-flex align-items-center gap-2 transition-all duration-200"
                      style={{
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: "500",
                        border: "none",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        opacity: isSubmitting ? 0.85 : 1,
                      }}
                    >
                      {isSubmitting ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span className="visually-hidden">
                            Menganalisis...
                          </span>
                        </div>
                      ) : (
                        <>Selesaikan &amp; Lihat Hasil</>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* ── Confirmation Modal ── */}
      {showConfirmModal && (
        <div
          onClick={() => setShowConfirmModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(3,7,18,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "32px 28px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
              animation: "slideUp 0.25s ease",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(160,243,153,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              ☕
            </div>

            {/* Title */}
            <h4
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#1b1c1c",
                marginBottom: "8px",
              }}
            >
              Konfirmasi Pengiriman Data
            </h4>
            <p
              style={{
                fontSize: "14px",
                color: "#50453e",
                marginBottom: "24px",
                lineHeight: "1.6",
              }}
            >
              Anda akan mengirimkan data asesmen untuk dianalisis. Pastikan
              semua informasi sudah benar sebelum melanjutkan.
            </p>

            {/* Summary chips */}
            <div
              style={{
                background: "#fdf5ea",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "#82746d", fontWeight: "500" }}>
                  Langkah selesai
                </span>
                <span style={{ color: "#1b1c1c", fontWeight: "700" }}>
                  3 dari 3 ✓
                </span>
              </div>
              <div style={{ height: "1px", background: "#eae7e7" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "#82746d", fontWeight: "500" }}>
                  Tujuan dipilih
                </span>
                <span
                  style={{
                    color: "#1b6d24",
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  {pendingData?.goal === "fokus" && "Fokus Kerja"}
                  {pendingData?.goal === "olahraga" && "Performa Olahraga"}
                  {pendingData?.goal === "energi" && "Energi Harian"}
                  {pendingData?.goal === "lacak" && "Melacak Kebiasaan"}
                </span>
              </div>
              <div style={{ height: "1px", background: "#eae7e7" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "#82746d", fontWeight: "500" }}>
                  Sensitivitas kafein
                </span>
                <span style={{ color: "#1b1c1c", fontWeight: "700" }}>
                  {pendingData?.caffeineSensitivity || "—"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "13px 24px",
                  borderRadius: "12px",
                  background: "#1b1c1c",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "15px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  transition: "opacity 0.2s",
                  opacity: isSubmitting ? 0.75 : 1,
                }}
              >
                {isSubmitting ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    />
                    Menganalisis...
                  </>
                ) : (
                  <>✓ &nbsp;Konfirmasi &amp; Lihat Hasil</>
                )}
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  background: "transparent",
                  color: "#553722",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid #d4c3ba",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Batal, Periksa Kembali
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .custom-range-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 9999px;
          outline: none;
          transition: background 0.1s;
        }
        .custom-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1b6d24;
          cursor: pointer;
          border: none;
        }
        .custom-range-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1b6d24;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
}
