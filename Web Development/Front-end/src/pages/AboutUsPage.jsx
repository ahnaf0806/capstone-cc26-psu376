import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

// Local Assets
import imgCaffeineMolecule from '../assets/images/caffeine-molecule.png';

export default function AboutUsPage() {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: 'Dini Laila Syifa Az-Zahra',
      role: 'Data Scientist',
      initials: 'DS',
      gradient: 'linear-gradient(135deg, #7b2cbf, #e0aaff)',
      color: '#fff'
    },
    {
      name: 'Putri Anggelia Pusp',
      role: 'Data Scientist',
      initials: 'PA',
      gradient: 'linear-gradient(135deg, #ff4d6d, #ffccd5)',
      color: '#fff'
    },
    {
      name: 'Hanidura Ayatulloh',
      role: 'AI Engineer',
      initials: 'HA',
      gradient: 'linear-gradient(135deg, #1e6091, #d9ed92)',
      color: '#fff'
    },
    {
      name: 'Dahlia Putri Sopara',
      role: 'AI Engineer',
      initials: 'DP',
      gradient: 'linear-gradient(135deg, #ff7b00, #ffea00)',
      color: '#fff'
    },
    {
      name: 'Saeful Rizal',
      role: 'Full-stack Web Developer',
      initials: 'SR',
      gradient: 'linear-gradient(135deg, #553722, #a0f399)',
      color: '#fff'
    },
    {
      name: 'Ahnaf Ogy Pratista',
      role: 'Full-stack Web Developer',
      initials: 'AO',
      gradient: 'linear-gradient(135deg, #0077b6, #90e0ef)',
      color: '#fff'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fdf5ea', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", overflowX: 'hidden' }}>
      
      {/* ── GLOBAL HEADER ── */}
      <Header />

      {/* ── HERO/INTRO SECTION ── */}
      <section style={{ padding: '80px 0', borderBottom: '1.5px solid #d4c3ba' }}>
        <div className="container-xl px-4">
          <div className="row align-items-center g-5">
            
            {/* Left Content */}
            <div className="col-12 col-lg-7">
              <h1 
                style={{ 
                  fontSize: 'clamp(2.2rem, 6vw, 3.2rem)', 
                  fontWeight: '700', 
                  color: '#271310', 
                  lineHeight: '1.25',
                  marginBottom: '24px'
                }}
              >
                Meet our team of{' '}
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontStyle: 'italic' }}>
                  Fullstack Developers, Data Scientists,
                </span>{' '}
                and{' '}
                <span style={{ fontWeight: '800', fontStyle: 'italic' }}>
                  AI Engineers.
                </span>
              </h1>
              
              <p 
                style={{ 
                  fontSize: '18px', 
                  lineHeight: '1.65', 
                  color: '#655d5a', 
                  margin: 0,
                  maxWidth: '640px' 
                }}
              >
                At KopiMetric, we are dedicated to helping people optimize their cognitive and physical performance through precision metabolism analysis. Get to know the team leading the way in personalized, bio-hacked nutrition.
              </p>
            </div>

            {/* Right Illustration */}
            <div className="col-12 col-lg-5 text-center">
              <img 
                src={imgCaffeineMolecule} 
                alt="Caffeine Bio-Tracking Concept" 
                style={{ 
                  maxHeight: '220px', 
                  objectFit: 'contain'
                }} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── TEAM GRID SECTION ── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container-xl px-4">
          
          {/* Section Header */}
          <div style={{ marginBottom: '56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#271310', margin: 0 }}>
              The Bio-Hacking Specialists
            </h2>
            <p style={{ fontSize: '16px', color: '#655d5a', marginTop: '8px', marginBottom: 0 }}>
              Bridging metabolic chemistry, deep learning models, and seamless responsive design.
            </p>
          </div>

          {/* Member Cards Grid */}
          <div className="row g-4 justify-content-center">
            {teamMembers.map((m, idx) => (
              <div key={m.name} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                <div 
                  style={{ 
                    width: '352px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredMember(idx)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  
                  {/* Photo Container */}
                  <div 
                    style={{
                      width: '352px',
                      height: '352px',
                      borderRadius: '16px',
                      background: '#f4f3f2',
                      position: 'relative',
                      overflow: 'hidden',
                      border: '1.5px solid #d4c3ba',
                      boxShadow: hoveredMember === idx ? '0 12px 24px -8px rgba(85,55,34,0.15)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredMember === idx ? 'translateY(-6px)' : 'none'
                    }}
                  >
                    {/* CSS Portrait Initials Graphic */}
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: m.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.3s'
                      }}
                    >
                      <span 
                        style={{ 
                          fontSize: '110px', 
                          fontWeight: '800', 
                          color: m.color, 
                          letterSpacing: '-2px',
                          textShadow: '0 4px 16px rgba(0,0,0,0.15)',
                          opacity: 0.95
                        }}
                      >
                        {m.initials}
                      </span>
                    </div>

                    {/* Subtle Overlay Grid */}
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 80%)',
                        pointerEvents: 'none'
                      }} 
                    />
                  </div>

                  {/* Name and Role details */}
                  <div style={{ paddingLeft: '4px' }}>
                    <h3 
                      style={{ 
                        fontSize: '20px', 
                        fontWeight: '700', 
                        color: '#271310', 
                        margin: 0,
                        lineHeight: 1.3
                      }}
                    >
                      {m.name}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#655d5a', margin: '4px 0 0 0', fontWeight: '500' }}>
                      {m.role}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CORE VISION STATEMENT SECTION ── */}
      <section style={{ padding: '80px 0', borderTop: '1.5px solid #d4c3ba', borderBottom: '1.5px solid #d4c3ba', background: '#fdf5ea' }}>
        <div className="container-xl px-4 text-center">
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <p 
              style={{ 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(1.5rem, 5vw, 2.3rem)', 
                fontWeight: '600', 
                fontStyle: 'italic', 
                color: '#271310', 
                lineHeight: '1.5',
                margin: 0
              }}
            >
              "We believe that human potential is currently bottlenecked by imprecise consumption. By merging metabolic science with elegant software, we're building the first cognitive performance lens."
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER SECTION ── */}
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
