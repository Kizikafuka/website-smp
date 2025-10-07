// src/pages/LoginPage.jsx
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import logo from "../assets/icons/Logo.png";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-base-200">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:linear-gradient(to_right,theme(colors.base-content/5)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.base-content/5)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="hero min-h-screen">
        <div className="hero-content w-full max-w-5xl gap-10 lg:gap-16 flex-col lg:flex-row-reverse">
          {/* ===== RIGHT PANE (copy minimal) ===== */}
          <section className="w-full lg:w-1/2">
            {/* brand row */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt="SMPN 10"
                className="h-14 w-14 rounded-full ring-4 ring-base-100 shadow-md object-contain bg-base-100"
              />
              <div className="text-sm text-base-content/60">
                <div className="font-medium text-base-content">
                  SMPN 10 Balikpapan
                </div>
                <div>Portal Akses Internal</div>
              </div>
            </div>

            {/* headline */}
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-base-content">
              Masuk Akun
            </h1>
            <p className="mt-3 text-base leading-7 text-base-content/70 max-w-xl">
              Akses portal akademik, informasi sekolah, dan layanan internal
              SMPN&nbsp;10 Balikpapan dalam satu tempat yang aman.
            </p>
          </section>

          {/* ===== LEFT PANE (form) ===== */}
          <section className="w-full max-w-sm lg:w-1/2">
            {/* back link di ATAS form */}
            <div className="mb-3">
              <Link to="/" className="link link-hover text-base-content/70">
                ← Kembali ke beranda
              </Link>
            </div>

            <div className="rounded-2xl bg-base-100 backdrop-blur shadow-xl ring-1 ring-base-300 px-6 py-6 sm:px-8 sm:py-8">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
