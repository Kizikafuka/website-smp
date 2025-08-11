// src/components/InfoCard.jsx
export default function InfoCard({
  tanggal,
  kategori,
  judul,
  deskripsi,
  href = "#",
}) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm border border-[#EEE]">
      {/* Area tanggal besar */}
      <figure className="bg-sky-400 w-full flex justify-center items-center py-16">
        <span className="text-white font-bold text-3xl">{tanggal}</span>
      </figure>

      {/* Body */}
      <div className="card-body">
        {/* Judul + Kategori */}
        <h2 className="card-title text-2xl flex items-start gap-2">
          <span className="flex-1">{judul}</span>
          {kategori && (
            <div className="badge bg-yellow-400 text-black">{kategori}</div>
          )}
        </h2>

        {/* Deskripsi */}
        {deskripsi && <p className="line-clamp-2">{deskripsi}</p>}

        {/* Tombol */}
        <div className="card-actions mt-auto">
          <a
            href={href}
            className="btn btn-block"
          >
            Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
}
