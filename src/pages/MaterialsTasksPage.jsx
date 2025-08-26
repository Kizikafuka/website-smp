// src/pages/MaterialsTasksPage.jsx
import { useEffect, useMemo, useState } from "react";
import MaterialsTable from "../components/table/MaterialsTable.jsx";
import Pagination from "../components/Pagination.jsx";

export default function MaterialsTasksPage() {
  // ====== STATE ======
  const pageSize = 9;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);

  // ====== FETCH (dummy now) ======
  useEffect(() => {
    setLoading(true);
    setError(null);
    // Ganti blok ini dengan fetch ke backend nanti:
    setTimeout(() => {
      try {
        const data = Array.from({ length: 23 }).map((_, i) => ({
          id: i + 1,
          file: `Materi_${i + 1}.pdf`,
          tanggal: `2025-07-${String((i % 30) + 1).padStart(2, "0")}`,
          oleh: i % 2 === 0 ? "Pak Budi" : "Bu Sari",
          url: "#",
        }));
        setAllItems(data);
      } catch (e) {
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(allItems.length / pageSize)),
    [allItems.length]
  );

  const start = (page - 1) * pageSize;
  const currentItems = allItems.slice(start, start + pageSize);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // ====== ACTIONS ======
  const handleView = (item) => {
    // nanti bisa buka viewer PDF, atau route detail
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
          Materi &amp; Tugas
        </h1>

        <MaterialsTable
          items={currentItems}
          offset={start}
          loading={loading}
          error={error}
          onView={handleView}
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </main>
  );
}
