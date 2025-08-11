// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import logo from "../assets/icons/logo.png";

/** Close when clicking outside / pressing Esc (desktop dropdown only) */
function useOutsideCloser(isOpen, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const click = (e) => ref.current && !ref.current.contains(e.target) && onClose();
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

/** Desktop dropdown (unchanged) */
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
      <button type="button" onClick={toggle} aria-haspopup="menu" aria-expanded={isOpen} className="btn btn-ghost">
        {label}
      </button>
      <ul className="dropdown-content menu bg-base-100 rounded-box w-56 p-2 shadow z-50" role="menu">
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
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const close = () => setOpenId(null);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // menu data
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

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur shadow-sm">

      {/* =================== MOBILE (Drawer) =================== */}
      <div className="lg:hidden">
        <div className="drawer">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="navbar max-w-screen-2xl mx-auto px-6">
              <div className="flex-none">
                {/* hamburger opens drawer */}
                <label htmlFor="nav-drawer" aria-label="open sidebar" className="btn btn-ghost btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>
              </div>
              <a href="/" className="flex-1 flex items-center gap-2 pl-2">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              </a>
            </div>
          </div>

          {/* Drawer side menu */}
          <div className="drawer-side">
            <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Profil */}
              <li>
                <details>
                  <summary>Profil</summary>
                  <ul>
                    {profilItems.map((it) => (
                      <li key={it.href}><a href={it.href}>{it.label}</a></li>
                    ))}
                  </ul>
                </details>
              </li>
              {/* Akademik */}
              <li>
                <details>
                  <summary>Akademik</summary>
                  <ul>
                    {akademikItems.map((it) => (
                      <li key={it.href}><a href={it.href}>{it.label}</a></li>
                    ))}
                  </ul>
                </details>
              </li>
              {/* Akun */}
              <li>
                <details>
                  <summary>Akun</summary>
                  <ul>
                    {akunItems.map((it) => (
                      <li key={it.href}><a href={it.href}>{it.label}</a></li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =================== DESKTOP =================== */}
      <div className="hidden lg:flex navbar max-w-screen-2xl mx-auto px-8 lg:px-24">
        <div className="flex-1">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
          </a>
        </div>
        <div className="navbar-end gap-2">
          <NavDropdown id="profil" label="Profil" items={profilItems} openId={openId} setOpenId={setOpenId} />
          <NavDropdown id="akademik" label="Akademik" items={akademikItems} openId={openId} setOpenId={setOpenId} />
          <NavDropdown id="akun" label="Akun" items={akunItems} align="end" openId={openId} setOpenId={setOpenId} />
        </div>
      </div>
    </header>
  );
}
