import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/icons/Logo.png";

/** Close when clicking outside / pressing Esc (desktop dropdown only) */
function useOutsideCloser(isOpen, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const click = (e) =>
      ref.current && !ref.current.contains(e.target) && onClose();
    const key = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", click);
    document.addEventListener("touchstart", click, { passive: true });
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", click);
      document.removeEventListener("touchstart", click);
      document.removeEventListener("keydown", key);
    };
  }, [isOpen, onClose]);
  return ref;
}

/** Utility: close the mobile drawer checkbox if present */
function closeDrawer() {
  const el = document.getElementById("nav-drawer");
  if (el) el.checked = false;
}

/** Desktop dropdown */
function NavDropdown({ id, label, items, align = "start", openId, setOpenId }) {
  const isOpen = openId === id;
  const close = () => setOpenId(null);
  const toggle = () => setOpenId(isOpen ? null : id);
  const ref = useOutsideCloser(isOpen, close);

  return (
    <div
      ref={ref}
      className={`dropdown ${isOpen ? "dropdown-open" : ""} ${
        align === "end" ? "dropdown-end" : ""
      }`}
    >
      <button
        type="button"
        onClick={toggle}
        onMouseDown={(e) => e.stopPropagation()} // cegah bubbling ke document
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="btn btn-ghost"
      >
        {label}
      </button>

      <ul
        className="dropdown-content menu bg-base-100 rounded-box w-56 p-2 shadow z-50"
        role="menu"
        onMouseDown={(e) => e.stopPropagation()} // ekstra guard
      >
        {items.map((it) => (
          <li key={it.href} role="none">
            <NavLink
              to={it.href}
              role="menuitem"
              className={({ isActive }) =>
                `justify-between hover:bg-base-300 transition-colors ${
                  isActive ? "text-primary font-semibold" : ""
                }`
              }
              onPointerDown={close}
              onClick={close}
            >
              {it.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const [openId, setOpenId] = useState(null);
  const location = useLocation();

  // Tutup semua dropdown saat route berubah
  useEffect(() => {
    setOpenId(null);
  }, [location.key]);

  const profilItems = [
    { href: "/profil/tentang", label: "Tentang" },
    { href: "/profil/guru-staff", label: "Guru & Staf" },
    { href: "/profil/galeri", label: "Galeri" },
    { href: "/profil/berita", label: "Berita" },
  ];
  const akademikItems = [
    { href: "/akademik/informasi", label: "Informasi" },
    { href: "/akademik/ekstrakurikuler", label: "Ekstrakurikuler" },
    { href: "/akademik/materi-tugas", label: "Materi & Tugas" },
    { href: "/akademik/video", label: "Video Pembelajaran" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 supports-[backdrop-filter]:bg-base-100/80 backdrop-blur shadow-sm">
      {/* =================== MOBILE =================== */}
      <div className="lg:hidden">
        <div className="drawer">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="navbar max-w-screen-2xl mx-auto px-6">
              <div className="flex-none">
                <label
                  htmlFor="nav-drawer"
                  aria-label="Buka menu navigasi"
                  className="btn btn-ghost btn-square"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
              </div>

              <div className="flex-1 flex items-center pl-2">
                <Link
                  to="/"
                  className="inline-flex items-center"
                  onClick={closeDrawer}
                >
                  <img
                    src={logo}
                    alt="Logo SMPN 10 Balikpapan"
                    className="w-12 h-12 object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="nav-drawer"
              aria-label="Tutup menu navigasi"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4 text-base-content">
              <li>
                <details>
                  <summary>Profil</summary>
                  <ul>
                    {profilItems.map((it) => (
                      <li key={it.href}>
                        <NavLink
                          to={it.href}
                          className={({ isActive }) =>
                            isActive ? "text-primary font-semibold" : ""
                          }
                          onClick={closeDrawer}
                        >
                          {it.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              <li>
                <details>
                  <summary>Akademik</summary>
                  <ul>
                    {akademikItems.map((it) => (
                      <li key={it.href}>
                        <NavLink
                          to={it.href}
                          className={({ isActive }) =>
                            isActive ? "text-primary font-semibold" : ""
                          }
                          onClick={closeDrawer}
                        >
                          {it.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              <li>
                <NavLink
                  to="/spmb"
                  className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : ""
                  }
                  onClick={closeDrawer}
                >
                  SPMB
                </NavLink>
              </li>

              <li className="mt-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `btn btn-primary w-full ${
                      isActive ? "btn-active" : ""
                    } transition`
                  }
                  onClick={closeDrawer}
                  aria-label="Masuk ke akun"
                >
                  Masuk
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =================== DESKTOP =================== */}
      <div className="hidden lg:flex navbar max-w-screen-2xl mx-auto px-8 lg:px-24">
        <div className="flex-1">
          <Link to="/" className="inline-flex items-center">
            <img
              src={logo}
              alt="Logo SMPN 10 Balikpapan"
              className="w-16 h-16 object-contain"
            />
          </Link>
        </div>

        <div className="navbar-end gap-2">
          <NavDropdown
            id="profil"
            label="Profil"
            items={profilItems}
            openId={openId}
            setOpenId={setOpenId}
          />
          <NavDropdown
            id="akademik"
            label="Akademik"
            items={akademikItems}
            openId={openId}
            setOpenId={setOpenId}
          />

          <NavLink
            to="/spmb"
            className={({ isActive }) =>
              `btn btn-soft ${isActive ? "btn-active" : ""}`
            }
            aria-label="Halaman SPMB"
          >
            SPMB
          </NavLink>

          <NavLink
            to="/login"
            className="btn btn-primary"
            aria-label="Masuk ke akun"
          >
            Masuk
          </NavLink>
        </div>
      </div>
    </header>
  );
}
