// src/pages/MaterialsTasksPage.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MaterialsTable from "../components/Table/MaterialsTable.jsx";
import Pagination from "../components/Pagination.jsx";

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function MaterialsTasksPage() {
  // ====== CONST ======
  const pageSize = 9;

  // ====== URL PARAMS & HELPERS ======
  const [searchParams, setSearchParams] = useSearchParams();
  const getParam = (k, def = "") => searchParams.get(k) ?? def;

  // Controls (seed dari URL) — DISAMAKAN DENGAN VideosPage
  const [q, setQ] = useState(() => getParam("q", ""));
  const [kelas, setKelas] = useState(() => getParam("kelas", ""));
  const [mapel, setMapel] = useState(() => getParam("mapel", ""));

  // Page dari URL (clamp aman)
  const readPageParam = () => {
    const raw = getParam("page", "1");
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  };
  const [page, setPage] = useState(readPageParam);

  // ====== FETCH (dummy now) ======
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        // Dummy data; tambahin className & subject supaya bisa difilter
        const kelasOps = ["VII", "VIII", "IX"];
        const mapelOps = [
          "Matematika",
          "IPA",
          "IPS",
          "Bahasa Indonesia",
          "Bahasa Inggris",
        ];
        const data = Array.from({ length: 23 }).map((_, i) => ({
          id: i + 1,
          file: `Materi_${i + 1}.pdf`,
          tanggal: `2025-07-${String((i % 30) + 1).padStart(2, "0")}`, // ISO-ish YYYY-MM-DD
          oleh: i % 2 === 0 ? "Pak Budi" : "Bu Sari",
          className: kelasOps[i % kelasOps.length],
          subject: mapelOps[i % mapelOps.length],
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

  // ====== Derive filter options (kelas & mapel) ======
  const kelasList = useMemo(() => {
    const set = new Set(allItems.map((v) => v.className).filter(Boolean));
    const romanOrder = { VII: 7, VIII: 8, IX: 9 };
    return Array.from(set).sort(
      (a, b) => (romanOrder[a] ?? 0) - (romanOrder[b] ?? 0)
    );
  }, [allItems]);

  const mapelList = useMemo(() => {
    const set = new Set(allItems.map((v) => v.subject).filter(Boolean));
    return Array.from(set).sort((a, b) => String(a).localeCompare(String(b)));
  }, [allItems]);

  // ====== SYNC URL (page, q, kelas, mapel) ======
  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(page));
    q ? sp.set("q", q) : sp.delete("q");
    kelas ? sp.set("kelas", kelas) : sp.delete("kelas");
    mapel ? sp.set("mapel", mapel) : sp.delete("mapel");
    setSearchParams(sp, { replace: true });
  }, [page, q, kelas, mapel, searchParams, setSearchParams]);

  // ====== SCROLL TOP saat berubah ======
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page, q, kelas, mapel]);

  // ====== SEARCH ala EksPage (⌘/Ctrl+K) ======
  const inputRef = useRef(null);
  const [isMac, setIsMac] = useState(false);
  useEffect(
    () => setIsMac(navigator.platform.toLowerCase().includes("mac")),
    []
  );
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ====== FILTER (q, kelas, mapel) — sort default: terbaru ======
  const filtered = useMemo(() => {
    const tokens = normalizeText(q).split(" ").filter(Boolean);
    const arr = [...allItems].sort((a, b) => {
      const da = new Date(a.tanggal);
      const db = new Date(b.tanggal);
      return db - da || 0; // terbaru dulu
    });

    return arr.filter((n) => {
      if (kelas && n.className !== kelas) return false;
      if (mapel && n.subject !== mapel) return false;

      if (tokens.length) {
        const hay = normalizeText(
          `${n.file} ${n.oleh} ${n.className} ${n.subject}`
        );
        if (!tokens.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [allItems, q, kelas, mapel]);

  // ====== PAGING ======
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const start = (page - 1) * pageSize;

  const currentItems = useMemo(
    () => filtered.slice(start, start + pageSize),
    [filtered, start]
  );

  // ====== ACTIONS ======
  const handleView = useCallback((item) => {
    if (!item?.url) return;
    window.open(item.url, "_blank", "noopener,noreferrer");
  }, []);

  const resetFilters = () => {
    setQ("");
    setKelas("");
    setMapel("");
    setPage(1);
    inputRef.current?.focus();
  };

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8" aria-labelledby="page-title">
      <div className="max-w-screen-xl mx-auto">
        {/* Title */}
        <header className="mb-6 sm:mb-8 text-center">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl font-extrabold text-primary"
          >
            Materi &amp; Tugas
          </h1>
          <p className="mt-2 text-base-content/70">
            Kumpulan materi dan tugas yang dapat diunduh atau dilihat.
          </p>
        </header>

        {/* Toolbar — match VideosPage: Search + Kelas + Mapel + Reset */}
        <section className="card bg-base-100 border border-base-200 rounded-box shadow-sm mb-6">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-end">
              {/* Search */}
              <div className="flex-1 w-full">
                <span className="label-text mb-2 block">Cari materi/tugas</span>
                <label
                  className="input w-full gap-2"
                  htmlFor="materials-search"
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
                    id="materials-search"
                    ref={inputRef}
                    type="search"
                    className="grow"
                    placeholder="cari nama file, kelas, mapel, pengunggah…"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Pencarian materi & tugas"
                  />
                  <kbd className="kbd kbd-sm">{isMac ? "⌘" : "Ctrl"}</kbd>
                  <kbd className="kbd kbd-sm">K</kbd>
                </label>
              </div>

              {/* Kelas */}
              <div className="w-full sm:w-40">
                <span className="label-text mb-2 block">Kelas</span>
                <select
                  className="select select-bordered w-full"
                  value={kelas}
                  onChange={(e) => {
                    setKelas(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter Kelas"
                >
                  <option value="">Semua</option>
                  {kelasList.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mapel */}
              <div className="w-full sm:w-48">
                <span className="label-text mb-2 block">Mapel</span>
                <select
                  className="select select-bordered w-full"
                  value={mapel}
                  onChange={(e) => {
                    setMapel(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter Mapel"
                >
                  <option value="">Semua</option>
                  {mapelList.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!q && !kelas && !mapel}
                  className="btn btn-outline border-base-300 w-full sm:w-auto"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <div className="mb-4 text-sm text-base-content/70">
          Menampilkan{" "}
          <span className="font-medium">
            {Math.min(pageSize, currentItems.length)}
          </span>{" "}
          dari <span className="font-medium">{filtered.length}</span> item
          {kelas && ` • Kelas ${kelas}`}
          {mapel && ` • ${mapel}`}
          {q && ` • Cari: “${q}”`}
        </div>

        {/* Table / States */}
        {error ? (
          <div className="rounded-box border border-base-200 bg-base-100 p-8 text-center">
            <div className="text-lg font-semibold">Terjadi kesalahan</div>
            <p className="mt-1 text-base-content/70">{error}</p>
          </div>
        ) : loading ? (
          <div className="rounded-box border border-base-200 bg-base-100 p-8">
            <div className="animate-pulse h-6 w-1/3 bg-base-200 rounded mb-4" />
            <div className="animate-pulse h-10 w-full bg-base-200 rounded mb-2" />
            <div className="animate-pulse h-10 w-full bg-base-200 rounded mb-2" />
            <div className="animate-pulse h-10 w-full bg-base-200 rounded" />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="rounded-box border border-base-200 bg-base-100 p-10 text-center">
            <div className="text-lg font-semibold">Tidak ada hasil</div>
            <p className="mt-1 text-base-content/70">
              Coba ubah kata kunci atau filter.
            </p>
            <button className="btn btn-soft mt-4" onClick={resetFilters}>
              Hapus semua filter
            </button>
          </div>
        ) : (
          <>
            <MaterialsTable
              items={currentItems}
              offset={start}
              loading={loading}
              error={error}
              onView={handleView}
            />

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
