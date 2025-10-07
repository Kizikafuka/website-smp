// src/pages/LoginPage.jsx
import LoginForm from "../components/LoginForm";
import logo from "../assets/icons/logo.png";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-base-200 to-base-100">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      {/* blurred gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-[conic-gradient(at_30%_20%,#8b5cf6_10%,#22d3ee_40%,#22c55e_65%,#8b5cf6_100%)] opacity-20 blur-3xl"
      />

      <div className="hero min-h-screen">
        <div className="hero-content w-full max-w-6xl gap-10 lg:gap-16 flex-col lg:flex-row-reverse">
          {/* ===== RIGHT PANE (modern, no DaisyUI) ===== */}
          <section className="w-full lg:w-1/2">
            {/* brand row */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt="SMPN 10"
                className="h-14 w-14 rounded-full ring-4 ring-white/60 shadow-md object-contain bg-white"
              />
              <div className="text-sm text-black/60 dark:text-white/60">
                <div className="font-medium text-black/80 dark:text-white/80">
                  SMPN 10 Balikpapan
                </div>
                <div>Portal Akses Internal</div>
              </div>
            </div>

            {/* headline */}
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600">
                Masuk Akun
              </span>
            </h1>
            <p className="mt-3 text-base leading-7 text-black/60 dark:text-white/70 max-w-xl">
              Akses portal akademik, informasi sekolah, dan layanan internal
              SMPN&nbsp;10 Balikpapan dalam satu tempat yang aman.
            </p>

            {/* custom chip (bukan DaisyUI) */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
              <span className="text-lg">📘</span>
              <span>Portal Siswa & Guru</span>
            </div>

            {/* divider */}
            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/15" />

            {/* quick links (minimal buttons) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              <a
                href="/profil/berita"
                className="group rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur px-4 py-3 shadow-sm hover:shadow transition hover:-translate-y-0.5"
              >
                <div className="text-sm font-medium text-black/80 dark:text-white/85">
                  Berita Sekolah
                </div>
                <div className="mt-0.5 text-xs text-black/50 dark:text-white/55">
                  Update terbaru
                </div>
              </a>
              <a
                href="/akademik/informasi"
                className="group rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur px-4 py-3 shadow-sm hover:shadow transition hover:-translate-y-0.5"
              >
                <div className="text-sm font-medium text-black/80 dark:text-white/85">
                  Info Akademik
                </div>
                <div className="mt-0.5 text-xs text-black/50 dark:text-white/55">
                  Kalender & edaran
                </div>
              </a>
              <a
                href="/akademik/video"
                className="group rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur px-4 py-3 shadow-sm hover:shadow transition hover:-translate-y-0.5"
              >
                <div className="text-sm font-medium text-black/80 dark:text-white/85">
                  Video Belajar
                </div>
                <div className="mt-0.5 text-xs text-black/50 dark:text-white/55">
                  Materi pilihan
                </div>
              </a>
            </div>

            {/* notice bar */}
            <div className="mt-8 w-full max-w-xl rounded-xl border border-amber-400/30 bg-amber-50 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200 px-4 py-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5">🔔</span>
                <p>Lupa password? Hubungi operator sekolah untuk reset akun.</p>
              </div>
            </div>
          </section>

          {/* ===== LEFT PANE (form – tetap) ===== */}
          <section className="w-full max-w-sm lg:w-1/2">
            <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur shadow-xl ring-1 ring-black/5 dark:ring-white/10 px-6 py-6 sm:px-8 sm:py-8">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
