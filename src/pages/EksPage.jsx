import { useEffect, useMemo, useState } from "react";
import EksItemCard from "../components/EksCard.jsx";

// contoh gambar lokal — ganti dengan fotomu
import sampleImg from "../assets/images/hero.jpg";

export default function EksPage() {
  // Dummy data (nanti tinggal tarik dari backend)
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

  const pageSize = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allClubs.length / pageSize);

  const currentItems = allClubs.slice((page - 1) * pageSize, page * pageSize);

  // Scroll ke atas tiap ganti halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Deret tombol ramping: 1 … (p-1) p (p+1) … last
  function getCompactPages(total, current) {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    const set = new Set([1, total, current - 1, current, current + 1]);
    const pages = Array.from(set)
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b);

    const out = [];
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      out.push(p);
      const next = pages[i + 1];
      if (next && next - p > 1) out.push("dots");
    }
    return out;
  }

  const pageItems = getCompactPages(totalPages, page);

  const goto = (p) => {
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (clamped !== page) setPage(clamped);
  };

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-16">
          Ekstrakurikuler
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((c, idx) => (
            <EksItemCard key={`${c.name}-${idx}`} {...c} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col items-center gap-2">
          {/* Mobile compact */}
          <div className="join sm:hidden">
            <button
              className="join-item btn btn-sm"
              onClick={() => goto(page - 1)}
              disabled={page === 1}
              aria-label="Sebelumnya"
            >
              «
            </button>
            <button className="join-item btn btn-sm" disabled>
              {page} / {totalPages}
            </button>
            <button
              className="join-item btn btn-sm"
              onClick={() => goto(page + 1)}
              disabled={page === totalPages}
              aria-label="Berikutnya"
            >
              »
            </button>
          </div>

          {/* sm+ : angka ramping + titik */}
          <div className="hidden sm:flex">
            <div className="join">
              <button
                className="join-item btn btn-sm md:btn-md"
                onClick={() => goto(page - 1)}
                disabled={page === 1}
                aria-label="Sebelumnya"
              >
                «
              </button>

              {pageItems.map((p, idx) =>
                p === "dots" ? (
                  <button
                    key={`dots-${idx}`}
                    className="join-item btn btn-sm md:btn-md"
                    disabled
                  >
                    …
                  </button>
                ) : (
                  <button
                    key={p}
                    className={`join-item btn btn-sm md:btn-md ${
                      page === p ? "btn-active" : ""
                    }`}
                    onClick={() => goto(p)}
                    aria-current={page === p ? "page" : undefined}
                    aria-label={`Halaman ${p}`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                className="join-item btn btn-sm md:btn-md"
                onClick={() => goto(page + 1)}
                disabled={page === totalPages}
                aria-label="Berikutnya"
              >
                »
              </button>
            </div>
          </div>

          <p className="text-center text-sm opacity-70">
            Halaman {page} dari {totalPages}
          </p>
        </div>
      </div>
    </main>
  );
}
