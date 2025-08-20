// src/data/news.js
export const news = [
  {
    slug: "kunjungan-industri-kelas-9",
    judul: "Kunjungan Industri Kelas 9",
    ringkas: "Siswa mempelajari ekosistem ritel modern lewat tur terpandu.",
    konten:
      "Laporan lengkap kegiatan kunjungan industri kelas 9... (isi panjang di sini).",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200",
    tanggal: "2025-07-09",
  },
  {
    slug: "tim-pramuka-juara-umum",
    judul: "Tim Pramuka Juara Umum",
    ringkas: "Prestasi membanggakan berkat kerja keras pembina dan siswa.",
    konten:
      "Detail capaian tim pramuka pada lombaDetail capaian tim pramuka pada lombaDetail capaian tim pramuka pada lombaDetail capaian tim pramuka pada lombaDetail capaian tim pramuka pada lombaDetail capaian tim pramuka pada lomba... (isi panjang di sini).",
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200",
    tanggal: "2025-07-02",
  },
  {
    slug: "p5-pameran-karya-siswa",
    judul: "P5: Pameran Karya Siswa",
    ringkas: "Inovasi hijau dan produk daur ulang dipamerkan di aula sekolah.",
    konten: "Rangkuman kegiatan P5 dan karya siswa... (isi panjang di sini).",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
    tanggal: "2025-06-25",
  },
  // tambahkan berita lain di sini...
];

export const findNewsBySlug = (slug) => news.find((n) => n.slug === slug);
