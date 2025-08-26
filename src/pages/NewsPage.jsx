// src/pages/NewsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { news } from "../data/news.js";
import NewsCard from "../components/NewsCard.jsx";
import Pagination from "../components/Pagination.jsx";

export default function NewsPage() {
  const sorted = useMemo(
    () => [...news].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)),
    []
  );

  const pageSize = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(sorted.length / pageSize);
  const start = (page - 1) * pageSize;
  const current = sorted.slice(start, start + pageSize);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const getPages = (total, currentPage) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const s = new Set([
      1,
      2,
      total - 1,
      total,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ]);
    const arr = Array.from(s)
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      const next = arr[i + 1];
      if (next && next - arr[i] > 1) out.push("dots");
    }
    return out;
  };
  const pages = getPages(totalPages, page);
  const goto = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
          Berita
        </h1>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-center">
          {current.map((item) => (
            <NewsCard key={item.slug} {...item} />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage} // atau (p) => setPage(p)
        />
      </div>
    </main>
  );
}
