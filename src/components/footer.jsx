// src/components/Footer.jsx
import { Link } from "react-router-dom";

// Small inline SVG icon components for clarity/reuse
function PhoneIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5a2 2 0 012-2h2a1 1 0 011 .76l1 4a1 1 0 01-.27.95l-1.6 1.6a16 16 0 006.86 6.86l1.6-1.6a1 1 0 01.95-.27l4 1a1 1 0 01.76 1v2a2 2 0 01-2 2h-1C9.716 22 2 14.284 2 5V4a1 1 0 011-1z"
      />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PinIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 mt-0.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
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
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  // Centralized data so it’s easy to add/remove items
  const sections = [
    {
      title: "Profile",
      links: [
        { label: "Tentang Sekolah", href: "/profil/tentang" },
        { label: "Visi & Misi", href: "/profil/tentang" }, // keep as your current route
        { label: "Daftar Guru & Staf", href: "/profil/guru-staff" },
        { label: "Galeri", href: "/profil/galeri" },
        { label: "Berita", href: "/profil/berita" },
      ],
    },
    {
      title: "Akademik",
      links: [
        { label: "Informasi", href: "/akademik/informasi" },
        { label: "Ekstrakulikuler", href: "/akademik/ekstrakurikuler" },
        { label: "Materi & Tugas", href: "/akademik/materi-tugas" },
        { label: "Video Pembelajaran", href: "/akademik/video" },
      ],
    },
  ];

  const contact = {
    phone: { label: "0857 9969 6924", href: "tel:085799696924" },
    email: {
      label: "info@smpn10-bpn.sch.id",
      href: "mailto:info@smpn10-bpn.sch.id",
    },
    address: {
      lines: [
        "Jl. Marsma R. Iswahyudi No.38B, Sungai Nangka",
        "Balikpapan Selatan, Kota Balikpapan, Kaltim 76114",
      ],
      mapHref: "https://maps.app.goo.gl/SrctXn6fTaAzm4Lx6",
    },
  };

  return (
    <>
      {/* Main footer */}
      <footer
        className="footer sm:footer-horizontal bg-primary text-primary-content px-4 sm:px-8 lg:px-24 py-12"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        {/* Generated sections */}
        {sections.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <h3 className="text-primary-content text-xl font-extrabold mb-3">
              {title}
            </h3>
            <ul className="space-y-1">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="link link-hover text-primary-content/90 hover:text-primary-content transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contact */}
        <nav aria-label="Kontak Kami">
          <h3 className="text-primary-content text-xl font-extrabold mb-3">
            Kontak Kami
          </h3>

          <ul className="space-y-2">
            <li>
              <a
                href={contact.phone.href}
                className="link link-hover text-primary-content/90 hover:text-primary-content flex items-center gap-2 transition"
              >
                <PhoneIcon />
                <span className="select-all">{contact.phone.label}</span>
              </a>
            </li>

            <li>
              <a
                href={contact.email.href}
                className="link link-hover text-primary-content/90 hover:text-primary-content flex items-center gap-2 transition"
              >
                <MailIcon />
                <span className="break-all">{contact.email.label}</span>
              </a>
            </li>

            <li>
              <a
                href={contact.address.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-content/90 hover:text-primary-content flex items-start gap-2 max-w-sm leading-tight transition"
              >
                <PinIcon />
                <address className="not-italic">
                  <span className="block">{contact.address.lines[0]}</span>
                  <span className="block">{contact.address.lines[1]}</span>
                </address>
              </a>
            </li>
          </ul>
        </nav>
      </footer>

      {/* Copyright */}
      <footer className="footer footer-center bg-accent text-primary-content px-4 sm:px-8 lg:px-24 py-4">
        <aside>
          <p className="text-sm">
            © {year} — Sekolah Menengah Pertama Negeri 10 Balikpapan
          </p>
        </aside>
      </footer>
    </>
  );
}
