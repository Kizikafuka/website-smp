// src/pages/NewsPage.jsx
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { news } from "../data/news.js";
import NewsCard from "../components/NewsCard.jsx";
import Pagination from "../components/Pagination.jsx";

export default function NewsPage() {
  // Sort once (newest first)
  const sorted = useMemo(
    () => [...news].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)),
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

  // Keep URL updated (don’t wipe other params)
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
    () => Math.max(1, Math.ceil(sorted.length / pageSize)),
    [sorted.length]
  );

  // Clamp page when data changes (safety)
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const start = (page - 1) * pageSize;
  const current = useMemo(
    () => sorted.slice(start, start + pageSize),
    [sorted, start]
  );

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-center mb-10"
        >
          Berita
        </h1>

        {current.length === 0 ? (
          <p className="text-center text-base-content/60">Belum ada berita.</p>
        ) : (
          <>
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-center">
              {current.map((item) => (
                <NewsCard key={item.slug} {...item} />
              ))}
            </div>

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
