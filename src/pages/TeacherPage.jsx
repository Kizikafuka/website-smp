// src/pages/TeachersPage.jsx
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TeacherCard from "../components/TeacherCard.jsx";
import Pagination from "../components/Pagination.jsx";
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

  // Sync page with URL (?page=#)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(
    1,
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [page, setPage] = useState(initialPage);

  // Keep ?page updated without nuking other params
  useEffect(() => {
    const current = searchParams.get("page");
    const next = String(page);
    if (current !== next) {
      const sp = new URLSearchParams(searchParams);
      sp.set("page", next);
      setSearchParams(sp, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(allTeachers.length / pageSize)),
    [allTeachers.length]
  );

  // Clamp when data length changes (safety)
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allTeachers.slice(start, start + pageSize);
  }, [allTeachers, page]);

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto py-8 sm:py-10">
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-center mb-16"
        >
          Daftar Guru &amp; Staff
        </h1>

        {currentItems.length === 0 ? (
          <p className="text-center text-base-content/60">
            Belum ada data guru.
          </p>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((t) => (
                <TeacherCard key={t.id} {...t} />
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
