// src/pages/VideosPage.jsx
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import VideosTable from "../components/Table/VideosTable.jsx";
import Pagination from "../components/Pagination.jsx";

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// convert roman numerals (VII, VIII, IX) → integer for sorting
function romanToNum(r) {
  const map = { I: 1, V: 5, X: 10 };
  let n = 0;
  const roman = String(r || "").toUpperCase();
  for (let i = 0; i < roman.length; i++) {
    const cur = map[roman[i]] ?? 0;
    const next = map[roman[i + 1]] ?? 0;
    n += cur < next ? -cur : cur;
  }
  return n || 0;
}

export default function VideosPage() {
  // ===== Dummy data (gampang diganti ke backend nanti) =====
  const allVideos = useMemo(
    () => [
      {
        id: 1,
        title: "Persamaan Linear Satu Variabel (PLSV)",
        className: "VII",
        subject: "Matematika",
        url: "https://youtu.be/dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Teks Deskripsi",
        className: "VII",
        subject: "Bahasa Indonesia",
        url: "https://youtu.be/2vjPBrBU-TM",
      },
      {
        id: 3,
        title: "Sistem Pencernaan Manusia",
        className: "VIII",
        subject: "IPA",
        url: "https://youtu.be/oHg5SJYRHA0",
      },
      {
        id: 4,
        title: "Perang Dunia Kedua",
        className: "IX",
        subject: "IPS",
        url: "https://youtu.be/36YnV9STBqc",
      },
    ],
    []
  );

  // ===== Derive filters from data =====
  const kelasList = useMemo(() => {
    const set = new Set(allVideos.map((v) => v.className).filter(Boolean));
    return Array.from(set).sort((a, b) => romanToNum(a) - romanToNum(b));
  }, [allVideos]);

  const mapelList = useMemo(() => {
    const set = new Set(allVideos.map((v) => v.subject).filter(Boolean));
    return Array.from(set).sort((a, b) => String(a).localeCompare(String(b)));
  }, [allVideos]);

  // ===== Pagination (sync to URL) =====
  const pageSize = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const getParam = (k, def = "") => searchParams.get(k) ?? def;

  const readPageParam = () => {
    const raw = getParam("page", "1");
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  };

  // Controls (seed from URL)
  const [q, setQ] = useState(() => getParam("q", ""));
  const [kelas, setKelas] = useState(() => getParam("kelas", ""));
  const [mapel, setMapel] = useState(() => getParam("mapel", ""));
  const [page, setPage] = useState(readPageParam);

  // Keep URL up to date (preserve other params)
  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(page));
    q ? sp.set("q", q) : sp.delete("q");
    kelas ? sp.set("kelas", kelas) : sp.delete("kelas");
    mapel ? sp.set("mapel", mapel) : sp.delete("mapel");
    setSearchParams(sp, { replace: true });
  }, [page, q, kelas, mapel, searchParams, setSearchParams]);

  // Scroll to top when changing state
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page, q, kelas, mapel]);

  // === search shortcut ala EksPage (⌘/Ctrl+K) ===
  const inputRef = useRef(null);
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);
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

  // ===== Filter (q, kelas, mapel) =====
  const filtered = useMemo(() => {
    const tokens = normalizeText(q).split(" ").filter(Boolean);
    return allVideos.filter((v) => {
      if (kelas && v.className !== kelas) return false;
      if (mapel && v.subject !== mapel) return false;

      if (tokens.length) {
        const hay = normalizeText(`${v.title} ${v.className} ${v.subject}`);
        if (!tokens.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [allVideos, q, kelas, mapel]);

  // ===== Paging calc & slice =====
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const start = (page - 1) * pageSize;
  const current = useMemo(
    () => filtered.slice(start, start + pageSize),
    [filtered, start]
  );

  // ===== Actions =====
  const handleOpen = useCallback((item) => {
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
            Video Pembelajaran
          </h1>
          <p className="mt-2 text-base-content/70">
            Koleksi video per mata pelajaran & tingkat kelas.
          </p>
        </header>

        {/* Toolbar (search ala EksPage + filter) */}
        <section className="card bg-base-100 border border-base-200 rounded-box shadow-sm mb-6">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-end">
              {/* Search */}
              <div className="flex-1 w-full">
                <span className="label-text mb-2 block">Cari video</span>
                <label className="input w-full gap-2" htmlFor="video-search">
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
                    id="video-search"
                    ref={inputRef}
                    type="search"
                    className="grow"
                    placeholder="cari judul, kelas, mapel…"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Pencarian video"
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
            {Math.min(pageSize, current.length)}
          </span>{" "}
          dari <span className="font-medium">{filtered.length}</span> video
          {kelas && ` • Kelas ${kelas}`}
          {mapel && ` • ${mapel}`}
          {q && ` • Cari: “${q}”`}
        </div>

        {/* Table / Empty */}
        {current.length === 0 ? (
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
            <VideosTable items={current} offset={start} onOpen={handleOpen} />
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
