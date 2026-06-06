// src/pages/ResultPage.jsx
import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { predictionService } from "../service/predictionService";
import { useAuthStore } from "../store/authStore";

// Day labels dan info kopi
const DAY_LABELS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const COFFEE_INFO = {
  Espresso: {
    label: "Espresso",
    range: "60–80 mg",
    perCup: 70,
    icon: "☕",
    color: "#553722",
    bg: "rgba(85,55,34,0.1)",
    border: "rgba(85,55,34,0.2)",
  },
  "Kopi Instan": {
    label: "Kopi Instan",
    range: "60–100 mg",
    perCup: 80,
    icon: "☕",
    color: "#57361c",
    bg: "rgba(87,54,28,0.1)",
    border: "rgba(87,54,28,0.2)",
  },
  "Latte / Cappuccino": {
    label: "Latte / Cappuccino",
    range: "60–125 mg",
    perCup: 90,
    icon: "🥛",
    color: "#553722",
    bg: "rgba(85,55,34,0.1)",
    border: "rgba(85,55,34,0.2)",
  },
  "Cold Brew": {
    label: "Cold Brew",
    range: "100–200 mg",
    perCup: 150,
    icon: "🧊",
    color: "#57361c",
    bg: "rgba(87,54,28,0.1)",
    border: "rgba(87,54,28,0.2)",
  },
  "Matcha / Teh Hijau": {
    label: "Matcha / Teh Hijau",
    range: "60–80 mg",
    perCup: 70,
    icon: "🍵",
    color: "#1b6d24",
    bg: "rgba(27,109,36,0.1)",
    border: "rgba(27,109,36,0.2)",
  },
};

// Donut gauge
function RiskGauge({ percent = 0, category = "Low" }) {
  const r = 80;
  const circ = 2 * Math.PI * r;
  const strokeDash = (percent / 100) * circ;
  const theme =
    category === "High"
      ? {
          bg: "#fee2e2",
          fg: "#b91c1c",
          label: "Risiko Tinggi",
          stroke: "#dc2626",
        }
      : category === "Moderate"
        ? {
            bg: "#fef3c7",
            fg: "#92400e",
            label: "Risiko Sedang",
            stroke: "#d97706",
          }
        : {
            bg: "#a0f399",
            fg: "#217128",
            label: "Risiko Rendah",
            stroke: "#1b6d24",
          };
  return (
    <div style={{ position: "relative", width: "192px", height: "192px" }}>
      <svg width="192" height="192" viewBox="0 0 192 192">
        <circle
          cx="96"
          cy="96"
          r={r}
          fill="none"
          stroke="#e8e0da"
          strokeWidth="20"
        />
        <circle
          cx="96"
          cy="96"
          r={r}
          fill="none"
          stroke={theme.stroke}
          strokeWidth="20"
          strokeDasharray={`${strokeDash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 96 96)"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <span
          style={{
            fontSize: "44px",
            fontWeight: "800",
            color: theme.fg,
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          {percent}%
        </span>
        <span
          style={{
            background: theme.bg,
            color: theme.fg,
            borderRadius: "9999px",
            padding: "2px 10px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {theme.label}
        </span>
      </div>
    </div>
  );
}

// Bar chart helper
const getTodayLabel = () => DAY_LABELS[new Date().getDay()];
const buildWeeklyBarData = (currentMg) => {
  const todayIndex = new Date().getDay();
  return DAY_LABELS.map((day, i) => ({
    day,
    mg: i === todayIndex ? Number(currentMg || 0) : 0,
    active: i === todayIndex,
  }));
};

// Modal close icon
const IconClose = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();

  const [result, setResult] = useState(location.state?.result ?? null);
  const [loading, setLoading] = useState(!location.state?.result);
  const [extraCaffeine, setExtraCaffeine] = useState(0);

  // Fetch latest prediction jika halaman di-refresh
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/assessment", { replace: true });
      return;
    }
    if (location.state?.result) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const response = await predictionService.getAll();
        const items = response.data?.items || [];
        if (!items.length) {
          navigate("/assessment", { replace: true });
          return;
        }
        const latest = items[0];
        setResult({ ...latest, input: latest });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoggedIn, location.state, navigate]);

  if (loading) return <div>Memuat...</div>;
  if (!result) return null;

  // Total kafein sesuai jumlah cangkir × perCup
  const dailyCups = Number(
    result.input?.dailyCups || result.input?.coffeeIntake || 0,
  );
  const coffeeType = result.input?.coffeeType || "Espresso";
  const coffeeInfo = COFFEE_INFO[coffeeType] || COFFEE_INFO["Espresso"];
  const totalCaffeine = dailyCups * coffeeInfo.perCup + extraCaffeine;

  const weeklyBarData = buildWeeklyBarData(totalCaffeine);
  const weeklyMaxMg = Math.max(...weeklyBarData.map((d) => d.mg), 1);

  const detectedSources = [
    {
      label: `${coffeeInfo.label} (${dailyCups} cangkir)`,
      detail: coffeeInfo.range,
      total: `${dailyCups * coffeeInfo.perCup} mg total`,
      color: coffeeInfo.color,
      bg: coffeeInfo.bg,
      border: coffeeInfo.border,
      icon: coffeeInfo.icon,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        background: "#fcf9f8",
      }}
    >
      <Header />
      <div
        style={{
          padding: "28px 16px 80px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#553722" }}>
          Biometric Overview
        </h1>

        {/* Kadar kafein mingguan */}
        <div
          style={{
            marginTop: "24px",
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#50453e",
              textTransform: "uppercase",
            }}
          >
            KADAR KAFEIN MINGGUAN
          </h3>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "flex-end",
              marginTop: "12px",
            }}
          >
            {weeklyBarData.map((d, i) => (
              <div
                key={d.day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: d.mg ? `${(d.mg / weeklyMaxMg) * 200}px` : "20px",
                    background: d.active ? "#553722" : "#f6f3f2",
                    borderRadius: "6px 6px 0 0",
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: d.active ? "700" : "400",
                    color: d.active ? "#553722" : "#50453e",
                  }}
                >
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sumber terdeteksi */}
        <div style={{ marginTop: "28px" }}>
          <h3
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#50453e",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            SUMBER TERDETEKSI
          </h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {detectedSources.map((src) => (
              <div
                key={src.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: src.bg,
                  border: `1px solid ${src.border}`,
                  borderRadius: "9999px",
                  padding: "5px 14px",
                  fontSize: "14px",
                  color: src.color,
                }}
              >
                <span>{src.icon}</span>
                {src.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
