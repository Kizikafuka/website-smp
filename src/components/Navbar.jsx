// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import logo from "../assets/icons/logo.png";

/** Close when clicking outside / pressing Esc */
function useOutsideCloser(isOpen, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick, { passive: true });
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);
  return ref;
}

/** Reusable dropdown button (desktop) */
function NavDropdown({ id, label, items, align = "start", openId, setOpenId }) {
  const isOpen = openId === id;
  const close = () => setOpenId(null);
  const toggle = () => setOpenId(isOpen ? null : id);
  const ref = useOutsideCloser(isOpen, close);

  return (
    <div
      ref={ref}
      className={`dropdown ${isOpen ? "dropdown-open" : ""} ${align === "end" ? "dropdown-end" : ""}`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="btn btn-ghost"
      >
        {label}
      </button>

      <ul
        className="dropdown-content menu bg-base-100 rounded-box w-56 p-2 shadow z-50"
        role="menu"
      >
        {items.map((it) => (
          <li key={it.href}>
            <a href={it.href}>{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  // Track which dropdown is open. null = all closed
  const [openId, setOpenId] = useState(null);

  // Close all when route/hash changes (opsional, aman aja)
  useEffect(() => {
    const close = () => setOpenId(null);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Data menu
  const profilItems = [
    { href: "/tentang", label: "Tentang" },
    { href: "/visi-misi", label: "Visi & Misi" },
    { href: "/guru-staff", label: "Guru & Staf" },
    { href: "/galeri", label: "Galeri" },
    { href: "/berita", label: "Berita" },
  ];
  const akademikItems = [
    { href: "/akademik/informasi", label: "Informasi" },
    { href: "/akademik/ekstrakurikuler", label: "Ekstrakurikuler" },
    { href: "/akademik/materi-tugas", label: "Materi & Tugas" },
    { href: "/akademik/video", label: "Video Pembelajaran" },
  ];
  const akunItems = [
    { href: "/login", label: "Login" },
    { href: "/daftar", label: "Daftar" },
  ];

  // Mobile dropdown (hamburger) — pakai id "mobile"
  const mobileOpen = openId === "mobile";
  const mobileRef = useOutsideCloser(mobileOpen, () => setOpenId(null));

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur shadow-sm">
      <div className="navbar max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-24">
        {/* START: Logo + hamburger (mobile) */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div
            ref={mobileRef}
            className={`dropdown ${mobileOpen ? "dropdown-open" : ""}`}
          >
            <button
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
              onClick={() => setOpenId(mobileOpen ? null : "mobile")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>

            {/* Mobile menu panel */}
            <ul className="dropdown-content menu menu-sm mt-3 w-56 p-2 shadow bg-base-100 rounded-box z-50">
              <li>
                <details>
                  <summary>Profil</summary>
                  <ul className="p-2">
                    {profilItems.map((it) => (
                      <li key={it.href}><a href={it.href}>{it.label}</a></li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Akademik</summary>
                  <ul className="p-2">
                    {akademikItems.map((it) => (
                      <li key={it.href}><a href={it.href}>{it.label}</a></li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Akun</summary>
                  <ul className="p-2">
                    {akunItems.map((it) => (
                      <li key={it.href}><a href={it.href}>{it.label}</a></li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          {/* Logo / Brand */}
          <a href="/" className="text-xl gap-2">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
          </a>
        </div>

        {/* RIGHT: Desktop menu (kamu tadinya taruh di navbar-end, aku pertahankan) */}
        <div className="navbar-end hidden lg:flex gap-2">
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
          <NavDropdown
            id="akun"
            label="Akun"
            items={akunItems}
            align="end"
            openId={openId}
            setOpenId={setOpenId}
          />
        </div>
      </div>
    </header>
  );
}
