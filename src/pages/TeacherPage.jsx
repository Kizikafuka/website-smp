// src/pages/TeachersPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import TeacherCard from "../components/TeacherCard.jsx";
import Pagination from "../components/Pagination.jsx";
import sampleImg from "../assets/images/hero.jpg";

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function TeachersPage() {
  // Dummy data (ganti ke backend nanti)
  const allTeachers = useMemo(
    () =>
      Array.from({ length: 27 }).map((_, i) => ({
        id: i + 1,
        photo: sampleImg,
        name: `Muhammad Abidin ${i + 1}`,
        gender: i % 2 === 0 ? "Laki-Laki" : "Perempuan",
        birthplace: "Balikpapan",
        birthdate: "17 Agustus 1945",
        role: "Guru Mata Pelajaran",
      })),
    []
  );

  // ==== state filter ====
  const [q, setQ] = useState("");
  const [gender, setGender] = useState(""); // "" = semua

  // paging
  const pageSize = 9;
  const [page, setPage] = useState(1);

  // shortcut search (⌘K / Ctrl+K) — sama seperti EksPage
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

  // ==== filter + sort (selalu A–Z) ====
  const filtered = useMemo(() => {
    const tokens = normalizeText(q).split(" ").filter(Boolean);

    const base = allTeachers.filter((t) => {
      // AND-tokenized: semua kata harus ada di salah satu field
      const hay = normalizeText(`${t.name} ${t.role} ${t.birthplace}`);
      const matchTerm =
        tokens.length === 0 || tokens.every((tok) => hay.includes(tok));

      const matchGender = gender === "" || (t.gender || "") === gender;

      return matchTerm && matchGender;
    });

    // urut nama A–Z
    return base.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "id")
    );
  }, [allTeachers, q, gender]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  // reset ke halaman 1 kalau filter berubah
  useEffect(() => {
    setPage(1);
  }, [q, gender]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const resetFilters = () => {
    setQ("");
    setGender("");
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
            Daftar Guru &amp; Staf
          </h1>
          <p className="mt-2 text-sm text-base-content/70">
            {filtered.length} data ditemukan
            {q ? ` untuk “${q}”` : ""}
            {gender ? ` — ${gender}` : ""}
          </p>
        </header>

        {/* ===== FILTER TOOLBAR (match EksPage) ===== */}
        <section className="card bg-base-100 border border-base-200 rounded-box shadow-sm">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-end">
              {/* Search */}
              <div className="flex-1 w-full">
                <span className="label-text mb-2 block">Cari guru/staf</span>
                <label className="input w-full gap-2" htmlFor="teacher-search">
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
                    id="teacher-search"
                    ref={inputRef}
                    type="search"
                    className="grow"
                    placeholder="cari nama, mapel, atau tempat lahir…"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Pencarian guru"
                  />
                  <kbd className="kbd kbd-sm">{isMac ? "⌘" : "Ctrl"}</kbd>
                  <kbd className="kbd kbd-sm">K</kbd>
                </label>
              </div>

              {/* Select gender (single-choice) */}
              <div className="w-full sm:w-48">
                <span className="label-text mb-2 block">Jenis kelamin</span>
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setPage(1);
                  }}
                  className="select select-bordered w-full"
                >
                  <option value="">Semua</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              {/* Reset */}
              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!q && !gender}
                  className="btn btn-outline border-base-300 w-full sm:w-auto"
                >
                  Reset filter
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== GRID + PAGINATION ===== */}
        <section className="mt-8">
          {currentItems.length === 0 ? (
            <div className="rounded-box border border-base-200 bg-base-100 p-8 text-center">
              <div className="text-lg font-semibold">Tidak ada hasil</div>
              <p className="mt-1 text-base-content/70">
                Coba ubah kata kunci atau pilih jenis kelamin lain.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map((t) => (
                  <TeacherCard key={t.id} {...t} />
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
