import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot
} from 'recharts';

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
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#50453e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#50453e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M19.07 19.07A10 10 0 0 0 4.93 4.93"/>
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);
const IconFocus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconEngine = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconChart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconInfo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#553722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#217128" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);
const IconBrain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#553722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);
const IconClearance = () => (
  <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="#553722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

export default function SimulationPage() {
  // 1. Simulation Engine State variables (defaults matching Figma spec)
  const [hydration, setHydration] = useState(85); // 85%
  const [activity, setActivity] = useState(50); // 50 (Moderate)
  const [stress, setStress] = useState(50); // 50 (Medium/Cortisol)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Calculations based on metabolic formulas
  // Base clearance half-life of caffeine is typically 5.0 hours.
  // - High hydration speeds up clearance (lower half-life): hydration factor = 1 - (hydration - 50) / 250 (at 85% -> 0.86)
  // - High physical activity speeds up clearance (lower half-life): activity factor = 1 - (activity / 200) (at 50 -> 0.75)
  // - High stress slows down clearance due to cortisol competition: stress factor = 1 + (stress / 120) (at 50 -> 1.41)
  const calculatedHalfLife = useMemo(() => {
    const hydFactor = 1 - (hydration - 50) / 250;
    const actFactor = 1 - (activity / 200);
    const strFactor = 1 + (stress / 120);
    const halfLife = 5.0 * hydFactor * actFactor * strFactor;
    return Math.max(3.0, Math.min(8.5, halfLife)); // clamped for stability
  }, [hydration, activity, stress]);

  // Clearance Rate: dynamic calculation (mg/hr)
  // At baseline (hydration 85%, activity 50%, stress 50%), clearance rate is exactly ~14.2 mg/hr
  const clearanceRate = useMemo(() => {
    const baseCaffeine = 100; // standard remaining caffeine (mg)
    const decayConstant = Math.log(2) / calculatedHalfLife;
    const rate = baseCaffeine * decayConstant;
    return rate.toFixed(1);
  }, [calculatedHalfLife]);

  // Clearance Speedup relative to global average (5.7h half-life)
  const clearancePercentDiff = useMemo(() => {
    const avgHalfLife = 5.7;
    const diff = ((avgHalfLife - calculatedHalfLife) / avgHalfLife) * 100;
    return Math.round(diff);
  }, [calculatedHalfLife]);

  // Dynamic Waktu Tidur Aman (Safe Sleep Time)
  // Safe sleep threshold is when active caffeine drops below 30mg.
  // Supposing initial dose of 150mg at 08:00 AM.
  // hoursToSafe = -halfLife * log2(30 / 150)
  const safeSleepTime = useMemo(() => {
    const dose = 150;
    const limit = 30;
    const hoursToSafe = -calculatedHalfLife * Math.log2(limit / dose);
    
    // Convert to time starting from 08:00 AM (8.0 decimal hour)
    const baseHour = 8;
    const targetHourDecimal = baseHour + hoursToSafe;
    
    const hour = Math.floor(targetHourDecimal) % 24;
    const minutes = Math.floor((targetHourDecimal % 1) * 60);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const minuteStr = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${hour}:${minuteStr} ${ampm}`;
  }, [calculatedHalfLife]);

  // Dynamic Fokus Maksimal (Peak Focus time)
  // Moderate/high activity shifts peak absorption slightly earlier. High stress delays it.
  const peakFocusTime = useMemo(() => {
    // base peak is 1.5h after 08:00 AM -> 09:30 AM
    // we shift it based on metabolic rate. Figma design target is "2:15 PM" for a secondary dose
    // Let's model a second dose at 12:30 PM. Peak focus = 12:30 + (1.75 - activity/200 + stress/200) hours
    const baseHour = 12.5; // 12:30 PM
    const shift = 1.75 - (activity / 200) + (stress / 200);
    const targetHourDecimal = baseHour + shift;

    const hour = Math.floor(targetHourDecimal) % 24;
    const minutes = Math.floor((targetHourDecimal % 1) * 60);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const minuteStr = minutes < 10 ? `0${minutes}` : minutes;

    return `${hour12}:${minuteStr} ${ampm}`;
  }, [activity, stress]);

  // Cardiac Output (BPM)
  // Increases with physical activity and cortisol stress.
  // Figma design exact: 112 BPM
  const cardiacOutput = useMemo(() => {
    const baseHR = 70;
    const actContribution = activity * 0.6; // moderate (50) -> 30 BPM
    const strContribution = stress * 0.24; // medium (50) -> 12 BPM
    return Math.round(baseHR + actContribution + strContribution);
  }, [activity, stress]);

  // Cognitive Load
  // Determined by Cortisol + Active Caffeine. High stress and caffeine = High cognitive load.
  const cognitiveLoad = useMemo(() => {
    const totalScore = stress * 0.6 + (100 - calculatedHalfLife * 10) * 0.4;
    if (totalScore > 70) return 'Ekstrem';
    if (totalScore > 40) return 'Tinggi';
    if (totalScore > 20) return 'Sedang';
    return 'Optimal';
  }, [stress, calculatedHalfLife]);

  // 3. Dynamic Serum Concentration Chart Curve Data
  // Plotted from 08:00 AM to 00:00 AM (16 hours)
  const chartData = useMemo(() => {
    const data = [];
    const hours = [
      { label: '08:00', t: 0 },
      { label: '10:00', t: 2 },
      { label: '12:00', t: 4 },
      { label: '14:00', t: 6 },
      { label: '16:00', t: 8 },
      { label: '18:00', t: 10 },
      { label: '20:00', t: 12 },
      { label: '22:00', t: 14 },
      { label: '00:00', t: 16 }
    ];

    // Dose 1 at 08:00 (150mg)
    // Dose 2 at 12:30 (50mg) (causes a bump in current concentration curve)
    hours.forEach(({ label, t }) => {
      // Baseline calculation (fixed half-life of 5.5 hours, single dose of 150mg)
      const baseHalfLife = 5.5;
      let baselineMg = 150 * Math.pow(0.5, t / baseHalfLife);
      if (t >= 4.5) {
        baselineMg += 50 * Math.pow(0.5, (t - 4.5) / baseHalfLife);
      }

      // Current calculation (dynamic half-life)
      let currentMg = 150 * Math.pow(0.5, t / calculatedHalfLife);
      if (t >= 4.5) {
        currentMg += 50 * Math.pow(0.5, (t - 4.5) / calculatedHalfLife);
      }

      data.push({
        name: label,
        'Current': Math.round(currentMg),
        'Baseline': Math.round(baselineMg)
      });
    });
    return data;
  }, [calculatedHalfLife]);

  // Sidebar navigation items
  const navItems = [
    { icon: <IconDashboard />, label: 'Dashboard', active: false, to: '/result' },
    { icon: <IconSimulation />, label: 'Simulasi', active: true, to: '/simulation' },
    { icon: <IconHistory />, label: 'Riwayat', active: false, to: '/history' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fcf9f8', fontFamily: "'Inter', sans-serif" }}>

      {/* ── GLOBAL HEADER ── */}
      <Header />

      {/* Main Layout Container (Sidebar + Content) */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* ── SIDEBAR (DESKTOP) ── */}
        <aside style={{
          width: '256px', height: 'calc(100vh - 73px)', background: '#fcf9f8',
          borderRight: '1px solid #d4c3ba', padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'fixed', left: 0, top: '73px', zIndex: 100,
          transition: 'transform 0.3s ease',
        }} className="d-none d-lg-flex">
          <div>
            {/* Brand */}
            <div style={{ paddingBottom: '40px' }}>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#553722', lineHeight: 1.2 }}>KopiMetric</div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#50453e', letterSpacing: '0.14px', marginTop: '2px' }}>Analisis kebutuhan kafein</div>
            </div>

            {/* Navigation */}
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
            }}>A</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1b1c1c' }}>Alex Chen</div>
              <Link 
                to="/profile" 
                style={{ 
                  fontSize: '12px', 
                  color: '#82746d', 
                  textDecoration: 'none', 
                  cursor: 'pointer', 
                  transition: 'color 0.15s' 
                }}
                className="hover-text-green"
              >
                Edit Profil
              </Link>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="main-content-offset" style={{ flex: 1, minWidth: 0, width: '100%' }}>
          <main style={{ padding: '28px 16px 80px', boxSizing: 'border-box', width: '100%', maxWidth: '1200px' }}>
          
          {/* Heading */}
          <div className="mb-4">
            <h1 style={{ fontSize: 'clamp(20px, 5vw, 32px)', fontWeight: '700', color: '#1b1c1c', margin: 0, letterSpacing: '-0.32px' }}>
              Simulasi Metabolik
            </h1>
            <p style={{ fontSize: '15px', color: '#50453e', marginTop: '6px', marginBottom: 0 }}>
              Sesuaikan variabel fisiologis Anda untuk memprediksi pembersihan kafein dan kesiapan tidur.
            </p>
          </div>

          {/* Bento-Style Grid Layout */}
          <div className="row g-4 mb-4">
            
            {/* Column 1: Bento Simulation Engine Controls + Quick Stats */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              
              {/* Simulation Engine Bento Card */}
              <div style={{
                background: '#fff', border: '1px solid #d4c3ba', borderRadius: '12px',
                padding: '24px', boxShadow: '0px 2px 2px rgba(30, 30, 30, 0.04)',
                display: 'flex', flexDirection: 'column', gap: '24px'
              }} className="hover-lift">
                
                {/* Header Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconEngine />
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#553722', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    MESIN SIMULASI
                  </span>
                </div>

                {/* Hydration Slider */}
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#50453e' }}>Tingkat Hidrasi</span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#1b6d24' }}>{hydration}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={hydration} 
                    onChange={(e) => setHydration(+e.target.value)}
                    style={{ width: '100%', accentColor: '#1b6d24', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '10px', color: '#50453e', opacity: 0.7 }}>
                    Hidrasi yang lebih tinggi mempercepat pembuangan melalui ginjal.
                  </span>
                </div>

                {/* Physical Activity Slider */}
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#50453e' }}>Aktivitas Fisik</span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#553722' }}>
                      {activity < 33 ? 'Istirahat' : activity < 70 ? 'Sedang' : 'Aktif'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={activity} 
                    onChange={(e) => setActivity(+e.target.value)}
                    style={{ width: '100%', accentColor: '#553722', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '10px', color: '#50453e', opacity: 0.7 }}>
                    Laju metabolisme meningkat seiring dengan curah jantung.
                  </span>
                </div>

                {/* Stress Slider */}
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#50453e' }}>Stres Saat Ini (Kortisol)</span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#ba1a1a' }}>
                      {stress < 33 ? 'Rendah' : stress < 70 ? 'Sedang' : 'Tinggi'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={stress} 
                    onChange={(e) => setStress(+e.target.value)}
                    style={{ width: '100%', accentColor: '#ba1a1a', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '10px', color: '#50453e', opacity: 0.7 }}>
                    Hormon stres bersaing dalam jalur enzimatik.
                  </span>
                </div>

              </div>

              {/* Impact Analysis (Quick Stats Side-by-Side) */}
              <div className="row g-3">
                {/* Waktu Tidur Aman */}
                <div className="col-12 col-sm-6">
                  <div style={{
                    background: '#a0f399', border: '1px solid rgba(27,109,36,0.2)',
                    borderRadius: '12px', padding: '18px', display: 'flex',
                    flexDirection: 'column', justifyContent: 'space-between', height: '128px'
                  }} className="hover-lift">
                    <IconMoon />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#217128', letterSpacing: '0.6px', textTransform: 'uppercase', opacity: 0.8 }}>
                        Waktu Tidur Aman
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#217128', marginTop: '4px' }}>
                        {safeSleepTime}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fokus Maksimal */}
                <div className="col-12 col-sm-6">
                  <div style={{
                    background: '#6f4e37', border: '1px solid rgba(85,55,34,0.2)',
                    borderRadius: '12px', padding: '18px', display: 'flex',
                    flexDirection: 'column', justifyContent: 'space-between', height: '128px',
                    color: '#eec1a4'
                  }} className="hover-lift">
                    <IconFocus />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#eec1a4', letterSpacing: '0.6px', textTransform: 'uppercase', opacity: 0.8 }}>
                        Fokus Maksimal
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#eec1a4', marginTop: '4px' }}>
                        {peakFocusTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Recharts Line Graph + Dynamic AI Insight */}
            <div className="col-12 col-lg-8">
              <div style={{
                background: '#fff', border: '1px solid #d4c3ba', borderRadius: '12px',
                padding: '24px', boxShadow: '0px 2px 2px rgba(30, 30, 30, 0.04)',
                minHeight: '445px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }} className="hover-lift">
                
                {/* Graph Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <IconChart />
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#553722', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                      PROYEKSI KONSENTRASI SERUM
                    </span>
                  </div>
                  {/* Legend */}
                  <div className="d-flex gap-3 align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1b6d24' }} />
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#1b6d24' }}>Saat Ini</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#82746d' }} />
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#82746d' }}>Kondisi Dasar</span>
                    </div>
                  </div>
                </div>

                {/* Line Chart Render */}
                <div style={{ width: '100%', height: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d4c3ba" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#50453e" fontSize={10} tickLine={false} axisLine={{ stroke: '#d4c3ba' }} />
                      <YAxis stroke="#50453e" fontSize={10} tickLine={false} axisLine={{ stroke: '#d4c3ba' }} domain={[0, 200]} tickFormatter={(v) => `${v}mg`} />
                      <Tooltip 
                        contentStyle={{ background: '#1b1c1c', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Current" 
                        stroke="#1b6d24" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 0, fill: '#1b6d24' }}
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Baseline" 
                        stroke="#82746d" 
                        strokeWidth={2} 
                        strokeDasharray="4 4"
                        dot={{ r: 2, fill: '#82746d', strokeWidth: 0 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Dynamic Insight Box */}
                <div style={{
                  background: '#f6f3f2', borderRadius: '8px', padding: '16px',
                  display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '16px'
                }}>
                  <IconInfo />
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#1b1c1c' }}>Wawasan: </span>
                    <span style={{ fontSize: '12px', color: '#50453e', lineHeight: '1.6' }}>
                      Berdasarkan tingkat aktivitas Anda yang <strong>{activity < 33 ? 'rendah' : activity < 70 ? 'sedang' : 'tinggi'}</strong> dan tingkat hidrasi yang <strong>{hydration < 65 ? 'kurang' : hydration < 85 ? 'cukup' : 'tinggi'}</strong>, 
                      kecepatan pembuangan kafein Anda <strong>{clearancePercentDiff > 0 ? `${clearancePercentDiff}% lebih cepat` : clearancePercentDiff < 0 ? `${Math.abs(clearancePercentDiff)}% lebih lambat` : 'sama'}</strong> dari rata-rata. 
                      Anda dapat mengonsumsi {Math.max(20, Math.round(100 - stress))} mg lagi dengan aman sebelum pukul 14.00 tanpa mengganggu kualitas tidur.
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bento-Grid Row 2: Detailed Impact Analysis Grid */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#50453e', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Analisis Dampak Detail
            </div>
            
            <div className="row g-3">
              {/* Cardiac Output */}
              <div className="col-12 col-md-4">
                <div style={{
                  background: '#fff', border: '1px solid #d4c3ba', borderRadius: '12px',
                  padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px'
                }} className="hover-lift">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{
                      background: 'rgba(27, 109, 36, 0.1)', width: '40px', height: '40px',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <IconHeart />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1b1c1c' }}>Curah Jantung (Cardiac Output)</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#1b1c1c', marginTop: '8px' }}>
                    {cardiacOutput} BPM
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#1b6d24' }}>
                    {activity > 70 ? 'Output puncak tingkat olahraga' : 'Prediksi puncak saat berolahraga'}
                  </span>
                </div>
              </div>

              {/* Cognitive Load */}
              <div className="col-12 col-md-4">
                <div style={{
                  background: '#fff', border: '1px solid #d4c3ba', borderRadius: '12px',
                  padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px'
                }} className="hover-lift">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{
                      background: 'rgba(85, 55, 34, 0.1)', width: '40px', height: '40px',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <IconBrain />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1b1c1c' }}>Beban Kognitif (Cognitive Load)</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#1b1c1c', marginTop: '8px' }}>
                    {cognitiveLoad}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#553722' }}>
                    {cognitiveLoad === 'Ekstrem' ? 'Risiko kecemasan tinggi' : 'Optimal untuk tugas analitis'}
                  </span>
                </div>
              </div>

              {/* Clearance Rate */}
              <div className="col-12 col-md-4">
                <div style={{
                  background: '#fff', border: '1px solid #d4c3ba', borderRadius: '12px',
                  padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px'
                }} className="hover-lift">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{
                      background: 'rgba(87, 54, 28, 0.1)', width: '40px', height: '40px',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <IconClearance />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1b1c1c' }}>Laju Pembersihan (Clearance Rate)</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#1b1c1c', marginTop: '8px' }}>
                    {clearanceRate} mg/jam
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#50453e' }}>
                    Bervariasi berdasarkan hidrasi
                  </span>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>
      </div>

      {/* ── MOBILE BOTTOM NAVIGATION (hidden on desktop) ── */}
      <nav className="d-flex d-lg-none" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        background: '#fcf9f8', borderTop: '1px solid #d4c3ba',
        padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
        justifyContent: 'space-around', alignItems: 'center'
      }}>
        {navItems.map(({ icon, label, active, to }) => (
          <Link
            key={label}
            to={to}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              padding: '6px 16px', borderRadius: '10px', textDecoration: 'none',
              background: active ? 'rgba(160,243,153,0.2)' : 'transparent',
              color: active ? '#217128' : '#82746d',
              fontSize: '11px', fontWeight: active ? '600' : '400',
              transition: 'all 0.15s', minWidth: '64px'
            }}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
