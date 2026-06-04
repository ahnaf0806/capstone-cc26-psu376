import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { 
  User, Mail, Lock, Shield, ChevronRight, Camera, LogOut, ArrowLeft, Heart, Info, HelpCircle
} from 'lucide-react';

// Sidebar icons as inline SVG components
const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IconSimulation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);
const IconHistory = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('alex.chen@example.com');
  const [name, setName] = useState('Alex Chen');

  const navItems = [
    { icon: <IconDashboard />, label: 'Dashboard', active: false, to: '/result' },
    { icon: <IconSimulation />, label: 'Simulasi', active: false, to: '/simulation' },
    { icon: <IconHistory />, label: 'Riwayat', active: false, to: '/history' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('userName', name);
    // Simple toast or feedback in console
    console.log('Saved profile details', { name, email });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fcf9f8', fontFamily: "'Inter', sans-serif" }}>
      
      {/* ── GLOBAL HEADER ── */}
      <Header />

      {/* Main Layout Container (Sidebar + Content) */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: '256px', height: 'calc(100vh - 73px)', background: '#fcf9f8',
          borderRight: '1px solid #d4c3ba', padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'fixed', left: 0, top: '73px', zIndex: 100,
          transition: 'transform 0.3s ease',
        }} className="d-none d-lg-flex">
          {/* Top */}
          <div>
            {/* Brand */}
            <div style={{ paddingBottom: '40px' }}>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#553722', lineHeight: 1.2 }}>KopiMetric</div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#50453e', letterSpacing: '0.14px', marginTop: '2px' }}>Analisis kebutuhan kafein</div>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map(({ icon, label, active, to }) => (
                <Link
                  key={label}
                  to={to}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px', borderRadius: '8px', textDecoration: 'none',
                    background: active ? '#a0f399' : 'transparent',
                    color: active ? '#217128' : '#50453e',
                    fontWeight: active ? '600' : '400',
                    fontSize: '15px',
                    transition: 'background 0.15s'
                  }}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px', borderTop: '1px solid #d4c3ba' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #553722, #a0f399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', color: '#fff', fontWeight: '700', flexShrink: 0
            }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1b1c1c' }}>{name}</div>
              <div style={{ fontSize: '12px', color: '#1b6d24', fontWeight: '600' }}>Edit Profil</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, paddingLeft: '0' }} className="result-main-content">
          <main className="main-content-offset px-3 px-lg-5 py-4 py-lg-5">
            <ProfileContent 
              email={email} setEmail={setEmail}
              name={name} setName={setName}
              isEditing={isEditing} setIsEditing={setIsEditing}
              handleSave={handleSave} handleLogout={handleLogout}
            />
          </main>
        </div>

      </div>
    </div>
  );
}

