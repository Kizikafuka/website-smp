import { useEffect, useMemo, useState } from "react";
import VideosTable from "../components/table/VideoTable.jsx";
import Pagination from "../components/Pagination.jsx";

export default function VideosPage() {
  // ===== Dummy data (gampang diganti ke backend nanti) =====
  const allVideos = useMemo(
    () => [
      {
        id: 1,
        title: "Persamaan Linear Satu Variabel (PLSV)",
        className: "VII",
        subject: "Matematika",
        url: "https://youtu.be/dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Teks Deskripsi",
        className: "VII",
        subject: "Bahasa Indonesia",
        url: "https://youtu.be/2vjPBrBU-TM",
      },
      {
        id: 3,
        title: "Sistem Pencernaan Manusia",
        className: "VIII",
        subject: "IPA",
        url: "https://youtu.be/oHg5SJYRHA0",
      },
      // ... tambah data lain
    ],
    []
  );

  // ===== Pagination =====
  const pageSize = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(allVideos.length / pageSize));
  const start = (page - 1) * pageSize;
  const current = allVideos.slice(start, start + pageSize);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleOpen = (item) => {
    // default: buka tab baru (sudah di anchor), tapi kalau mau modal, taruh di sini
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
          Video Pembelajaran
        </h1>

        <VideosTable items={current} offset={start} onOpen={handleOpen} />

        {/* Tampilkan pagination hanya jika >1 halaman */}
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </main>
  );
}
