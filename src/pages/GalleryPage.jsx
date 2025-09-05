// src/pages/GalleryPage.jsx
import { useMemo, useState } from "react";
import GalleryCard from "../components/GalleryCard.jsx";
import Pagination from "../components/Pagination.jsx";

import img1 from "../assets/images/hero.jpg";

export default function GalleryPage() {
  // Dummy data (replace with backend later)
  const allPhotos = useMemo(
    () =>
      Array.from({ length: 13 }).map((_, i) => ({
        src: img1,
        title: `Hero ${i + 1}`,
        desc: "Dokumentasi upacara hari Senin.",
      })),
    []
  );

  const pageSize = 9; // 3 x 3
  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(allPhotos.length / pageSize)),
    [allPhotos.length]
  );

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allPhotos.slice(start, start + pageSize);
  }, [allPhotos, page]);

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-center mb-10"
        >
          Galeri
        </h1>

        {currentItems.length === 0 ? (
          <p className="text-center text-base-content/60">Belum ada foto.</p>
        ) : (
          <>
            {/* Grid: 1 / 2 / 3 kolom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item, i) => (
                <GalleryCard key={`${page}-${i}`} {...item} eager={i < 3} />
              ))}
            </div>

            {/* Pagination */}
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
