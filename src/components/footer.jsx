// src/components/Footer.jsx
import logo from "../assets/icons/logo.png";

export default function footer() {
  return (
    <>
      {/* Main footer */}
      <footer className="footer sm:footer-horizontal bg-[#15375A] text-neutral-content px-4 sm:px-8 lg:px-24 py-12">
        {/* Column 1: Profile */}
        <nav>
          <h6 className="text-white text-xl font-extrabold mb-3">Profile</h6>
          <a className="link link-hover text-white/90">Tentang Sekolah</a>
          <a className="link link-hover text-white/90">Visi & Misi</a>
          <a className="link link-hover text-white/90">Daftar Guru & Staf</a>
          <a className="link link-hover text-white/90">Galeri</a>
          <a className="link link-hover text-white/90">Berita</a>
        </nav>

        {/* Column 2: Akademik */}
        <nav>
          <h6 className="text-white text-xl font-extrabold mb-3">Akademik</h6>
          <a className="link link-hover text-white/90">Informasi</a>
          <a className="link link-hover text-white/90">Ekstrakulikuler</a>
          <a className="link link-hover text-white/90">Materi & Tugas</a>
          <a className="link link-hover text-white/90">Video Pembelajaran</a>
        </nav>

        {/* Column 3: Kontak */}
        <nav>
          <h6 className="text-white text-xl font-extrabold mb-3">
            Kontak Kami
          </h6>
          <a
            href="tel:085799696924"
            className="link link-hover text-white/90 flex items-center gap-2"
          >
            {/* phone icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h2a1 1 0 011 .76l1 4a1 1 0 01-.27.95l-1.6 1.6a16 16 0 006.86 6.86l1.6-1.6a1 1 0 01.95-.27l4 1a1 1 0 01.76 1v2a2 2 0 01-2 2h-1C9.716 22 2 14.284 2 5V4a1 1 0 011-1z"
              />
            </svg>
            0857 9969 6924
          </a>
          <a
            href="mailto:info@smpn10-bpn.sch.id"
            className="link link-hover text-white/90 flex items-center gap-2"
          >
            {/* globe/mail icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Info@Smpn10-Bpn.Sch.Id
          </a>

          {/* Alamat */}
          <a
            href="https://maps.app.goo.gl/SrctXn6fTaAzm4Lx6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 flex items-start gap-2 max-w-sm leading-tight hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11a3 3 0 100-6 3 3 0 000 6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 22s8-6.6 8-12a8 8 0 10-16 0c0 5.4 8 12 8 12z"
              />
            </svg>
            <span>
              Jl. Marsma R. Iswahyudi No.38B, Sungai Nangka
              <span className="block">
                Balikpapan Selatan, Kota Balikpapan, Kaltim 76114
              </span>
            </span>
          </a>
        </nav>
      </footer>

      {/* Copyright */}
      <footer className="footer footer-center bg-[#143250] text-white/70 px-4 sm:px-8 lg:px-24 py-4">
        <aside>
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} — Sekolah Menengah Pertama
            Negeri 10 Balikpapan
          </p>
        </aside>
      </footer>
    </>
  );
}
