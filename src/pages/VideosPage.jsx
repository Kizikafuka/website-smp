// src/pages/VideosPage.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
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

  // ===== Pagination (sync to URL) =====
  const pageSize = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(
    1,
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [page, setPage] = useState(initialPage);

  // Keep ?page up to date without nuking other params
  useEffect(() => {
    const cur = searchParams.get("page");
    const next = String(page);
    if (cur !== next) {
      const sp = new URLSearchParams(searchParams);
      sp.set("page", next);
      setSearchParams(sp, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(allVideos.length / pageSize)),
    [allVideos.length]
  );

  // Clamp page if length changes (safety)
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const start = (page - 1) * pageSize;
  const current = useMemo(
    () => allVideos.slice(start, start + pageSize),
    [allVideos, start]
  );

  const handleOpen = useCallback((item) => {
    if (!item?.url) return;
    window.open(item.url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-xl mx-auto">
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-center mb-8"
        >
          Video Pembelajaran
        </h1>

        {current.length === 0 ? (
          <p className="text-center text-base-content/60">Belum ada video.</p>
        ) : (
          <>
            <VideosTable items={current} offset={start} onOpen={handleOpen} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
