// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import heroImg from "../assets/images/hero.jpg";
import InfoCard from "../components/infocard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import { news } from "../data/news.js";
import { fetchInfo } from "../lib/fetchInfo.js";

function safeTime(d) {
  const t = new Date(d).getTime();
  return Number.isFinite(t) ? t : 0;
}

export default function LandingPage() {
  const [infoTop3, setInfoTop3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [showFab, setShowFab] = useState(false); // 👈 kontrol FAB muncul

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        const maybe = fetchInfo({ signal: ac.signal });
        const data = await (maybe?.then ? maybe : fetchInfo());
        const sorted = [...data].sort(
          (a, b) => safeTime(b.tanggal) - safeTime(a.tanggal)
        );
        setInfoTop3(sorted.slice(0, 3));
      } catch (e) {
        if (e?.name !== "AbortError") setErr(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  // scroll listener buat munculin tombol
  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const top3News = useMemo(
    () =>
      [...news]
        .sort((a, b) => safeTime(b.tanggal) - safeTime(a.tanggal))
        .slice(0, 3),
    []
  );

  return (
    <main>
      {/* ===== Hero minimal + global glass background effect ===== */}
      <header
        className="relative hero min-h-[70vh] md:min-h-[80vh] overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="SMP Negeri 10 Balikpapan"
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[3px] md:backdrop-blur-[4px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="hero-content w-full justify-start items-center md:items-start relative">
          <div className="px-4 sm:px-8 lg:px-24 w-full">
            <div className="max-w-3xl text-left text-neutral-content drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              <h1 className="uppercase font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                SMP NEGERI 10 BALIKPAPAN
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl opacity-95">
                Selamat datang di website resmi SMP Negeri 10 Balikpapan.
                Dapatkan informasi terbaru seputar kegiatan dan pengumuman
                sekolah.
              </p>

              <div className="mt-6 sm:mt-8">
                <Link
                  to="/profil/tentang"
                  className="btn btn-primary md:btn-lg transition-all duration-200 hover:scale-[1.03]"
                >
                  Tentang Sekolah
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== CTA cards: PPDB, Galeri, Ekstrakurikuler ===== */}
      <section className="mt-10 px-4 sm:px-8 lg:px-24">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Link
            to="/ppdb"
            className="card bg-base-100 border border-base-200 hover:shadow-md transition-shadow"
          >
            <div className="card-body text-base-content">
              <h3 className="card-title text-primary">PPDB</h3>
              <p>
                Informasi penerimaan peserta didik baru, jadwal, dan
                persyaratan.
              </p>
              <div className="card-actions justify-end">
                <span className="btn btn-sm btn-primary">Selengkapnya</span>
              </div>
            </div>
          </Link>

          <Link
            to="/profil/galeri"
            className="card bg-base-100 border border-base-200 hover:shadow-md transition-shadow"
          >
            <div className="card-body text-base-content">
              <h3 className="card-title text-primary">Galeri</h3>
              <p>Lihat dokumentasi kegiatan dan momen-momen penting sekolah.</p>
              <div className="card-actions justify-end">
                <span className="btn btn-sm btn-primary">Buka Galeri</span>
              </div>
            </div>
          </Link>

          <Link
            to="/akademik/ekstrakurikuler"
            className="card bg-base-100 border border-base-200 hover:shadow-md transition-shadow"
          >
            <div className="card-body text-base-content">
              <h3 className="card-title text-primary">Ekstrakurikuler</h3>
              <p>
                Jelajahi klub & kegiatan untuk mengembangkan minat dan bakat.
              </p>
              <div className="card-actions justify-end">
                <span className="btn btn-sm btn-primary">Jelajahi</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== Informasi ===== */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-primary">
            Informasi
          </h2>

          {err ? (
            <div
              className="alert alert-error w-full"
              role="alert"
              aria-live="assertive"
            >
              <span>Gagal memuat informasi. Coba lagi nanti.</span>
            </div>
          ) : (
            <div
              className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch"
              aria-live="polite"
            >
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="skeleton h-40 rounded-box border border-base-200"
                    />
                  ))
                : infoTop3.map((item) => (
                    <InfoCard
                      key={item.id}
                      {...item}
                      showButton={false}
                      href={`/akademik/informasi#${item.id}`}
                    />
                  ))}
            </div>
          )}

          <div className="w-full flex justify-center">
            <Link
              to="/akademik/informasi"
              className="btn btn-primary btn-md lg:btn-lg"
            >
              Lihat Informasi Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Berita ===== */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24 mb-[72px]">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-primary">
            Berita
          </h2>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {top3News.map((b) => (
              <NewsCard key={b.slug} {...b} href={`/berita/${b.slug}`} />
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Link
              to="/profil/berita"
              className="btn btn-primary btn-md lg:btn-lg"
            >
              Lihat Berita Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Floating Button: Scroll to Top ===== */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
          showFab
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-90 pointer-events-none"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn btn-lg btn-circle btn-primary shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="Kembali ke atas"
        >
          ↑
        </button>
      </div>
    </main>
  );
}
