// src/pages/InfoPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoCard from "../components/InfoCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { fetchInfo } from "../lib/fetchInfo.js";

export default function InfoPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const { hash } = useLocation();
  const didScrollRef = useRef(false);

  // Load & sort (newest first)
  useEffect(() => {
    fetchInfo()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
        );
        setItems(sorted);
      })
      .catch(console.error);
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / pageSize)),
    [items.length]
  );

  // Clamp page to totalPages whenever data changes
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  // If there is a #hash, jump to the page containing that item first
  useEffect(() => {
    if (!hash || items.length === 0) return;
    const targetId = hash.replace("#", "");
    const idx = items.findIndex((it) => it.id === targetId);
    if (idx === -1) return;
    const targetPage = Math.floor(idx / pageSize) + 1;
    setPage(targetPage);
    didScrollRef.current = false; // allow scroll in next effect
  }, [hash, items]);

  const start = (page - 1) * pageSize;
  const currentItems = items.slice(start, start + pageSize);

  // After page is set (esp. from hash), smooth‑scroll to the element (with offset)
  useEffect(() => {
    if (!hash) return;
    if (didScrollRef.current) return; // avoid re-scrolling multiple times

    const el = document.querySelector(hash);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 80; // adjust for sticky navbar height
    window.scrollTo({ top: y, behavior: "smooth" });
    el.classList.add("ring", "ring-primary/40");
    setTimeout(() => el.classList.remove("ring", "ring-primary/40"), 1200);

    didScrollRef.current = true;
  }, [hash, page]);

  // Scroll to top on normal page changes (when not using hash)
  useEffect(() => {
    if (hash) return; // hash flow handled above
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, hash]);

  // Compact pager numbers: 1 … (p-1) p (p+1) … last
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
          Informasi
        </h1>

        <div className="flex flex-col gap-4">
          {currentItems.map((it) => (
            <InfoCard
              key={it.id}
              id={it.id}
              variant="row"
              showButton={false}
              {...it}
            />
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
