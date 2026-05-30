import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  HelpCircle,
  Info,
  Heart,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const { user, isLoggedIn, logout, initAuth } = useAuthStore();
  const userName = user?.name || "User";
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Init Auth dari LocalStorage
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className="bg-black text-white sticky-top z-50 shadow-md py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
    >
      {/* Custom style overrides for profile dropdown items */}
      <style>{`
        .custom-profile-dropdown-item {
          color: #50453e !important;
          background-color: transparent !important;
          transition: all 0.15s ease !important;
          border: none !important;
          text-align: left !important;
        }
        .custom-profile-dropdown-item:hover {
          color: #1b6d24 !important;
          background-color: rgba(160, 243, 153, 0.15) !important;
        }
        .custom-profile-dropdown-item:hover svg {
          color: #1b6d24 !important;
        }
        .custom-profile-dropdown-item-logout {
          color: #ba1a1a !important;
          background-color: transparent !important;
          transition: all 0.15s ease !important;
          border: none !important;
          text-align: left !important;
        }
        .custom-profile-dropdown-item-logout:hover {
          color: #ba1a1a !important;
          background-color: rgba(250, 230, 230, 0.5) !important;
        }
      `}</style>

      <div className="container-xl d-flex justify-content-between align-items-center px-4 position-relative">
        {/* BRAND LOGO */}
        <Link
          to="/"
          className="d-flex align-items-center text-decoration-none text-white hover:opacity-90"
        >
          <span
            className="fs-3 fw-bold tracking-tight text-white m-0"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            ScansCoffee
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="d-none d-md-flex align-items-center gap-4">
          <Link
            to="/"
            className={`text-white text-decoration-none transition-colors py-2 ${location.pathname === "/" ? "fw-bold border-bottom border-[#9ee86f]" : "opacity-75 hover:opacity-100"}`}
          >
            Beranda
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/result"
                className={`text-white text-decoration-none transition-colors py-2 ${location.pathname === "/result" ? "fw-bold border-bottom border-[#9ee86f]" : "opacity-75 hover:opacity-100"}`}
              >
                Dashboard
              </Link>
              <Link
                to="/simulation"
                className={`text-white text-decoration-none transition-colors py-2 ${location.pathname === "/simulation" ? "fw-bold border-bottom border-[#9ee86f]" : "opacity-75 hover:opacity-100"}`}
              >
                Simulation
              </Link>
              <Link
                to="/history"
                className={`text-white text-decoration-none transition-colors py-2 ${location.pathname === "/history" ? "fw-bold border-bottom border-[#9ee86f]" : "opacity-75 hover:opacity-100"}`}
              >
                Riwayat
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick("features")}
                className="bg-transparent border-0 text-white text-decoration-none opacity-75 hover:opacity-100 transition-colors py-2"
              >
                Fitur
              </button>
              <button
                onClick={() => handleNavClick("how-it-works")}
                className="bg-transparent border-0 text-white text-decoration-none opacity-75 hover:opacity-100 transition-colors py-2"
              >
                Cara Kerja
              </button>
              <button
                onClick={() => handleNavClick("analysis")}
                className="bg-transparent border-0 text-white text-decoration-none opacity-75 hover:opacity-100 transition-colors py-2"
              >
                Preview Dashboard
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="bg-transparent border-0 text-white text-decoration-none opacity-75 hover:opacity-100 transition-colors py-2"
              >
                Tentang Kami
              </button>
            </>
          )}
        </nav>

        {/* RIGHT ACTIONS AREA */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {isLoggedIn ? (
            /* USER LOGGED IN - Profile circle and Dropdown trigger */
            <div className="position-relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="btn border-0 p-0 bg-transparent d-flex align-items-center gap-2 text-white hover:opacity-90"
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #553722, #a0f399)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    color: "#fff",
                    fontWeight: "700",
                    border: "2px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* PROFILE DROPDOWN MENU */}
              {isProfileDropdownOpen && (
                <div
                  className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border border-[#d4c3ba] py-2 overflow-hidden animate-fade-in"
                  style={{ width: "260px", zIndex: 1000, top: "100%" }}
                >
                  {/* User Profile Info Header inside dropdown */}
                  <div className="px-4 py-3 bg-[#fcf9f8] border-bottom border-[#eae7e7]">
                    <div
                      className="fw-bold text-[#1b1c1c]"
                      style={{ fontSize: "15px" }}
                    >
                      {userName}
                    </div>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      alex.chen@scanscoffee.com
                    </div>
                    <span
                      className="badge bg-[#1b6d24]/10 text-[#1b6d24] mt-1.5 fw-semibold"
                      style={{ fontSize: "10px" }}
                    >
                      Active Member
                    </span>
                  </div>

                  {/* Dropdown Items (Features not in the main navbar) */}
                  <div className="py-1">
                    <Link
                      to="/assessment"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="custom-profile-dropdown-item d-flex align-items-center gap-2.5 px-4 py-2.5 text-decoration-none w-100"
                      style={{ fontSize: "14px" }}
                    >
                      <ArrowUpRight size={16} className="text-[#1b6d24]" />
                      <span>Mulai Assessment</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleNavClick("features");
                      }}
                      className="custom-profile-dropdown-item d-flex align-items-center gap-2.5 px-4 py-2.5 w-100 bg-transparent border-0"
                      style={{ fontSize: "14px" }}
                    >
                      <HelpCircle size={16} className="text-muted" />
                      <span>Fitur Utama</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleNavClick("how-it-works");
                      }}
                      className="custom-profile-dropdown-item d-flex align-items-center gap-2.5 px-4 py-2.5 w-100 bg-transparent border-0"
                      style={{ fontSize: "14px" }}
                    >
                      <Info size={16} className="text-muted" />
                      <span>Cara Kerja AI</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleNavClick("about");
                      }}
                      className="custom-profile-dropdown-item d-flex align-items-center gap-2.5 px-4 py-2.5 w-100 bg-transparent border-0"
                      style={{ fontSize: "14px" }}
                    >
                      <Heart size={16} className="text-muted" />
                      <span>Tentang Kami</span>
                    </button>

                    <Link
                      to="/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="custom-profile-dropdown-item d-flex align-items-center gap-2.5 px-4 py-2.5 w-100 text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      <Settings size={16} className="text-muted" />
                      <span>Edit Profil</span>
                    </Link>

                    {/* Logout divider and trigger */}
                    <div className="border-top border-[#eae7e7] my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="custom-profile-dropdown-item-logout d-flex align-items-center gap-2.5 px-4 py-2.5 w-100 bg-transparent border-0"
                      style={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      <LogOut size={16} />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* USER LOGGED OUT - Standard CTAs */
            <>
              <button
                onClick={() => navigate("/assessment")}
                className="d-none d-sm-inline-flex btn bg-[#a0f399] text-black border-0 fw-semibold px-4 py-2 hover-lift"
                style={{ borderRadius: "12px", fontSize: "14.5px" }}
              >
                Mulai Assessment
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-outline-light border-0 fw-semibold px-3 py-2 hover-lift"
                style={{ borderRadius: "12px", fontSize: "14.5px" }}
              >
                Masuk
              </button>
            </>
          )}

          {/* MOBILE TOGGLE BURGER BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="d-inline-flex d-md-none btn btn-outline-light border-0 p-2"
            style={{ borderRadius: "10px" }}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div
            className="d-md-none bg-black border-top border-secondary border-opacity-20 position-absolute start-0 end-0 py-3 px-4 shadow-lg"
            style={{ top: "100%", zIndex: 40 }}
          >
            <nav className="d-flex flex-column gap-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-decoration-none opacity-80 hover:opacity-100 transition-colors py-2 border-bottom border-secondary border-opacity-25"
              >
                Beranda
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/result"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-decoration-none opacity-80 hover:opacity-100 transition-colors py-2 border-bottom border-secondary border-opacity-25"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/simulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-decoration-none opacity-80 hover:opacity-100 transition-colors py-2 border-bottom border-secondary border-opacity-25"
                  >
                    Simulation
                  </Link>
                  <Link
                    to="/history"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-decoration-none opacity-80 hover:opacity-100 transition-colors py-2 border-bottom border-secondary border-opacity-25"
                  >
                    Riwayat
                  </Link>
                  <Link
                    to="/assessment"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-decoration-none opacity-80 hover:opacity-100 transition-colors py-2 border-bottom border-secondary border-opacity-25"
                  >
                    Mulai Assessment
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-danger bg-transparent border-0 text-start py-2 text-decoration-none opacity-90 hover:opacity-100"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick("features")}
                    className="bg-transparent border-0 text-white text-decoration-none opacity-80 hover:opacity-100 text-start py-2 border-bottom border-secondary border-opacity-25"
                  >
                    Fitur
                  </button>
                  <button
                    onClick={() => handleNavClick("how-it-works")}
                    className="bg-transparent border-0 text-white text-decoration-none opacity-80 hover:opacity-100 text-start py-2 border-bottom border-secondary border-opacity-25"
                  >
                    Cara Kerja
                  </button>
                  <button
                    onClick={() => handleNavClick("analysis")}
                    className="bg-transparent border-0 text-white text-decoration-none opacity-80 hover:opacity-100 text-start py-2 border-bottom border-secondary border-opacity-25"
                  >
                    Preview Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick("about")}
                    className="bg-transparent border-0 text-white text-decoration-none opacity-80 hover:opacity-100 text-start py-2 mb-2"
                  >
                    Tentang Kami
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/assessment");
                    }}
                    className="btn bg-[#a0f399] text-black border-0 fw-semibold w-100 py-2.5"
                    style={{ borderRadius: "12px" }}
                  >
                    Mulai Assessment
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
