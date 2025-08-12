// src/pages/LandingPage.jsx
import heroImg from "../assets/images/hero.jpg";
import InfoCard from "../components/infocard.jsx";
import NewsCard from "../components/newscard.jsx";

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

const dataBerita = [
  {
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200",
    judul: "Kunjungan Industri Kelas 9",
    ringkas: "Siswa mempelajari ekosistem ritel modern lewat tur terpandu.",
    tanggal: "09 Jul 2025",
    href: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200",
    judul: "Tim Pramuka Juara Umum",
    ringkas: "Prestasi membanggakan berkat kerja keras pembina dan siswa.",
    tanggal: "02 Jul 2025",
    href: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
    judul: "P5: Pameran Karya Siswa",
    ringkas: "Inovasi hijau dan produk daur ulang dipamerkan di aula sekolah.",
    tanggal: "25 Jun 2025",
    href: "#",
  },
];

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
            <h1 className="font-bold uppercase leading-tight
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              SMP NEGERI 10 BALIKPAPAN
            </h1>
            <br />
            <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl">
              Selamat datang di website resmi SMP Negeri 10 Balikpapan.
              Dapatkan informasi terbaru seputar kegiatan dan pengumuman
              sekolah.
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
      <a href="#" className="btn btn-block btn-md lg:btn-lg">
        Lihat Infromasi Lainnya
      </a>
    </div>
        </div>
      </section>

<section className="mt-[72px] px-4 sm:px-8 lg:px-24 mb-[72px]">
  <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">
    <h2 className="text-4xl font-extrabold uppercase">Berita</h2>

    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
      {dataBerita.map((b, i) => (
        <NewsCard key={i} {...b} />
      ))}
    </div>

    <div className="w-full flex justify-center">
      <a href="#" className="btn btn-block btn-md lg:btn-lg">
        Lihat Berita Lainnya
      </a>
    </div>
  </div>
</section>
      
    </main>
  );
}
