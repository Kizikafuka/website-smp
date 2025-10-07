// src/pages/InfoPage.jsx
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import InfoCard from "../components/InfoCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { fetchInfo } from "../lib/fetchInfo.js";

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function InfoPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Fixed page size
  const pageSize = 9;

  // URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(
    1,
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [page, setPage] = useState(initialPage);

  // q (search term) synced with URL
  const initialQ = searchParams.get("q") || "";
  const [q, setQ] = useState(initialQ);

  const deferredPage = useDeferredValue(page);
  const { hash } = useLocation();
  const didScrollRef = useRef(false);

  // refs & OS hint for kbd
  const inputRef = useRef(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  // Global hotkey: ⌘K / Ctrl+K to focus search
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key?.toLowerCase();
      if (key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---- Fetch & sort newest first
  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        const maybePromise = fetchInfo({ signal: ac.signal });
        const data = await (maybePromise?.then ? maybePromise : fetchInfo());

        const sorted = [...data].sort((a, b) => {
          const da = new Date(a.tanggal).getTime();
          const db = new Date(b.tanggal).getTime();
          const sa = isNaN(da) ? 0 : da;
          const sb = isNaN(db) ? 0 : db;
          return sb - sa;
        });

        setItems(sorted);
      } catch (e) {
        if (e?.name !== "AbortError") setErr(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  // ---- Filter: AND-tokenized on judul + deskripsi
  const filtered = useMemo(() => {
    const term = normalizeText(q);
    if (!term) return items;

    const tokens = term.split(" ").filter(Boolean);
    if (tokens.length === 0) return items;

    return items.filter((it) => {
      const hay = normalizeText(`${it.judul} ${it.deskripsi}`);
      return tokens.every((t) => hay.includes(t));
    });
  }, [items, q]);

  // ---- Pagination math
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length]
  );

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  // ---- Sync ?page
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

  // ---- Sync ?q
  useEffect(() => {
    const current = searchParams.get("q") || "";
    if (current !== q) {
      const sp = new URLSearchParams(searchParams);
      if (q) sp.set("q", q);
      else sp.delete("q");
      setSearchParams(sp, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // ---- Hash → page (pakai filtered list)
  useEffect(() => {
    if (!hash || filtered.length === 0) return;
    const targetId = hash.slice(1);
    const idx = filtered.findIndex((it) => it.id === targetId);
    if (idx === -1) return;
    const targetPage = Math.floor(idx / pageSize) + 1;
    setPage(targetPage);
    didScrollRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, filtered.length]);

  // ---- Current slice
  const start = (deferredPage - 1) * pageSize;
  const currentItems = filtered.slice(start, start + pageSize);

  // ---- Smooth scroll on hash
  useEffect(() => {
    if (!hash || didScrollRef.current) return;

    let raf = 0;
    let tries = 0;
    const maxTries = 12;

    const tick = () => {
      const el = document.querySelector(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
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
  }, [hash, deferredPage]);

  // ---- Scroll top on normal page change
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [deferredPage, hash]);

  const onRetry = () => window.location.reload();

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8" aria-labelledby="page-title">
      <div className="max-w-screen-2xl mx-auto">
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-8"
        >
          Informasi
        </h1>

        {/* Filter (DaisyUI input style + kbd hint) */}
        <div className="mb-6">
          <label
            className="input w-full sm:max-w-md gap-2"
            htmlFor="info-search"
          >
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              id="info-search"
              ref={inputRef}
              type="search"
              className="grow"
              placeholder="Cari judul atau deskripsi"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              aria-label="Pencarian Informasi"
            />
            <kbd className="kbd kbd-sm">{isMac ? "⌘" : "Ctrl"}</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
        </div>

        {loading ? (
          <div
            role="status"
            aria-busy="true"
            aria-live="polite"
            className="flex flex-col gap-4"
          >
            {Array.from({ length: pageSize }).map((_, i) => (
              <div
                key={i}
                className="skeleton h-28 rounded-box border border-base-200"
              />
            ))}
          </div>
        ) : err ? (
          <div className="alert alert-error" role="alert" aria-live="assertive">
            <span>Gagal memuat data. Coba lagi nanti.</span>
            <button className="btn btn-sm ml-auto" onClick={onRetry}>
              Muat ulang
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-base-content/70 flex flex-col items-center gap-2"
            aria-live="polite"
          >
            <p>Tidak ada hasil untuk pencarianmu.</p>
            {q && (
              <button
                className="btn btn-sm btn-outline mt-2"
                onClick={() => {
                  setQ("");
                  setPage(1);
                  inputRef.current?.focus();
                }}
              >
                Hapus pencarian
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4" aria-live="polite">
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
