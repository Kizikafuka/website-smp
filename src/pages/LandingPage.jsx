// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import heroImg from "../assets/images/hero.jpg";
import InfoCard from "../components/InfoCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import { news } from "../data/news.js";

export default function LandingPage() {
  const dataInformasi = [
    {
      tanggal: "08 JUL 2025",
      kategori: "Agenda",
      judul: "MPLS 14–18 Juli",
      deskripsi: "Info kegiatan MPLS 2025 untuk siswa baru.",
      href: "#",
    },
    {
      tanggal: "05 JUL 2025",
      kategori: "Pengumuman",
      judul: "Daftar Ulang",
      deskripsi: "Panduan lapor diri & daftar ulang.",
      href: "#",
    },
    {
      tanggal: "05 JUN 2025",
      kategori: "Agenda",
      judul: "Asesmen Sumatif",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae et eveniet sequi doloribus sed cupiditate vel exercitationem.",
      href: "#",
    },
  ];

  const top3 = [...news]
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay bg-black/45" />
        <div className="hero-content text-neutral-content text-center">
          <div>
            <h1 className="font-bold uppercase leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              SMP NEGERI 10 BALIKPAPAN
            </h1>
            <br />
            <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl">
              Selamat datang di website resmi SMP Negeri 10 Balikpapan. Dapatkan
              informasi terbaru seputar kegiatan dan pengumuman sekolah.
            </p>
          </div>
        </div>
      </div>

      {/* Informasi */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">
          <h2 className="text-4xl font-extrabold uppercase">Informasi</h2>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {dataInformasi.map((item, idx) => (
              <InfoCard key={idx} {...item} />
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Link
              to="/akademik/informasi"
              className="btn btn-block btn-md lg:btn-lg"
            >
              Lihat Informasi Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* Berita */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24 mb-[72px]">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">
          <h2 className="text-4xl font-extrabold uppercase">Berita</h2>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {top3.map((b) => (
              <NewsCard key={b.slug} {...b} />
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Link
              to="/profil/berita"
              className="btn btn-block btn-md lg:btn-lg"
            >
              Lihat Berita Lainnya
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
