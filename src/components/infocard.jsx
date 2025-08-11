// src/components/InfoCard.jsx
export default function InfoCard({
  tanggal,
  kategori,
  judul,
  deskripsi,
  href = "#",
}) {
  return (
    <div className="card w-full max-w-sm mx-auto bg-base-100 shadow-sm border border-[#EEE]">
      {/* Area tanggal besar */}
      <figure className="bg-sky-400 w-full flex justify-center items-center py-12 rounded-t-lg">
        <span className="text-white font-bold text-2xl sm:text-3xl">
          {tanggal}
        </span>
      </figure>

      {/* Body */}
      <div className="card-body flex flex-col gap-3 sm:gap-4">
        {/* Judul + Kategori (badge top-aligned) */}
        <h2 className="card-title text-xl sm:text-2xl flex items-start gap-2">
          <span className="flex-1">{judul}</span>
          {kategori && (
            <div className="badge bg-yellow-400 text-black">{kategori}</div>
          )}
        </h2>

        {/* Deskripsi (ellipsis 2 baris) */}
        {deskripsi && (
          <p className="line-clamp-2 text-sm sm:text-base">{deskripsi}</p>
        )}

        {/* Tombol */}
        <div className="card-actions mt-auto">
          <a href={href} className="btn btn-block btn-sm md:btn-md">
            Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
}
