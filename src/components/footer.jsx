// src/components/Footer.jsx
import logo from "../assets/icons/logo.png"; // pakai logomu sendiri

export default function Footer() {
  return (
    <>
      {/* Main footer */}
      <footer className="footer sm:footer-horizontal bg-[#15375A] text-neutral-content px-4 sm:px-8 lg:px-24 py-12">
        {/* Brand + optional socials (hapus kalau tak perlu) */}
        <aside className="hidden">
          <img src={logo} alt="Logo Sekolah" className="w-12 h-12 object-contain" />
          <p className="opacity-80">
            SMP Negeri 10 Balikpapan
            <br />Mengedepankan pendidikan berkarakter.
          </p>
          {/* Contoh socials (opsional) */}
          <div className="grid grid-flow-col gap-4 mt-2">
            <a aria-label="Twitter" className="opacity-80 hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.56c-.89.39-1.84.65-2.84.77 1.02-.62 1.8-1.6 2.16-2.75-.95.57-2 .98-3.13 1.2C19.37 2.83 18.06 2.25 16.64 2.25c-2.78 0-4.9 2.28-4.49 5-4.07-.2-7.69-2.16-10.11-5.15-1.3 2.23-.67 5.14 1.54 6.61-.76-.02-1.48-.24-2.13-.6-.05 2.29 1.58 4.44 3.95 4.92-.69.19-1.45.23-2.21.09.63 1.95 2.45 3.38 4.6 3.42-2.07 1.62-4.68 2.35-7.3 2.04 2.19 1.4 4.78 2.22 7.56 2.22 9.14 0 14.32-7.72 14.01-14.66.97-.7 1.81-1.57 2.47-2.55z"/></svg>
            </a>
            <a aria-label="YouTube" className="opacity-80 hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.03 5.804 0 12c.03 6.185.488 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.549 23.97 18.195 24 12c-.03-6.185-.488-8.549-4.385-8.816zM9 16.001V7.999L17 12l-8 4.001z"/></svg>
            </a>
            <a aria-label="Facebook" className="opacity-80 hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.64l.36-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/></svg>
            </a>
          </div>
        </aside>

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
          <h6 className="text-white text-xl font-extrabold mb-3">Kontak Kami</h6>
          <a href="tel:085799696924" className="link link-hover text-white/90 flex items-center gap-2">
            {/* phone icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2a1 1 0 011 .76l1 4a1 1 0 01-.27.95l-1.6 1.6a16 16 0 006.86 6.86l1.6-1.6a1 1 0 01.95-.27l4 1a1 1 0 01.76 1v2a2 2 0 01-2 2h-1C9.716 22 2 14.284 2 5V4a1 1 0 011-1z"/>
            </svg>
            0857 9969 6924
          </a>
          <a href="mailto:info@smpn10-bpn.sch.id" className="link link-hover text-white/90 flex items-center gap-2">
            {/* globe/mail icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Info@Smpn10-Bpn.Sch.Id
          </a>
        </nav>
      </footer>

      {/* Copyright */}
      <footer className="footer footer-center bg-[#143250] text-white/70 px-4 sm:px-8 lg:px-24 py-4">
        <aside>
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} — Sekolah Menengah Pertama Negeri 10 Balikpapan
          </p>
        </aside>
      </footer>
    </>
  );
}
