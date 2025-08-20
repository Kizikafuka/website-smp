import { useEffect, useMemo, useState } from "react";
import GalleryCard from "../components/GalleryCard.jsx";

// Import gambar lokal (contoh)
import img1 from "../assets/images/hero.jpg";

export default function GalleryPage() {
  // Data galeri (bisa kamu ganti dari backend nanti)
  const allPhotos = useMemo(
    () => [
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
      { src: img1, title: "Hero", desc: "Dokumentasi upacara hari Senin." },
    ],
    []
  );

  // Pagination
  const pageSize = 9; // 9 foto per halaman (grid 3 x 3)
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allPhotos.length / pageSize);

  const start = (page - 1) * pageSize;
  const currentItems = allPhotos.slice(start, start + pageSize);

  // Scroll ke atas tiap ganti halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Page numbers ramping: 1 … p-1 p p+1 … last
  function getCompactPages(total, current) {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const set = new Set([
      1,
      2,
      total - 1,
      total,
      current - 1,
      current,
      current + 1,
    ]);
    const arr = Array.from(set)
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      const next = arr[i + 1];
      if (next && next - arr[i] > 1) out.push("dots");
    }
    return out;
  }
  const pageItems = getCompactPages(totalPages, page);
  const goto = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
          Galeri
        </h1>

        {/* Grid: 1 / 2 / 3 kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {currentItems.map((item, i) => (
            <GalleryCard key={`${page}-${i}`} {...item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col items-center gap-2">
          {/* Mobile compact: Prev  X/Y  Next */}
          <div className="join sm:hidden">
            <button
              className="join-item btn btn-sm"
              onClick={() => goto(page - 1)}
              disabled={page === 1}
              aria-label="Sebelumnya"
            >
              «
            </button>
            <button className="join-item btn btn-sm" disabled>
              {page} / {totalPages}
            </button>
            <button
              className="join-item btn btn-sm"
              onClick={() => goto(page + 1)}
              disabled={page === totalPages}
              aria-label="Berikutnya"
            >
              »
            </button>
          </div>

          {/* sm+ : angka ramping + titik */}
          <div className="hidden sm:flex">
            <div className="join">
              <button
                className="join-item btn btn-sm md:btn-md"
                onClick={() => goto(page - 1)}
                disabled={page === 1}
                aria-label="Sebelumnya"
              >
                «
              </button>

              {pageItems.map((p, idx) =>
                p === "dots" ? (
                  <button
                    key={`dots-${idx}`}
                    className="join-item btn btn-sm md:btn-md"
                    disabled
                  >
                    …
                  </button>
                ) : (
                  <button
                    key={p}
                    className={`join-item btn btn-sm md:btn-md ${
                      page === p ? "btn-active" : ""
                    }`}
                    onClick={() => goto(p)}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                className="join-item btn btn-sm md:btn-md"
                onClick={() => goto(page + 1)}
                disabled={page === totalPages}
                aria-label="Berikutnya"
              >
                »
              </button>
            </div>
          </div>

          <p className="text-center text-sm opacity-70">
            Halaman {page} dari {totalPages}
          </p>
        </div>
      </div>
    </main>
  );
}
