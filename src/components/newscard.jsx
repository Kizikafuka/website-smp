// src/components/NewsCard.jsx
import calendarIcon from "../assets/icons/calendar.svg"
export default function NewsCard({


  img,            // url gambar
  judul,
  ringkas,        // deskripsi singkat
  tanggal,        // string, contoh: "09 Jul 2025"
  href = "#",
}) {
  return (
    <div className="card w-full max-w-md mx-auto bg-base-100 shadow-sm border border-[#EEE]">
      {/* Thumbnail */}
      {img && (
        <figure className="w-full h-48 overflow-hidden">
          <img src={img} alt={judul} className="w-full h-full object-cover" />
        </figure>
      )}

      {/* Body */}
      <div className="card-body gap-3 sm:gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold line-clamp-2">
          {judul}
        </h3>

        {ringkas && (
          <p className="text-sm sm:text-base line-clamp-3">
            {ringkas}
          </p>
        )}

        {/* Tanggal di bawah deskripsi */}
        {tanggal && (
          <div className="mt-auto flex items-center gap-2 text-xs sm:text-sm text-base-content/70">
            <img
                src={calendarIcon}
                alt="Calendar Icon"
                className="w-4 h-4 object-contain"
            />
            <span>{tanggal}</span>
          </div>
        )}

        <div className="card-actions mt-auto">
          <a href={href} className="btn btn-block btn-sm md:btn-md">
            Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
}
