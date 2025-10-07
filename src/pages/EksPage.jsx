import { useEffect, useMemo, useRef, useState } from "react";
import EksItemCard from "../components/EksItemCard.jsx";
// ganti import Pagination sesuai lokasi kamu:
// import Pagination from "../components/Table/Pagination.jsx";
import Pagination from "../components/Pagination.jsx";
import sampleImg from "../assets/images/hero.jpg";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function getDayFromSchedule(schedule = "") {
  const day = (schedule || "").trim().split(/\s+/)[0];
  return day || "";
}

export default function EksPage() {
  // Dummy data (replace dengan backend nanti)
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
        coach: "Bu Laila",
        schedule: "Selasa 15.30–17.00",
        location: "Ruang Multimedia",
        photo: sampleImg,
      },
    ],
    []
  );

  // state filter
  const [q, setQ] = useState("");
  const [selectedDays, setSelectedDays] = useState(new Set()); // kosong = semua

  // paging
  const pageSize = 9;
  const [page, setPage] = useState(1);

  // dropdown state (untuk multiselect hari)
  const [openDays, setOpenDays] = useState(false);
  const dropRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpenDays(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const toggleDay = (day) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
    setPage(1);
  };

  const isAllChecked = selectedDays.size === DAYS.length;
  const toggleAllDays = () => {
    setSelectedDays((prev) =>
      prev.size === DAYS.length ? new Set() : new Set(DAYS)
    );
    setPage(1);
  };

  // hasil filter
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allClubs.filter((c) => {
      const matchTerm =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.coach.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term);

      const clubDay = getDayFromSchedule(c.schedule);
      const matchDay = selectedDays.size === 0 || selectedDays.has(clubDay);

      return matchTerm && matchDay;
    });
  }, [allClubs, q, selectedDays]);

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
    setSelectedDays(new Set());
    setPage(1);
  };

  const selectedLabel =
    selectedDays.size === 0 || selectedDays.size === DAYS.length
      ? "Semua hari"
      : `${selectedDays.size} hari dipilih`;

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8" aria-labelledby="page-title">
      <div className="max-w-screen-2xl mx-auto">
        {/* header */}
        <header className="mb-6 sm:mb-8">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl font-extrabold text-primary text-center"
          >
            Ekstrakurikuler
          </h1>
        </header>

        {/* ===== FILTER TOOLBAR ===== */}
        <section className="card bg-base-100 border border-base-200 rounded-box shadow-sm">
          <div className="card-body gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Search */}
              <label className="form-control">
                <span className="label-text mb-2">Cari ekskul</span>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  placeholder="cari nama, pembina, lokasi…"
                  className="input input-bordered w-full border-base-300
                     focus:outline-none focus:ring-0 focus:border-base-300"
                />
              </label>

              {/* Dropdown multiselect hari */}
              <div className="form-control md:col-span-1" ref={dropRef}>
                <span className="label-text mb-2">Hari kegiatan</span>

                <div
                  className={`dropdown w-full ${
                    openDays ? "dropdown-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDays((o) => !o)}
                    aria-expanded={openDays}
                    aria-haspopup="listbox"
                    className="btn btn-outline w-full justify-between no-animation
                       border-base-300 border-[1px]
                       focus:outline-none focus:ring-0 active:scale-100"
                  >
                    <span className="truncate">{selectedLabel}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${
                        openDays ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <ul
                    className="dropdown-content menu bg-base-100 mt-2 w-60 p-3 z-50 shadow-lg
                       rounded-box border border-base-300"
                  >
                    <li>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={isAllChecked}
                          onChange={toggleAllDays}
                        />
                        <span>Semua hari</span>
                      </label>
                    </li>
                    <div className="divider my-2" />
                    {DAYS.map((d) => (
                      <li key={d}>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={selectedDays.has(d)}
                            onChange={() => toggleDay(d)}
                          />
                          <span>{d}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ringkasan + Reset (kanan) */}
              <div className="flex flex-wrap md:justify-end gap-2 md:pt-8">
                {[...selectedDays].map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1 rounded-full
                        border-base-300 border-[1px] px-3 py-1 text-sm"
                  >
                    {d}
                    <button
                      type="button"
                      className="opacity-60 hover:opacity-100"
                      onClick={() => toggleDay(d)}
                      aria-label={`hapus ${d}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}

                {q && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full
                        border-base-300 border-[1px] px-3 py-1 text-sm"
                  >
                    Cari: <span className="font-semibold">{q}</span>
                    <button
                      type="button"
                      className="opacity-60 hover:opacity-100"
                      onClick={() => setQ("")}
                      aria-label="hapus kata kunci"
                    >
                      ✕
                    </button>
                  </span>
                )}

                {(q || selectedDays.size > 0) && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn btn-outline btn-sm border-base-300"
                  >
                    Reset
                  </button>
                )}
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
                Coba ubah kata kunci atau atur ulang filter hari.
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
