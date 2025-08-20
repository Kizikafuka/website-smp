// src/pages/TeachersPage.jsx
import { useEffect, useMemo, useState } from "react";
import TeacherCard from "../components/TeacherCard.jsx";
import sampleImg from "../assets/images/hero.jpg";

export default function TeachersPage() {
  // Dummy data
  const allTeachers = useMemo(
    () =>
      Array.from({ length: 27 }).map((_, i) => ({
        id: i + 1,
        photo: sampleImg,
        name: `Muhammad Abidin ${i + 1}`,
        gender: i % 2 === 0 ? "Laki-Laki" : "Perempuan",
        birthplace: "Balikpapan",
        birthdate: "17 Agustus 1945",
        role: "Guru Mata Pelajaran",
      })),
    []
  );

  const pageSize = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allTeachers.length / pageSize);
  const currentItems = allTeachers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Selalu scroll ke atas ketika page berubah (termasuk ke halaman paling akhir)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Buat deret tombol ramping: 1 … (p-1) p (p+1) … last
  function getCompactPages(total, current) {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    const set = new Set([1, total, current - 1, current, current + 1]);
    const pages = Array.from(set)
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b);

    const out = [];
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      out.push(p);
      const next = pages[i + 1];
      if (next && next - p > 1) out.push("dots");
    }
    return out;
  }

  const pageItems = getCompactPages(totalPages, page);

  const goto = (p) => {
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (clamped !== page) setPage(clamped);
  };

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-16">
          Daftar Guru &amp; Staff
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((t) => (
            <TeacherCard key={t.id} {...t} />
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
