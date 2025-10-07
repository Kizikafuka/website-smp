import { useMemo, useState } from "react";
import GalleryCard from "../components/GalleryCard.jsx";
import Pagination from "../components/Pagination.jsx";
import img1 from "../assets/images/hero.jpg";

export default function GalleryPage() {
  // Dummy data (replace with backend later)
  const allPhotos = useMemo(
    () =>
      Array.from({ length: 21 }).map((_, i) => ({
        src: img1,
        title: `Kegiatan ${i + 1}`,
        desc: "Dokumentasi upacara hari Senin.",
      })),
    []
  );

  // Paging only (no filter/search)
  const pageSize = 12;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(allPhotos.length / pageSize));
  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allPhotos.slice(start, start + pageSize);
  }, [allPhotos, page, pageSize]);

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8" aria-labelledby="page-title">
      <div className="max-w-screen-2xl mx-auto">
        {/* Title */}
        <header className="mb-6">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl font-extrabold text-primary text-center"
          >
            Galeri
          </h1>
        </header>

        {/* Masonry */}
        <section>
          {currentItems.length === 0 ? (
            <div className="rounded-box border border-base-200 bg-base-100 p-8 text-center">
              <div className="text-lg font-semibold">Belum ada foto</div>
              <p className="mt-1 text-base-content/70">
                Konten galeri akan tampil di sini.
              </p>
            </div>
          ) : (
            <div
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]"
              // Tiap child harus 'break-inside-avoid' supaya kartu tidak terpotong
            >
              {currentItems.map((item, i) => (
                <div key={`${page}-${i}`} className="mb-6 break-inside-avoid">
                  <GalleryCard {...item} eager={i < 3} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </section>
      </div>
    </main>
  );
}
