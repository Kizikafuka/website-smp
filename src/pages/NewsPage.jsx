// src/pages/NewsPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { news } from "../data/news.js";
import NewsCard from "../components/NewsCard.jsx";
import Pagination from "../components/Pagination.jsx";

const MONTHS = [
  { v: "01", l: "Januari" },
  { v: "02", l: "Februari" },
  { v: "03", l: "Maret" },
  { v: "04", l: "April" },
  { v: "05", l: "Mei" },
  { v: "06", l: "Juni" },
  { v: "07", l: "Juli" },
  { v: "08", l: "Agustus" },
  { v: "09", l: "September" },
  { v: "10", l: "Oktober" },
  { v: "11", l: "November" },
  { v: "12", l: "Desember" },
];

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function NewsPage() {
  // derive years from data
  const years = useMemo(() => {
    const set = new Set(
      news
        .map((n) => new Date(n.tanggal))
        .filter((d) => !isNaN(d))
        .map((d) => d.getFullYear())
    );
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const getParam = (k, def = "") => searchParams.get(k) ?? def;

  // states
  const [q, setQ] = useState(() => getParam("q", ""));
  const [year, setYear] = useState(() => getParam("year", ""));
  const [month, setMonth] = useState(() => getParam("month", ""));
  const [sort, setSort] = useState(() =>
    ["newest", "oldest"].includes(getParam("sort", "newest"))
      ? getParam("sort", "newest")
      : "newest"
  );

  const pageSize = 9;
  const readPageParam = () => {
    const raw = getParam("page", "1");
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  };
  const [page, setPage] = useState(readPageParam);

  // sync url
  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(page));
    q ? sp.set("q", q) : sp.delete("q");
    year ? sp.set("year", year) : sp.delete("year");
    month ? sp.set("month", month) : sp.delete("month");
    sort ? sp.set("sort", sort) : sp.delete("sort");
    setSearchParams(sp, { replace: true });
  }, [page, q, year, month, sort, searchParams, setSearchParams]);

  // scroll up on changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page, q, year, month, sort]);

  // === search shortcut ala EksPage ===
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

  // sort data
  const baseSorted = useMemo(() => {
    const copy = [...news];
    copy.sort((a, b) => {
      const da = new Date(a.tanggal);
      const db = new Date(b.tanggal);
      const diff = db - da || 0;
      return sort === "newest" ? diff : -diff;
    });
    return copy;
  }, [sort]);

  // filter data
  const filtered = useMemo(() => {
    const tokens = normalizeText(q).split(" ").filter(Boolean);
    return baseSorted.filter((n) => {
      const d = new Date(n.tanggal);
      if (year && String(d.getFullYear()) !== year) return false;
      if (month) {
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        if (mm !== month) return false;
      }
      if (tokens.length) {
        const hay = normalizeText(
          [
            n.judul || n.title,
            n.deskripsi || n.excerpt,
            n.kategori || n.category,
            Array.isArray(n.tags) ? n.tags.join(" ") : "",
          ].join(" ")
        );
        if (!tokens.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [baseSorted, q, year, month]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const start = (page - 1) * pageSize;
  const current = useMemo(
    () => filtered.slice(start, start + pageSize),
    [filtered, start]
  );

  const resetFilters = () => {
    setQ("");
    setYear("");
    setMonth("");
    setSort("newest");
    setPage(1);
    inputRef.current?.focus();
  };

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8" aria-labelledby="page-title">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-6 sm:mb-8 text-center">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl font-extrabold text-primary"
          >
            Berita
          </h1>
          <p className="mt-2 text-base-content/70">
            Temukan kabar terbaru, pengumuman, dan aktivitas sekolah.
          </p>
        </header>

        {/* toolbar ala EksPage */}
        <section className="card bg-base-100 border border-base-200 rounded-box shadow-sm">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-end">
              {/* search */}
              <div className="flex-1 w-full">
                <span className="label-text mb-2 block">Cari berita</span>
                <label className="input w-full gap-2" htmlFor="news-search">
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
                    id="news-search"
                    ref={inputRef}
                    type="search"
                    className="grow"
                    placeholder="cari judul, deskripsi, kategori, tag…"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Pencarian berita"
                  />
                  <kbd className="kbd kbd-sm">{isMac ? "⌘" : "Ctrl"}</kbd>
                  <kbd className="kbd kbd-sm">K</kbd>
                </label>
              </div>

              {/* Tahun */}
              <div className="w-full sm:w-40">
                <span className="label-text mb-2 block">Tahun</span>
                <select
                  className="select select-bordered w-full"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Semua</option>
                  {years.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bulan */}
              <div className="w-full sm:w-48">
                <span className="label-text mb-2 block">Bulan</span>
                <select
                  className="select select-bordered w-full"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Semua</option>
                  {MONTHS.map((m) => (
                    <option key={m.v} value={m.v}>
                      {m.l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="w-full sm:w-44">
                <span className="label-text mb-2 block">Urutkan</span>
                <select
                  className="select select-bordered w-full"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                </select>
              </div>

              {/* Reset */}
              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!q && !year && !month && sort === "newest"}
                  className="btn btn-outline border-base-300 w-full sm:w-auto"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* hasil grid */}
        <section className="mt-8 space-y-6">
          <div className="text-sm text-base-content/70">
            Menampilkan <span className="font-medium">{current.length}</span>{" "}
            dari <span className="font-medium">{filtered.length}</span> berita
            {year && ` • Tahun ${year}`}
            {month && ` • ${MONTHS.find((m) => m.v === month)?.l}`}
            {q && ` • Cari: “${q}”`}
          </div>

          {current.length === 0 ? (
            <div className="rounded-box border border-base-200 bg-base-100 p-10 text-center">
              <div className="text-lg font-semibold">Tidak ada hasil</div>
              <p className="mt-1 text-base-content/70">
                Coba ubah kata kunci atau filter tanggal.
              </p>
              <button className="btn btn-soft mt-4" onClick={resetFilters}>
                Hapus semua filter
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-center">
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
        </section>
      </div>
    </main>
  );
}
