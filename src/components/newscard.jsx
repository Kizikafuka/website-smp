// src/components/NewsCard.jsx
import { Link } from "react-router-dom";
import calendarIcon from "../assets/icons/calendar.svg";

export default function NewsCard({
  img,
  judul,
  ringkas,
  tanggal, // ISO string e.g. "2025-07-09"
  slug,
}) {
  // Format tanggal ke bahasa Indonesia dengan fallback
  let tanggalID = "";
  if (tanggal) {
    try {
      tanggalID = new Date(tanggal).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      tanggalID = tanggal; // fallback raw string
    }
  }

  const headingId = `news-title-${slug || Math.random().toString(36).slice(2)}`;
  const hasSlug = Boolean(slug);

  return (
    <article
      className="card w-full max-w-md mx-auto bg-base-100 shadow-sm border border-base-200"
      aria-labelledby={headingId}
    >
      {/* Gambar */}
      {img && (
        <figure className="w-full overflow-hidden">
          <img
            src={img}
            alt={judul}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[16/9] object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>
      )}

      {/* Konten */}
      <div className="card-body gap-3 sm:gap-4">
        {/* Judul */}
        <h2
          id={headingId}
          className="text-xl sm:text-2xl font-semibold line-clamp-2"
        >
          {judul}
        </h2>

        {/* Ringkasan */}
        {ringkas && (
          <p className="text-sm sm:text-base text-base-content/80 line-clamp-3">
            {ringkas}
          </p>
        )}

        {/* Tanggal */}
        {tanggalID && (
          <div className="mt-auto flex items-center gap-2 text-xs sm:text-sm text-base-content/70">
            <img
              src={calendarIcon}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 object-contain"
            />
            <time dateTime={tanggal}>{tanggalID}</time>
          </div>
        )}

        {/* Tombol Selengkapnya */}
        <div className="card-actions mt-auto">
          {hasSlug ? (
            <Link
              to={`/profil/berita/${slug}`}
              className="btn btn-primary btn-block btn-sm md:btn-md"
            >
              Selengkapnya
            </Link>
          ) : (
            <button
              className="btn btn-primary btn-block btn-sm md:btn-md"
              disabled
              aria-disabled
            >
              Selengkapnya
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
