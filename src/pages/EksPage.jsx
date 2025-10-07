// src/pages/EksPage.jsx
import { useMemo, useState } from "react";
import EksItemCard from "../components/EksCard.jsx";
import Pagination from "../components/Pagination.jsx";
import sampleImg from "../assets/images/hero.jpg";

export default function EksPage() {
  // Dummy data (replace with backend later)
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

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(allClubs.length / pageSize)),
    [allClubs.length]
  );

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allClubs.slice(start, start + pageSize);
  }, [allClubs, page]);

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <div className="max-w-screen-2xl mx-auto py-8 sm:py-10">
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-center mb-16"
        >
          Ekstrakurikuler
        </h1>

        {currentItems.length === 0 ? (
          <p className="text-center text-base-content/60">
            Data ekstrakurikuler belum tersedia.
          </p>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
