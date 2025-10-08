// src/pages/EksPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import EksItemCard from "../components/EksItemCard.jsx";
import Pagination from "../components/Pagination.jsx";
import sampleImg from "../assets/images/hero.jpg";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function getDayFromSchedule(schedule = "") {
  const day = (schedule || "").trim().split(/\s+/)[0];
  return day || "";
}

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function EksPage() {
  // Dummy data (ganti ke backend nanti)
  const allClubs = useMemo(
    () => [
      {
        name: "Pramuka",
        coach: "Pak Rudi",
        schedule: "Jumat 15.30–17.00",
        location: "Lapangan",
        photo: sampleImg,
      },
      {
        name: "Paskibra",
        coach: "Bu Nita",
        schedule: "Rabu 15.30–17.00",
        location: "Lapangan Upacara",
        photo: sampleImg,
      },
      {
        name: "PMR",
        coach: "Pak Amir",
        schedule: "Kamis 15.30–17.00",
        location: "UKS",
        photo: sampleImg,
      },
      {
        name: "Basket",
        coach: "Pak Andi",
        schedule: "Selasa 16.00–18.00",
        location: "Gor/Indoor",
        photo: sampleImg,
      },
      {
        name: "Futsal",
        coach: "Pak Bima",
        schedule: "Senin 16.00–18.00",
        location: "Lapangan Futsal",
        photo: sampleImg,
      },
      {
        name: "KIR",
        coach: "Bu Rani",
        schedule: "Kamis 15.30–17.00",
        location: "Lab IPA",
        photo: sampleImg,
      },
      {
        name: "Tari",
        coach: "Bu Sari",
        schedule: "Rabu 15.30–17.00",
        location: "Aula",
        photo: sampleImg,
      },
      {
        name: "Paduan Suara",
        coach: "Pak Yoga",
        schedule: "Selasa 15.30–17.00",
        location: "Ruang Musik",
        photo: sampleImg,
      },
      {
        name: "English Club",
        coach: "Bu Nia",
        schedule: "Jumat 15.30–17.00",
        location: "Perpustakaan",
        photo: sampleImg,
      },
      {
        name: "Catur",
        coach: "Pak Dion",
        schedule: "Senin 15.30–17.00",
        location: "Ruang OSIS",
        photo: sampleImg,
      },
      {
        name: "IT/Programming",
        coach: "Pak Iqbal",
        schedule: "Kamis 16.00–18.00",
        location: "Lab Komputer",
        photo: sampleImg,
      },
      {
        name: "Jurnalistik",
        coach: "Bu SomCs",
        schedule: "Selasa 15.30–17.00",
        location: "Ruang Multimedia",
        photo: sampleImg,
      },
    ],
    []
  );

  // ==== state filter ====
  const [q, setQ] = useState("");
  const [selectedDay, setSelectedDay] = useState(""); // "" = semua hari

  // paging
  const pageSize = 9;
  const [page, setPage] = useState(1);

  // shortcut search (⌘K / Ctrl+K)
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

  // ==== hasil filter ====
  const filtered = useMemo(() => {
    const tokens = normalizeText(q).split(" ").filter(Boolean);

    return allClubs.filter((c) => {
      // AND-tokenized: semua kata harus ada di salah satu field
      const hay = normalizeText(`${c.name} ${c.coach} ${c.location}`);
      const matchTerm =
        tokens.length === 0 || tokens.every((t) => hay.includes(t));

      // filter hari ("" = semua)
      const clubDay = getDayFromSchedule(c.schedule);
      const matchDay = selectedDay === "" || clubDay === selectedDay;

      return matchTerm && matchDay;
    });
  }, [allClubs, q, selectedDay]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const resetFilters = () => {
    setQ("");
    setSelectedDay("");
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
            Ekstrakurikuler
          </h1>
        </header>

        {/* ===== FILTER TOOLBAR (nyatu & rapi) ===== */}
        <section className="card bg-base-100 border border-base-200 rounded-box shadow-sm">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-end">
              {/* Search */}
              <div className="flex-1 w-full">
                <span className="label-text mb-2 block">Cari ekskul</span>
                <label className="input w-full gap-2" htmlFor="eks-search">
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
                    id="eks-search"
                    ref={inputRef}
                    type="search"
                    className="grow"
                    placeholder="cari nama, pembina, lokasi…"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Pencarian ekskul"
                  />
                  <kbd className="kbd kbd-sm">{isMac ? "⌘" : "Ctrl"}</kbd>
                  <kbd className="kbd kbd-sm">K</kbd>
                </label>
              </div>

              {/* Select hari */}
              <div className="w-full sm:w-48">
                <span className="label-text mb-2 block">Hari kegiatan</span>
                <select
                  value={selectedDay}
                  onChange={(e) => {
                    setSelectedDay(e.target.value);
                    setPage(1);
                  }}
                  className="select select-bordered w-full"
                >
                  <option value="">Semua hari</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!q && !selectedDay}
                  className="btn btn-outline border-base-300 w-full sm:w-auto"
                >
                  Reset filter
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="mt-8">
          {currentItems.length === 0 ? (
            <div className="rounded-box border border-base-200 bg-base-100 p-8 text-center">
              <div className="text-lg font-semibold">Tidak ada hasil</div>
              <p className="mt-1 text-base-content/70">
                Coba ubah kata kunci atau pilih hari lain.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map((c) => (
                  <EksItemCard key={c.name} {...c} />
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
