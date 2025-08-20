import { useEffect, useRef, useState } from "react";

export default function GalleryCard({
  src,
  title,
  desc,
  alt = "",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // Tutup modal dengan ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Kartu */}
      <div
        className={`relative card bg-base-100 shadow-sm w-full max-w-sm cursor-pointer group overflow-hidden ${className}`}
        onClick={() => setOpen(true)}
        role="button"
        aria-label={`Buka foto ${title || alt}`}
      >
        {/* Gambar */}
        <figure className="relative w-full h-56">
          <img
            src={src}
            alt={alt || title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay gelap saat hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
        </figure>

        {/* Teks muncul saat hover */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {desc && <p className="text-sm mt-1 line-clamp-2">{desc}</p>}
        </div>
      </div>

      {/* Modal / lightbox */}
      <div
        className={`modal ${open ? "modal-open" : ""}`}
        ref={modalRef}
        onClick={(e) => {
          if (e.target === modalRef.current) setOpen(false);
        }}
      >
        <div className="modal-box w-11/12 max-w-4xl p-3 md:p-4">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <h3 className="font-bold text-lg truncate">{title || "Foto"}</h3>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Konten bisa di-scroll jika tinggi */}
          <div className="max-h-[80vh] overflow-auto">
            <img
              src={src}
              alt={alt || title}
              className="w-full h-auto rounded-lg"
            />
            {desc && <p className="mt-3 text-sm opacity-80">{desc}</p>}
          </div>

          <div className="modal-action">
            <button className="btn" onClick={() => setOpen(false)}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
