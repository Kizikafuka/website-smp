// src/pages/LandingPage.jsx
import heroImg from "../assets/images/hero.jpg"; // ganti sesuai nama file gambarmu
import InfoCard from "../components/infocard.jsx";

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
    judul: "Asesmen Sumatif Negro Panca Nigga ",
    deskripsi: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae et eveniet sequi doloribus sed cupiditate vel exercitationem, quia, perspiciatis, soluta eum libero reprehenderit quibusdam tempore voluptatibus. Molestias ullam quibusdam magni.",
    href: "#",
  },
];

  return (
    <main>
{/* HERO */}
<div
  className="hero min-h-screen"
  style={{
    backgroundImage: `url(${heroImg})`,
  }}
>
  <div className="hero-overlay bg-black/45"></div>
  <div className="hero-content text-neutral-content text-center">
    <div>
      <h1 className="text-5xl font-bold uppercase">
        SMP NEGERI 10 BALIKPAPAN
      </h1>
      <br></br>
      <p className="text-2xl">
        Selamat datang di website resmi SMP Negeri 10 Balikpapan.
        Dapatkan informasi terbaru seputar kegiatan dan pengumuman sekolah.
      </p>
    </div>
  </div>
</div>

{/* Informasi */}
        <section className="mt-[72px] px-24 flex flex-col items-center gap-12">
        <h2 className="text-4xl font-extrabold uppercase">Informasi</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full justify-items-center">
          {dataInformasi.map((item, idx) => (
            <InfoCard key={idx} {...item} />
          ))}
        </div>

        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-block">Lihat Informasi lainnya</button>
      </section>
    </main>
  );
}


