import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { authService } from "../service/authService";
import { useAuthStore } from "../store/authStore";
import { predictionService } from "../service/predictionService";

// Local Assets
import imgRegisterImage from "../assets/images/Register.png";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);

  // Detect if the user landed on /register or /login, default to login
  const isRegisterInitial = location.pathname === "/register";
  const [isRegister, setIsRegister] = useState(isRegisterInitial);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordVal = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");

    try {
      let response;
      if (isRegister) {
        response = await authService.register({
          name: data.fullName,
          email: data.email,
          password: data.password,
        });
      } else {
        response = await authService.login({
          email: data.email,
          password: data.password,
        });
      }

      // Simpan token & user
      const { token, user } = response.data;
      setAuth({ user, token });

      // ── Cek apakah ada pending assessment ──
      const pending = sessionStorage.getItem("pendingAssessment");
      if (pending) {
        sessionStorage.removeItem("pendingAssessment");
        try {
          const predResponse = await predictionService.create(
            JSON.parse(pending),
          );
          navigate("/result", { state: { result: predResponse.data } });
          return;
        } catch (predErr) {
          console.error("Auto-submit failed:", predErr);
          // kalau gagal, lanjut ke flow normal di bawah
        }
      }

      // Flow normal kalau tidak ada pending
      navigate(isRegister ? "/assessment" : "/result");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan. Silakan coba lagi.";
      setAuthError(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#fcf9f8",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── GLOBAL HEADER ── */}
      <Header />

      {/* Main Authentication split panels */}
      <div className="flex-grow-1 min-h-[calc(100vh-73px)] bg-[#fcf9f8] flex flex-col md:flex-row font-sans overflow-x-hidden text-[#030712]">
        {/* LEFT SIDE PANEL: Branding (Hidden on small screens, full split on desktop) */}
        <div
          className="hidden md:flex md:w-1/2 relative bg-cover bg-center flex-col justify-between p-5 lg:p-5 min-h-[calc(100vh-73px)] self-stretch"
          style={{
            backgroundImage: `url(${imgRegisterImage})`,
          }}
        >
          {/* Glassmorphic dark overlay for outstanding contrast and reading text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/85 z-1" />

          {/* Brand Header */}
          <div className="position-relative z-3 pt-5 px-4">
            <LinkToHome navigate={navigate} className="text-[#9ee86f]" />
            <h1
              className="fw-bold tracking-tight text-[#9ee86f] text-4xl lg:text-5xl mt-4"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              ScansCaffeine
            </h1>
          </div>

          {/* Headline / Value Proposition */}
          <div className="position-relative z-3 px-4 mb-auto mt-auto max-w-[480px]">
            <h2 className="display-5 fw-bold text-white mb-4 tracking-tight leading-tight">
              Master your <br /> metabolic pulse.
            </h2>
            <p className="fs-5 text-white/90 leading-relaxed">
              Join the community of bio-hackers using clinical data to optimize
              every espresso, matcha, and cold brew for peak performance.
            </p>
          </div>

          {/* Community Footer Stat */}
          <div className="position-relative z-3 px-4 pb-4">
            <span className="text-white/80 fs-6 fw-medium tracking-wide">
              Used by 50,000+ analysts worldwide
            </span>
          </div>
        </div>

        {/* RIGHT SIDE PANEL: Authentication Forms (100% width on Mobile, 50% on Desktop) */}
        <div className="flex-1 min-h-[calc(100vh-73px)] flex flex-col justify-center items-center py-4 px-4 sm:px-6 lg:px-8 bg-[#fcf9f8] relative">
          {/* Mobile branding logo */}
          <div className="w-full max-w-[440px] md:hidden flex justify-center items-center mb-4 mt-2">
            <span className="fs-4 fw-bold text-[#1b6d24] tracking-tight">
              ScansCoffee
            </span>
          </div>

          <div className="w-full max-w-[440px] bg-white border border-[#d4c3ba] p-4 sm:p-5 rounded-4 shadow-sm relative z-1">
            {/* Header text */}
            <div className="mb-4 text-left">
              <h2 className="fs-3 fw-bold text-[#553722] tracking-tight mb-2">
                {isRegister ? "Buat akun baru" : "Selamat datang kembali"}
              </h2>
              <p className="fs-6 text-[#50453e] leading-relaxed">
                {isRegister
                  ? "Mulai pantau dan analisis konsumsi kafein harian Anda."
                  : "Analisis pola konsumsi dan kondisi fisiologis Anda."}
              </p>
            </div>

            {/* Social Auth Grid */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-outline-dark w-100 d-inline-flex align-items-center justify-content-center border border-[#d4c3ba] bg-white text-dark py-2.5 hover:bg-gray-50 transition-all hover-lift"
                  style={{
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <GoogleIcon /> Google
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-outline-dark w-100 d-inline-flex align-items-center justify-content-center border border-[#d4c3ba] bg-white text-dark py-2.5 hover:bg-gray-50 transition-all hover-lift"
                  style={{
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <FacebookIcon /> Facebook
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="d-flex align-items-center mb-4">
              <div className="flex-grow-1 border-top border-[#d4c3ba]"></div>
              <span
                className="px-3 text-[#82746d] fw-semibold uppercase tracking-widest"
                style={{ fontSize: "10px" }}
              >
                OR EMAIL
              </span>
              <div className="flex-grow-1 border-top border-[#d4c3ba]"></div>
            </div>

            {/* Alert Error Box */}
            {authError && (
              <div className="alert alert-danger py-2 px-3 mb-3 border border-red-300 bg-red-50 text-red-700 rounded-3 text-sm">
                {authError}
              </div>
            )}

            {/* Authentication Input Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column gap-3"
            >
              {/* Input Name (Only in Register mode) */}
              {isRegister && (
                <div>
                  <label
                    className="form-label text-dark fw-medium mb-1.5"
                    style={{ fontSize: "13px" }}
                  >
                    Nama Lengkap
                  </label>
                  <div className="position-relative">
                    <span className="position-absolute start-0 top-50 translate-middle-y ps-3 text-muted">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="Nama Lengkap Anda"
                      className={`form-control w-100 py-2.5 ps-5 pe-3 border rounded-3 text-dark focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 ${errors.fullName ? "border-danger" : "border-[#d4c3ba]"}`}
                      style={{ fontSize: "15px" }}
                      {...register("fullName", {
                        required: isRegister
                          ? "Nama lengkap wajib diisi"
                          : false,
                        minLength: { value: 3, message: "Minimal 3 karakter" },
                      })}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-danger text-xs mt-1 d-block">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
              )}

              {/* Input Email */}
              <div>
                <label
                  className="form-label text-dark fw-medium mb-1.5"
                  style={{ fontSize: "13px" }}
                >
                  Email Kantor / Pribadi
                </label>
                <div className="position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3 text-muted">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className={`form-control w-100 py-2.5 ps-5 pe-3 border rounded-3 text-dark focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 ${errors.email ? "border-danger" : "border-[#d4c3ba]"}`}
                    style={{ fontSize: "15px" }}
                    {...register("email", {
                      required: "Alamat email wajib diisi",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Format email tidak valid",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger text-xs mt-1 d-block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Input Password */}
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1.5">
                  <label
                    className="form-label text-dark fw-medium m-0"
                    style={{ fontSize: "13px" }}
                  >
                    Password
                  </label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() =>
                        alert("Fitur pemulihan password akan segera hadir.")
                      }
                      className="text-[#1b6d24] bg-transparent border-0 fw-semibold hover:underline p-0"
                      style={{ fontSize: "12px" }}
                    >
                      Lupa password?
                    </button>
                  )}
                </div>
                <div className="position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3 text-muted">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`form-control w-100 py-2.5 ps-5 pe-5 border rounded-3 text-dark focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 ${errors.password ? "border-danger" : "border-[#d4c3ba]"}`}
                    style={{ fontSize: "15px" }}
                    {...register("password", {
                      required: "Password wajib diisi",
                      minLength: { value: 6, message: "Minimal 6 karakter" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="position-absolute end-0 top-50 translate-middle-y pe-3 border-0 bg-transparent text-muted focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-danger text-xs mt-1 d-block">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Input Confirm Password (Only in Register mode) */}
              {isRegister && (
                <div>
                  <label
                    className="form-label text-dark fw-medium mb-1.5"
                    style={{ fontSize: "13px" }}
                  >
                    Konfirmasi Password
                  </label>
                  <div className="position-relative">
                    <span className="position-absolute start-0 top-50 translate-middle-y ps-3 text-muted">
                      <Lock size={18} />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`form-control w-100 py-2.5 ps-5 pe-5 border rounded-3 text-dark focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 ${errors.confirmPassword ? "border-danger" : "border-[#d4c3ba]"}`}
                      style={{ fontSize: "15px" }}
                      {...register("confirmPassword", {
                        required: isRegister
                          ? "Konfirmasi password wajib diisi"
                          : false,
                        validate: (value) =>
                          value === passwordVal || "Password tidak cocok",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="position-absolute end-0 top-50 translate-middle-y pe-3 border-0 bg-transparent text-muted focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-danger text-xs mt-1 d-block">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              )}

              {/* Checkbox settings */}
              <div className="form-check d-flex align-items-start mt-2">
                <input
                  type="checkbox"
                  id="rememberOrAgree"
                  className="form-check-input border-[#d4c3ba] shrink-0 mt-1 cursor-pointer"
                  style={{ width: "16px", height: "16px" }}
                  {...register("rememberOrAgree", {
                    required: isRegister
                      ? "Anda harus menyetujui ketentuan layanan kami"
                      : false,
                  })}
                />
                <label
                  htmlFor="rememberOrAgree"
                  className="form-check-label ps-2 text-[#50453e] cursor-pointer"
                  style={{ fontSize: "13.5px", lineHeight: "1.4" }}
                >
                  {isRegister ? (
                    <span>
                      Saya menyetujui{" "}
                      <a
                        href="#terms"
                        className="text-[#1b6d24] fw-semibold hover:underline"
                      >
                        Ketentuan Layanan
                      </a>{" "}
                      &{" "}
                      <a
                        href="#privacy"
                        className="text-[#1b6d24] fw-semibold hover:underline"
                      >
                        Kebijakan Privasi
                      </a>
                    </span>
                  ) : (
                    "Tetap login selama 30 hari"
                  )}
                </label>
              </div>
              {errors.rememberOrAgree && (
                <span className="text-danger text-xs d-block">
                  {errors.rememberOrAgree.message}
                </span>
              )}

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-brand-dark w-100 bg-[#030712] text-white py-3 mt-3 d-inline-flex align-items-center justify-content-center gap-2 hover-lift"
                style={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  opacity: isLoading ? 0.8 : 1,
                }}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    {isRegister ? "Buat Akun Sekarang" : "Analyze My Data"}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Footer toggle switcher */}
            <div className="mt-4 text-center">
              <span className="text-[#50453e]" style={{ fontSize: "15px" }}>
                {isRegister ? "Sudah punya akun? " : "Kamu pengguna baru? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setAuthError("");
                  }}
                  className="text-[#1b6d24] bg-transparent border-0 fw-bold p-0 hover:underline"
                >
                  {isRegister ? "Masuk di sini" : "Buat akun baru"}
                </button>
              </span>
            </div>

            {/* Figma Atmosphere Micro-interaction energy level card hint */}
            <div
              className="mt-4 border border-[#d4c3ba] px-4 py-3 bg-white/70 backdrop-blur-md rounded-4 d-flex align-items-center gap-3 transition-opacity duration-300"
              style={{
                borderRadius: "12px",
                borderStyle: "dashed",
              }}
            >
              <div
                className="bg-[#1b6d24] shrink-0 rounded-circle animate-pulse"
                style={{ width: "8px", height: "8px" }}
              />
              <div className="text-start">
                <span
                  className="text-[#1b6d24] fw-semibold tracking-wider uppercase block"
                  style={{ fontSize: "10px" }}
                >
                  SYSTEM OPTIMIZED FOR PEAK METABOLIC WINDOWS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for beautiful clean SVG Icons
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="me-2 shrink-0">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.31l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="me-2 shrink-0">
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

// Dynamic Back Home button helper
function LinkToHome({ navigate, className }) {
  return (
    <button
      onClick={() => navigate("/")}
      className={`btn bg-transparent border-0 p-0 text-white hover-underline d-inline-flex align-items-center gap-2 hover:opacity-85 ${className}`}
      style={{ fontWeight: "600", fontSize: "15px" }}
    >
      <ArrowLeft size={16} /> Beranda
    </button>
  );
}
