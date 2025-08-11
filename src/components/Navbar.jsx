// src/components/Navbar.jsx
import logo from "../assets/icons/logo.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur shadow-sm">
      <div className="navbar max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-24">
        {/* START: Logo + hamburger (mobile) */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>

            {/* Mobile menu panel */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 p-2 shadow bg-base-100 rounded-box z-50"
            >
              <li>
                <details>
                  <summary>Profil</summary>
                  <ul className="p-2">
                    <li><a href="/tentang">Tentang</a></li>
                    <li><a href="/visi-misi">Visi &amp; Misi</a></li>
                    <li><a href="/guru-staff">Guru &amp; Staf</a></li>
                    <li><a href="/galeri">Galeri</a></li>
                    <li><a href="/berita">Berita</a></li>
                  </ul>
                </details>
              </li>

              <li>
                <details>
                  <summary>Akademik</summary>
                  <ul className="p-2">
                    <li><a href="/akademik/informasi">Informasi</a></li>
                    <li><a href="/akademik/ekstrakurikuler">Ekstrakurikuler</a></li>
                    <li><a href="/akademik/materi-tugas">Materi &amp; Tugas</a></li>
                    <li><a href="/akademik/video">Video Pembelajaran</a></li>
                  </ul>
                </details>
              </li>

              <li>
                <details>
                  <summary>Akun</summary>
                  <ul className="p-2">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/daftar">Daftar</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          {/* Logo / Brand */}
          <a href="/" className=" text-xl gap-2">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
            {/* <span>SMPN 10</span> */}
          </a>
        </div>

        {/* CENTER: Desktop menu */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Profil</summary>
                <ul className="p-2">
                  <li><a href="/tentang">Tentang</a></li>
                  <li><a href="/visi-misi">Visi &amp; Misi</a></li>
                  <li><a href="/guru-staff">Guru &amp; Staf</a></li>
                  <li><a href="/galeri">Galeri</a></li>
                  <li><a href="/berita">Berita</a></li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary>Akademik</summary>
                <ul className="p-2">
                  <li><a href="/akademik/informasi">Informasi</a></li>
                  <li><a href="/akademik/ekstrakurikuler">Ekstrakurikuler</a></li>
                  <li><a href="/akademik/materi-tugas">Materi &amp; Tugas</a></li>
                  <li><a href="/akademik/video">Video Pembelajaran</a></li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary>Akun</summary>
                <ul className="p-2">
                  <li><a href="/login">Login</a></li>
                  <li><a href="/daftar">Daftar</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
