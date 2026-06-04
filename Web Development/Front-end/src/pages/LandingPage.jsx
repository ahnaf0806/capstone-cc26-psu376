import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronRight, Activity, Moon, ShieldCheck, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import Header from '../components/Header';

// Local Assets
import imgHeroBackground from '../assets/images/hero-bg.png';
import imgAboutUsImage from '../assets/images/about-us.png';
import imgCaffeineMolecule from '../assets/images/caffeine-molecule.png';
import imgKuisImage from '../assets/images/kuis-image.png';
import imgChatGptImageAI from '../assets/images/chatgpt-ai.png';
import imgChatGptImageInsight from '../assets/images/chatgpt-insight.png';
import imgDemo1 from '../assets/images/demo1.png';
import imgVectorCurve from '../assets/images/vector-curve.svg';
import imgWaveSectionBg from '../assets/images/wave-section-bg.svg';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fdf5ea] min-h-screen flex flex-col font-sans overflow-x-hidden text-[#030712]">

      {/* 1. HEADER / NAVIGATION SECTION */}
      <Header />

      {/* 2. MAIN HERO SECTION */}
      <section className="position-relative overflow-hidden pt-5 min-h-[640px] md:min-h-[1024px]" style={{ backgroundColor: '#c6df9d' }}>
        {/* Figma-exact graphic background (node 66:159 & 66:160) */}
        <div className="position-absolute start-0 end-0 pointer-events-none z-0" style={{
          left: '-1px',
          top: '115px',
          width: '100%',
          height: 'calc(100% - 115px)',
          overflow: 'hidden'
        }} data-node-id="66:160">
          <img
            alt="Hero Background Illustration"
            className="position-absolute w-100"
            src={imgHeroBackground}
            style={{
              left: 0,
              top: '33.31%',
              height: '66.71%',
              objectFit: 'cover',
              opacity: 0.95
            }}
          />
        </div>

        {/* Wave Overlay on top of Hero Image */}
        <div className="position-absolute start-0 end-0 bottom-0 w-100" style={{
          height: '152px',
          overflow: 'hidden',
          zIndex: 2
        }}>
          <img
            src={imgWaveSectionBg}
            alt=""
            className="position-absolute w-100"
            style={{
              top: 0,
              left: 0,
              height: '518px',
              objectFit: 'fill'
            }}
          />
        </div>

        {/* Hero Overlay Gradient for text readability */}
        <div className="position-absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-1" />

        <div className="container-xl position-relative z-3 h-100 d-flex flex-column justify-content-between px-4 py-4 py-md-5">
          <div className="row justify-content-center text-center my-auto">
            <div className="col-12 col-lg-10 mt-2 mt-md-4">
              <h1 className="fw-bold tracking-tight text-white mb-3 mb-md-4 drop-shadow-md" style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                textShadow: '0 4px 12px rgba(0,0,0,0.25)',
                lineHeight: '1.15',
                fontSize: 'clamp(1.8rem, 8vw, 4.2rem)'
              }}>
                Ketahui Batas Aman <br className="d-none d-md-inline" /> Kafein Tubuhmu dengan AI
              </h1>

              <p className="text-white mb-4 mx-auto" style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                maxWidth: '800px',
                fontWeight: '500',
                fontSize: 'clamp(0.95rem, 4vw, 1.35rem)'
              }}>
                Analisis pengaruh kopi harian Anda terhadap pola tidur, tingkat stres, dan kualitas kesehatan secara real-time menggunakan kecerdasan buatan canggih.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
                <button
                  onClick={() => navigate('/assessment')}
                  className="btn btn-brand-dark d-flex align-items-center justify-content-center gap-2 gap-md-3 w-sm-auto px-4 py-2.5 px-md-5 py-md-3 hover-lift shadow-lg"
                  style={{
                    backgroundColor: '#030712',
                    color: '#ffffff',
                    border: '2px solid rgba(255,255,255,0.15)',
                    borderRadius: '24px',
                    fontSize: 'clamp(0.95rem, 4vw, 1.15rem)'
                  }}
                >
                  Mulai Test Sekarang
                  <span className="bg-brand-lime text-black rounded-circle d-inline-flex align-items-center justify-content-center shrink-0" style={{ width: '28px', height: '28px' }}>
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="position-relative bg-brand-lime text-black overflow-hidden pt-4 pb-5">

        <div className="container-xl px-4 pt-1 pb-3 position-relative z-2">
          <div className="row align-items-center justify-content-between g-4 g-md-5">
            <div className="col-12 col-lg-7">
              <h2 className="fw-bold mb-3 mb-md-4 tracking-tight text-black" style={{
                fontFamily: 'Sonder, "Plus Jakarta Sans", sans-serif',
                lineHeight: '1.1',
                fontSize: 'clamp(2rem, 8vw, 3.5rem)'
              }}>
                Caffeine that makes you Happy
              </h2>
              <p className="fs-4 fs-md-3 fw-medium mb-4 opacity-90 text-black" style={{ maxWidth: '650px', lineHeight: '1.4' }}>
                Cari tahu seberapa banyak batas konsumsi harianmu
              </p>

              <div className="row g-4 mt-2">
                <div className="col-12 col-md-6 d-flex gap-3">
                  <CheckCircle2 size={28} className="text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="fw-bold text-black">Rekomendasi Personal</h4>
                    <p className="opacity-80 text-black">Skor limit kafein yang disesuaikan dengan toleransi biologis tubuh Anda.</p>
                  </div>
                </div>
                <div className="col-12 col-md-6 d-flex gap-3">
                  <CheckCircle2 size={28} className="text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="fw-bold text-black">Pelacakan Real-time</h4>
                    <p className="opacity-80 text-black">Pantau akumulasi kafein aktif dan waktu paruhnya dalam darah Anda.</p>
                  </div>
                </div>
                <div className="col-12 col-md-6 d-flex gap-3">
                  <CheckCircle2 size={28} className="text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="fw-bold text-black">Sleep & Stress Impact</h4>
                    <p className="opacity-80 text-black">Prediksi dampak konsumsi kopi pada kualitas tidur REM Anda nanti malam.</p>
                  </div>
                </div>
                <div className="col-12 col-md-6 d-flex gap-3">
                  <CheckCircle2 size={28} className="text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="fw-bold text-black">AI Smart Recommendation</h4>
                    <p className="opacity-80 text-black">Saran cerdas jam terbaik untuk minum kopi agar tetap produktif dan sehat.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 text-center mt-4 mt-lg-0">
              <img
                src={imgCaffeineMolecule}
                alt="Caffeine Molecule AI Visualizer"
                className="img-fluid"
                style={{ width: '100%', maxWidth: '580px', transform: 'rotate(-2deg)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-5 bg-brand-cream">
        <div className="container-xl px-4 py-4 py-md-5">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>How It Works</h2>
            <p className="fs-6 fs-md-5 text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Dapatkan hasil test mu dengan 3 Langkah Mudah
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Step 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-brand-lime border-2 border-dark rounded-5 overflow-hidden shadow-sm hover-lift" style={{ borderRadius: '24px' }}>
                <div className="position-relative pt-4 px-4 d-flex align-items-center justify-content-center" style={{ minHeight: '180px' }}>
                  <img src={imgVectorCurve} alt="" className="position-absolute start-0 top-0 w-100 pointer-events-none" style={{ opacity: 0.8 }} />
                  <img
                    src={imgKuisImage}
                    alt="Isi Kuesioner"
                    className="img-fluid position-relative z-2"
                    style={{ maxHeight: '140px', objectFit: 'contain' }}
                  />
                </div>

                <div className="card-body p-4 pt-2">
                  <span className="badge bg-white text-dark border border-dark rounded-3 px-3 py-2 mb-3 fw-bold">Langkah 1</span>
                  <h3 className="card-title fw-bold mb-3 h4">Isi Kuesioner</h3>
                  <p className="card-text text-dark opacity-90">
                    Masukkan data dasar seperti usia, berat badan, pola tidur, dan rata-rata konsumsi kopi harian Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-brand-lime border-2 border-dark rounded-5 overflow-hidden shadow-sm hover-lift" style={{ borderRadius: '24px' }}>
                <div className="position-relative pt-4 px-4 d-flex align-items-center justify-content-center" style={{ minHeight: '180px' }}>
                  <img src={imgVectorCurve} alt="" className="position-absolute start-0 top-0 w-100 pointer-events-none" style={{ opacity: 0.8 }} />
                  <img
                    src={imgChatGptImageAI}
                    alt="AI Processing"
                    className="img-fluid position-relative z-2"
                    style={{ maxHeight: '140px', objectFit: 'contain' }}
                  />
                </div>

                <div className="card-body p-4 pt-2">
                  <span className="badge bg-white text-dark border border-dark rounded-3 px-3 py-2 mb-3 fw-bold">Langkah 2</span>
                  <h3 className="card-title fw-bold mb-3 h4">AI Menganalisis Datamu</h3>
                  <p className="card-text text-dark opacity-90">
                    Model kecerdasan buatan akan memproses dan memetakan hubungan antara kafein, efisiensi tidur, dan respons stres Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-brand-lime border-2 border-dark rounded-5 overflow-hidden shadow-sm hover-lift" style={{ borderRadius: '24px' }}>
                <div className="position-relative pt-4 px-4 d-flex align-items-center justify-content-center" style={{ minHeight: '180px' }}>
                  <img src={imgVectorCurve} alt="" className="position-absolute start-0 top-0 w-100 pointer-events-none" style={{ opacity: 0.8 }} />
                  <img
                    src={imgChatGptImageInsight}
                    alt="Dapatkan Insight"
                    className="img-fluid position-relative z-2"
                    style={{ maxHeight: '140px', objectFit: 'contain' }}
                  />
                </div>

                <div className="card-body p-4 pt-2">
                  <span className="badge bg-white text-dark border border-dark rounded-3 px-3 py-2 mb-3 fw-bold">Langkah 3</span>
                  <h3 className="card-title fw-bold mb-3 h4">Dapatkan Insight Personal</h3>
                  <p className="card-text text-dark opacity-90">
                    Dapatkan rekomendasi jam kopi terbaik, dosis maksimal harian, serta saran perbaikan pola istirahat Anda secara komprehensif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ANALYSIS RESULT SECTION (DASHBOARD PREVIEW) */}
      <section id="analysis" className="py-5 bg-white border-top border-bottom border-2 border-dark">
        <div className="container-xl px-4 py-4 py-md-5">
          <div className="row align-items-center g-4 g-md-5 mb-4 mb-md-5">
            <div className="col-12 col-lg-7">
              <h2 className="fw-bold tracking-tight mb-2 mb-md-3" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>
                Lihat Hasil Analisis <br className="d-none d-md-inline" /> Sebelum Mendaftar
              </h2>
            </div>
            <div className="col-12 col-lg-5">
              <p className="fs-6 fs-md-5 text-muted mb-4">
                Lihat bagaimana konsumsi kafein dapat memengaruhi kualitas tidur dan tingkat stres Anda melalui analisis berbasis AI sebelum memulai evaluasi lengkap.
              </p>
              <button
                onClick={() => navigate('/assessment')}
                className="btn btn-brand-outline d-inline-flex align-items-center gap-2 hover-lift"
              >
                Lihat Selengkapnya
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card bg-brand-cream border border-dark rounded-5 overflow-hidden p-2 p-md-4 shadow-lg hover-lift">
                <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ border: '1.5px solid rgba(3,7,18,0.1)' }}>
                  {/* Dashboard Preview mockup screenshot from Figma */}
                  <img
                    src={imgDemo1}
                    alt="Coffee Health Analyzer Interactive Dashboard Mockup"
                    className="img-fluid w-100"
                    style={{ transition: 'transform 0.5s ease' }}
                  />

                  {/* Interactive Hotspot labels or overlays for UI wow factor */}
                  <div className="position-absolute d-none d-md-flex align-items-center gap-2 bg-white/95 border border-dark px-3 py-2 rounded-pill shadow-lg" style={{ top: '15%', left: '20%' }}>
                    <Activity size={18} className="text-danger animate-pulse" />
                    <span className="fw-semibold text-xs text-dark" style={{ fontSize: '12px' }}>AI Biometric Tracking</span>
                  </div>

                  <div className="position-absolute d-none d-md-flex align-items-center gap-2 bg-white/95 border border-dark px-3 py-2 rounded-pill shadow-lg" style={{ top: '48%', left: '55%' }}>
                    <Moon size={18} className="text-indigo-600" />
                    <span className="fw-semibold text-xs text-dark" style={{ fontSize: '12px' }}>Sleep Latency Predictor (+42m)</span>
                  </div>

                  <div className="position-absolute d-none d-md-flex align-items-center gap-2 bg-white/95 border border-dark px-3 py-2 rounded-pill shadow-lg" style={{ bottom: '25%', left: '42%' }}>
                    <ShieldCheck size={18} className="text-success" />
                    <span className="fw-semibold text-xs text-dark" style={{ fontSize: '12px' }}>Optimal Caffeine Limit: 240mg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT US CALLOUT SECTION */}
      <section id="about" className="py-5 bg-brand-cream">
        <div className="container-xl px-4 py-4">
          <div className="position-relative overflow-hidden rounded-5 shadow-lg border border-dark" style={{
            minHeight: '450px',
            backgroundImage: `url(${imgAboutUsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px'
          }}>
            {/* Responsive Gradient Overlay for perfect readability */}
            <div className="position-absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/70 md:bg-gradient-to-r md:from-black/90 md:via-black/70 md:to-transparent z-1" />

            <div className="position-relative d-flex flex-column justify-content-center p-4 p-md-5 col-12 col-md-8 col-lg-6 text-white z-2" style={{ minHeight: '450px' }}>
              <h2 className="fw-bold mb-3 tracking-tight" style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2'
              }}>
                Get to know better about us
              </h2>
              <p className="fs-6 fs-md-5 mb-4 mb-md-5 text-white-50" style={{ lineHeight: '1.6' }}>
                Kami berdedikasi untuk menjembatani kesenangan minum kopi dengan gaya hidup sehat yang seimbang melalui wawasan keilmuan mutakhir dan analitik berbasis AI.
              </p>

              <div>
                <button
                  onClick={() => navigate('/about')}
                  className="btn btn-brand-dark d-inline-flex align-items-center gap-3 py-3 px-4 hover-lift"
                  style={{
                    backgroundColor: '#030712',
                    color: '#ffffff',
                    border: '1.5px solid #e5e5e5',
                    borderRadius: '16px'
                  }}
                >
                  Pelajari Lebih Lanjut
                  <span className="bg-brand-lime text-black rounded-circle d-inline-flex align-items-center justify-content-center animate-pulse" style={{ width: '24px', height: '24px' }}>
                    <ArrowUpRight size={14} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER SECTION */}
      <footer className="bg-black text-white pt-5 pb-4 position-relative overflow-hidden border-top border-dark border-3">
        <div className="container-xl px-4 position-relative z-2">
          <div className="row g-4 g-md-5 pb-4 pb-md-5 border-bottom border-secondary border-opacity-25">
            <div className="col-12 col-lg-6">
              <h3 className="fs-2 fw-bold mb-3 tracking-tight">KopiMetric</h3>
              <p className="text-white opacity-75 mb-4" style={{ maxWidth: '400px', lineHeight: '1.6' }}>
                Menyeimbangkan produktivitas kafein dan kesehatan tidur Anda menggunakan pemodelan AI mutakhir.
              </p>
              <div className="d-flex flex-column gap-2 text-white-50">
                <span className="d-flex align-items-center gap-2">
                  <Mail size={16} /> support@kopimetric.com
                </span>
                <span className="d-flex align-items-center gap-2">
                  <Phone size={16} /> +62 812-3456-7890
                </span>
                <span className="d-flex align-items-center gap-2">
                  <MapPin size={16} /> Jakarta, Indonesia
                </span>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="fw-bold mb-4">Contact</h5>
              <ul className="list-unstyled d-flex flex-column gap-3 text-white-50">
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Customer Care</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Kemitraan</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Media Kit</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Bantuan</a></li>
              </ul>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="fw-bold mb-4">About Us</h5>
              <ul className="list-unstyled d-flex flex-column gap-3 text-white-50">
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Visi & Misi</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Karir</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Tim Pengembang</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75 hover:opacity-100 transition-opacity">Press Release</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <p className="text-white opacity-50 m-0" style={{ fontSize: '14px' }}>
              &copy; 2026 KopiMetric. All rights reserved.
            </p>
            <p className="text-white opacity-50 m-0" style={{ fontSize: '14px' }}>
              Made with &hearts; for Capstone CC26-PSU376
            </p>
          </div>
        </div>

        {/* Massive Backdrop Styling Typography */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x select-none pointer-events-none w-100 text-center z-0" style={{
          fontSize: '14vw',
          fontWeight: '900',
          color: 'rgba(255, 255, 255, 0.03)',
          lineHeight: '0.7',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          textTransform: 'uppercase'
        }}>
          KopiMetric
        </div>
      </footer>

    </div>
  );
}
