import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import InfoCard from "../components/InfoCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { fetchInfo } from "../lib/fetchInfo.js";

export default function InfoPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const pageSize = 9;

  // URL query ?page=...
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(
    1,
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [page, setPage] = useState(initialPage);

  const { hash } = useLocation();
  const didScrollRef = useRef(false);

  // Load & sort (newest first)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchInfo();
        if (cancelled) return;

        const sorted = [...data].sort((a, b) => {
          const da = new Date(a.tanggal).getTime();
          const db = new Date(b.tanggal).getTime();
          // guard NaN => treat invalid dates as 0 so they sink to bottom
          return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
        });

        setItems(sorted);
      } catch (e) {
        setErr(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / pageSize)),
    [items.length]
  );

  // Clamp page if items length changes
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  // Keep ?page in URL in sync (without wiping other params)
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

  // If there is a #hash, jump to the page containing that item
  useEffect(() => {
    if (!hash || items.length === 0) return;
    const targetId = hash.slice(1);
    const idx = items.findIndex((it) => it.id === targetId);
    if (idx === -1) return;
    const targetPage = Math.floor(idx / pageSize) + 1;
    setPage(targetPage);
    didScrollRef.current = false; // allow scroll in next effect
  }, [hash, items]);

  const start = (page - 1) * pageSize;
  const currentItems = items.slice(start, start + pageSize);

  // After page is set (esp. from hash), smooth-scroll to the element (with offset)
  useEffect(() => {
    if (!hash || didScrollRef.current) return;

    let raf = 0;
    let tries = 0;
    const maxTries = 12; // ~200ms worth of checks

    const tick = () => {
      const el = document.querySelector(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80; // adjust for sticky navbar
        window.scrollTo({ top: y, behavior: "smooth" });
        el.classList.add("ring", "ring-primary/40");
        setTimeout(() => el.classList.remove("ring", "ring-primary/40"), 1200);
        didScrollRef.current = true;
        return;
      }
      if (tries++ < maxTries) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hash, page]);

  // Scroll to top on normal page changes (when not using hash)
  useEffect(() => {
    if (hash) return; // hash flow handled above
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, hash]);

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8" aria-labelledby="page-title">
      <div className="max-w-screen-2xl mx-auto">
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-8"
        >
          Informasi
        </h1>

        {loading ? (
          <div role="status" aria-busy="true" className="flex flex-col gap-4">
            {/* DaisyUI skeletons */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="skeleton h-28 rounded-box border border-base-200"
              />
            ))}
          </div>
        ) : err ? (
          <div className="alert alert-error" role="alert">
            <span>Gagal memuat data. Coba lagi nanti.</span>
          </div>
        ) : currentItems.length === 0 ? (
          <p className="text-base-content/70">Belum ada informasi.</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {currentItems.map((it) => (
                <div key={it.id} id={it.id} className="scroll-mt-24">
                  <InfoCard variant="row" showButton={false} {...it} />
                </div>
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