function ProfileContent({ email, setEmail, name, setName, isEditing, setIsEditing, handleSave, handleLogout }) {
  return (
    <div style={{ maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* ── TOP HEADER BACK NAVIGATION ── */}
      <div>
        <Link 
          to="/result" 
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'transparent', border: 'none', color: '#553722',
            fontWeight: '700', fontSize: '16px', textDecoration: 'none',
            cursor: 'pointer', transition: 'opacity 0.15s'
          }}
          className="hover:opacity-80"
        >
          <ArrowLeft size={18} />
          Kembali
        </Link>
      </div>

      {/* ── PROFILE HEADER SECTION ── */}
      <div 
        style={{
          display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
          paddingBottom: '32px', borderBottom: '1px solid #d4c3ba'
        }}
      >
        {/* Avatar Area */}
        <div style={{ position: 'relative' }}>
          <div 
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #553722, #a0f399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '64px', color: '#fff', fontWeight: '800',
              border: '4px solid #fff',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          {/* Edit Badge Overlay */}
          <button 
            style={{
              position: 'absolute', bottom: '4px', right: '4px',
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#fff', border: '1.5px solid #d4c3ba',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', cursor: 'pointer',
              color: '#553722'
            }}
            className="hover:scale-105 transition-transform"
            onClick={() => setIsEditing(true)}
            aria-label="Change Avatar"
          >
            <Camera size={18} />
          </button>
        </div>

        {/* Display name and Membership Info */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#50453e' }}>DISPLAY NAME</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                style={{
                  background: '#fff', border: '1.5px solid #d4c3ba', borderRadius: '8px',
                  padding: '8px 12px', fontSize: '16px', fontWeight: '600', color: '#1b1c1c', outline: 'none'
                }}
              />
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1b1c1c', margin: 0, letterSpacing: '-0.32px' }}>
                {name}
              </h2>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#50453e', margin: '4px 0 0 0' }}>
                Member since Oct 2023
              </p>
            </>
          )}
        </div>

        {/* Actions Area */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {isEditing ? (
            <button 
              onClick={handleSave}
              style={{
                background: '#1b6d24', color: '#fff',
                border: 'none', borderRadius: '12px',
                padding: '10px 24px', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}
              className="hover:opacity-90"
            >
              Simpan Profil
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              style={{
                background: 'transparent', color: '#553722',
                border: '1px solid #82746d', borderRadius: '12px',
                padding: '9px 25px', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}
              className="hover:bg-[#eae6e4] hover:scale-[1.02] transition-transform"
            >
              Edit Profile
            </button>
          )}
          
          <button 
            onClick={handleLogout}
            style={{
              background: '#ba1a1a', color: '#fff',
              border: 'none', borderRadius: '12px',
              padding: '10px 24px', fontSize: '14px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s ease'
            }}
            className="hover:opacity-90 hover:scale-[1.02] transition-transform"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ── BENTO SETTINGS GRID ── */}
      <div className="row g-4">
        
        {/* CARD 1: Biometric Settings */}
        <div className="col-12 col-lg-4">
          <div 
            style={{
              background: '#white', border: '1px solid #d4c3ba', borderRadius: '12px',
              padding: '28px', minHeight: '446px', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', backgroundColor: '#ffffff',
              boxShadow: '0px 2px 2px rgba(27, 28, 28, 0.04)'
            }}
            className="hover-lift"
          >
            <div>
              {/* Card Title Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div 
                  style={{
                    background: '#f0eded', width: '40px', height: '40px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#553722'
                  }}
                >
                  <User size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1b1c1c', margin: 0, lineHeight: 1.2 }}>
                    Biometric Settings
                  </h3>
                </div>
              </div>

              {/* Rows Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Berat Badan */}
                <div 
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingBottom: '12px', borderBottom: '1px solid rgba(212,195,186,0.5)'
                  }}
                >
                  <span style={{ fontSize: '16px', color: '#50453e' }}>Berat Badan</span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#553722' }}>74 kg</span>
                </div>

                {/* Sensitivity Badge */}
                <div 
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingBottom: '12px', borderBottom: '1px solid rgba(212,195,186,0.5)'
                  }}
                >
                  <span style={{ fontSize: '16px', color: '#50453e' }}>Caffeine Sensitivity</span>
                  <span 
                    style={{
                      background: '#724d30', color: '#f3c09c', borderRadius: '8px',
                      padding: '4px 10px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.6px'
                    }}
                  >
                    Medium-High
                  </span>
                </div>

                {/* Sleep Target */}
                <div 
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingBottom: '12px', borderBottom: '1px solid rgba(212,195,186,0.5)'
                  }}
                >
                  <span style={{ fontSize: '16px', color: '#50453e' }}>Sleep Target</span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#553722' }}>7.5 Jam</span>
                </div>

              </div>
            </div>

            {/* Note Footer */}
            <div style={{ opacity: 0.6, fontSize: '12px', fontStyle: 'italic', fontWeight: '500', color: '#50453e', marginTop: '24px' }}>
              Data ini digunakan untuk menghitung laju metabolisme kafein Anda.
            </div>

          </div>
        </div>

        {/* CARD 2: Personal Information & Account Security */}
        <div className="col-12 col-lg-8">
          <div 
            style={{
              background: '#white', border: '1px solid #d4c3ba', borderRadius: '12px',
              padding: '28px', minHeight: '446px', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', backgroundColor: '#ffffff',
              boxShadow: '0px 2px 2px rgba(27, 28, 28, 0.04)'
            }}
            className="hover-lift"
          >
            <div>
              {/* Card Title Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div 
                  style={{
                    background: '#f0eded', width: '40px', height: '40px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#553722'
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1b1c1c', margin: 0, lineHeight: 1.2 }}>
                    Personal Information
                  </h3>
                </div>
              </div>

              {/* Sub-containers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                
                {/* Email Address Block */}
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#50453e', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    EMAIL ADDRESS
                  </h4>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        background: '#fff', border: '1.5px solid #d4c3ba', borderRadius: '8px',
                        padding: '8px 12px', fontSize: '16px', color: '#553722', outline: 'none', width: '100%', maxWidth: '400px'
                      }}
                    />
                  ) : (
                    <p style={{ fontSize: '16px', color: '#553722', margin: 0, fontWeight: '500' }}>
                      {email}
                    </p>
                  )}
                </div>

                {/* Account Security Links Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#50453e', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    ACCOUNT SECURITY
                  </h4>
                  
                  {/* Link 1: Change Password */}
                  <button 
                    onClick={() => alert('Fitur ubah kata sandi akan segera hadir!')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: '#fff', border: '1px solid #d4c3ba', borderRadius: '8px',
                      padding: '16px', cursor: 'pointer', textAlign: 'left', width: '100%',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                    }}
                    className="hover:bg-[#fcf9f8] transition-colors"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Lock size={16} className="text-[#553722]" />
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1b1c1c' }}>
                        Change Password
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                  </button>

                  {/* Link 2: Two-Factor Auth */}
                  <button 
                    onClick={() => alert('Fitur Two-Factor Authentication akan segera hadir!')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: '#fff', border: '1px solid #d4c3ba', borderRadius: '8px',
                      padding: '16px', cursor: 'pointer', textAlign: 'left', width: '100%',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                    }}
                    className="hover:bg-[#fcf9f8] transition-colors"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Shield size={16} className="text-[#553722]" />
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1b1c1c' }}>
                        Two-Factor Auth
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                  </button>

                </div>

              </div>
            </div>
            
            {/* Empty footer offset matching biometric card structure */}
            <div></div>

          </div>
        </div>

      </div>

    </div>
  );
}
