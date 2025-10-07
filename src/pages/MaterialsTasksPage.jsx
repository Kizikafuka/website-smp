// src/pages/MaterialsTasksPage.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MaterialsTable from "../components/Table/MaterialsTable.jsx";
import Pagination from "../components/Pagination.jsx";

export default function MaterialsTasksPage() {
  // ====== STATE ======
  const pageSize = 9;

  // Sync page with URL: ?page=#
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(
    1,
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [page, setPage] = useState(initialPage);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);

  // ====== FETCH (dummy now) with cleanup ======
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate API call; replace with real fetch later
    const timer = setTimeout(() => {
      try {
        const data = Array.from({ length: 23 }).map((_, i) => ({
          id: i + 1,
          file: `Materi_${i + 1}.pdf`,
          tanggal: `2025-07-${String((i % 30) + 1).padStart(2, "0")}`, // ISO-ish
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

    return () => clearTimeout(timer);
  }, []);

  // ====== DERIVED ======
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(allItems.length / pageSize)),
    [allItems.length]
  );

  // Clamp page when data length changes
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  // Keep ?page in URL in sync (don’t wipe other params)
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

  const start = (page - 1) * pageSize;

  const currentItems = useMemo(
    () => allItems.slice(start, start + pageSize),
    [allItems, start]
  );

  // ====== ACTIONS ======
  const handleView = useCallback((item) => {
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
