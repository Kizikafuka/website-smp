// src/components/NewsCard.jsx
import { Link } from "react-router-dom";
import calendarIcon from "../assets/icons/calendar.svg";

export default function NewsCard({
  img,
  judul,
  ringkas,
  tanggal, // ISO string seperti "2025-07-09"
  slug,
}) {
  const tanggalID = tanggal
    ? new Date(tanggal).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="card w-full max-w-md mx-auto bg-base-100 shadow-sm border border-[#EEE]">
      {img && (
        <figure className="w-full h-48 overflow-hidden">
          <img src={img} alt={judul} className="w-full h-full object-cover" />
        </figure>
      )}

      <div className="card-body gap-3 sm:gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold line-clamp-2">
          {judul}
        </h3>

        {ringkas && (
          <p className="text-sm sm:text-base line-clamp-3">{ringkas}</p>
        )}

        {tanggal && (
          <div className="mt-auto flex items-center gap-2 text-xs sm:text-sm text-base-content/70">
            <img src={calendarIcon} alt="" className="w-4 h-4 object-contain" />
            <span>{tanggalID}</span>
          </div>
        )}

        <div className="card-actions mt-auto">
          <Link
            to={`/profil/berita/${slug}`}
            className="btn btn-block btn-sm md:btn-md"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
}
