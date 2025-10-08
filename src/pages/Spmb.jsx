// src/pages/Spmb.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * GANTI TANGGAL TARGET DI SINI
 * Format ISO: YYYY-MM-DDTHH:mm:ss+08:00 (Makassar = UTC+08:00)
 */
const TARGET_OPEN = "2025-11-01T08:00:00+08:00";

function getRemaining(targetDate) {
  const now = Date.now();
  const t = new Date(targetDate).getTime();
  const diff = Math.max(0, t - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { diff, days, hours, minutes, seconds };
}

export default function SpmbPage() {
  const target = useMemo(() => new Date(TARGET_OPEN), []);
  const [remain, setRemain] = useState(() => getRemaining(target));
  const isOpen = remain.diff === 0;

  useEffect(() => {
    const id = setInterval(() => setRemain(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const ariaCounter = isOpen
    ? "Pendaftaran SPMB telah dibuka"
    : `Pembukaan SPMB dalam ${remain.days} hari, ${remain.hours} jam, ${remain.minutes} menit, ${remain.seconds} detik`;

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8" aria-labelledby="page-title">
      <div className="max-w-screen-2xl mx-auto">
        {/* HERO */}
        <header className="text-center">
          <p className="uppercase tracking-widest text-xs sm:text-sm text-base-content/60">
            Penerimaan Peserta Didik Baru
          </p>
          <h1
            id="page-title"
            className="mt-2 text-3xl sm:text-4xl font-extrabold text-primary"
          >
            SPMB — Coming Soon
          </h1>
          <p className="mt-3 text-base sm:text-lg text-base-content/80">
            Persiapkan berkasmu. Pendaftaran akan dibuka pada{" "}
            <strong>
              {target.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}{" "}
              pukul{" "}
              {target.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              WITA
            </strong>
            .
          </p>
        </header>

        {/* COUNTDOWN */}
        <section
          className="mt-8 flex justify-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {isOpen ? (
            <div className="alert alert-success w-full sm:w-auto">
              <span className="font-semibold">Pendaftaran dibuka!</span>
              <Link
                to="/akademik/spmb/form"
                className="btn btn-success btn-sm ml-2"
              >
                Daftar Sekarang
              </Link>
            </div>
          ) : (
            <div
              className="grid grid-flow-col gap-4 sm:gap-5 text-center auto-cols-max"
              aria-label={ariaCounter}
            >
              <div className="flex flex-col px-3 py-2 sm:p-3 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl sm:text-5xl">
                  <span
                    style={{ "--value": remain.days }}
                    aria-label={`${remain.days} hari`}
                  >
                    {remain.days}
                  </span>
                </span>
                <span className="mt-1 text-xs sm:text-sm opacity-80">days</span>
              </div>
              <div className="flex flex-col px-3 py-2 sm:p-3 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl sm:text-5xl">
                  <span
                    style={{ "--value": remain.hours }}
                    aria-label={`${remain.hours} jam`}
                  >
                    {remain.hours}
                  </span>
                </span>
                <span className="mt-1 text-xs sm:text-sm opacity-80">
                  hours
                </span>
              </div>
              <div className="flex flex-col px-3 py-2 sm:p-3 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl sm:text-5xl">
                  <span
                    style={{ "--value": remain.minutes }}
                    aria-label={`${remain.minutes} menit`}
                  >
                    {remain.minutes}
                  </span>
                </span>
                <span className="mt-1 text-xs sm:text-sm opacity-80">min</span>
              </div>
              <div className="flex flex-col px-3 py-2 sm:p-3 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl sm:text-5xl">
                  <span
                    style={{ "--value": remain.seconds }}
                    aria-label={`${remain.seconds} detik`}
                  >
                    {remain.seconds}
                  </span>
                </span>
                <span className="mt-1 text-xs sm:text-sm opacity-80">sec</span>
              </div>
            </div>
          )}
        </section>

        {/* INFO RINGKAS */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="card bg-base-100 border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary">Persyaratan</h3>
              <ul className="list-disc pl-5 text-sm sm:text-base text-base-content/80 space-y-1">
                <li>Fotokopi rapor semester terakhir</li>
                <li>Akta kelahiran & KK</li>
                <li>Pas foto 3×4 (2 lembar)</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary">Alur Singkat</h3>
              <ol className="list-decimal pl-5 text-sm sm:text-base text-base-content/80 space-y-1">
                <li>Isi formulir online</li>
                <li>Unggah berkas</li>
                <li>Verifikasi & pengumuman</li>
              </ol>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary">Bantuan</h3>
              <p className="text-sm sm:text-base text-base-content/80">
                Ada pertanyaan?{" "}
                <a
                  href="https://wa.me/628123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  Hubungi panitia via WhatsApp
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CTA BAWAH */}
        {!isOpen && (
          <section className="mt-8">
            <div className="rounded-box border border-base-200 bg-base-100 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold">Siap daftar saat dibuka?</div>
                <div className="text-sm text-base-content/70">
                  Cek rutin halaman ini untuk pembaruan.
                </div>
              </div>
              <Link to="/profil/galeri" className="btn btn-soft">
                Lihat Suasana Sekolah
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
