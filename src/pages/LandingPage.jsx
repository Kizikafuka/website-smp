import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImg from "../assets/images/hero.jpg";
import InfoCard from "../components/InfoCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import { news } from "../data/news.js";
import { fetchInfo } from "../lib/fetchInfo.js";

export default function LandingPage() {
  const [infoTop3, setInfoTop3] = useState([]);

  useEffect(() => {
    fetchInfo()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
        );
        setInfoTop3(sorted.slice(0, 3));
      })
      .catch(console.error);
  }, []);

  const top3 = [...news]
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, 3);

  return (
    <main>
      {/* HERO (tetap) */}
      <header
        className="hero min-h-[70vh] md:min-h-[80vh]"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-label="SMP Negeri 10 Balikpapan"
      >
        <div className="hero-overlay bg-black/50" />
        <div className="hero-content text-neutral-content text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="uppercase font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              SMP NEGERI 10 BALIKPAPAN
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl lg:text-2xl opacity-95">
              Selamat datang di website resmi SMP Negeri 10 Balikpapan. Dapatkan
              informasi terbaru seputar kegiatan dan pengumuman sekolah.
            </p>
          </div>
        </div>
      </header>

      {/* Informasi */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase">
            Informasi
          </h2>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {infoTop3.map((item) => (
              <InfoCard
                key={item.id}
                {...item}
                showButton={false}
                // opsional: jadikan kartu link ke InfoPage section tertentu
                href={`/akademik/informasi#${item.id}`}
              />
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Link to="/akademik/informasi" className="btn btn-md lg:btn-lg">
              Lihat Informasi Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* Berita (tetap) */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24 mb-[72px]">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase">
            Berita
          </h2>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {top3.map((b) => (
              <NewsCard key={b.slug} {...b} href={`/berita/${b.slug}`} />
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Link to="/profil/berita" className="btn btn-md lg:btn-lg">
              Lihat Berita Lainnya
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
