// src/components/GalleryCard.jsx
import { useEffect, useId, useRef, useState } from "react";

export default function GalleryCard({
  src,
  title,
  desc,
  alt = "",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Close with ESC and click on backdrop
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    // Prevent body scroll when modal open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to close button when modal opens
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open]);

  // Return focus to trigger after closing
  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Kartu — use a real button for keyboard accessibility */}
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className={`relative card bg-base-100 shadow-sm w-full max-w-sm cursor-pointer group overflow-hidden text-left ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={titleId}
      >
        {/* Gambar */}
        <figure className="relative w-full h-56">
          <img
            src={src}
            alt={alt || title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {/* Overlay gelap saat hover */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"
          />
        </figure>

        {/* Teks muncul saat hover */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white pointer-events-none">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {desc && <p className="text-sm mt-1 line-clamp-2">{desc}</p>}
        </div>
      </button>

      {/* Modal / lightbox */}
      <div
        className={`modal ${open ? "modal-open" : ""}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={desc ? descId : undefined}
        onMouseDown={(e) => {
          // close when clicking the backdrop (outside modal-box)
          if (e.target === modalRef.current) setOpen(false);
        }}
      >
        <div className="modal-box w-11/12 max-w-4xl p-3 md:p-4">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <h3 id={titleId} className="font-bold text-lg truncate">
              {title || "Foto"}
            </h3>
            <button
              ref={closeBtnRef}
              className="btn btn-ghost btn-sm"
              onClick={() => setOpen(false)}
            >
              ✕<span className="sr-only">Tutup</span>
            </button>
          </div>

          {/* Konten bisa di-scroll jika tinggi */}
          <div className="max-h-[80vh] overflow-auto">
            <img
              src={src}
              alt={alt || title}
              className="w-full h-auto rounded-lg"
              loading="lazy"
              decoding="async"
            />
            {desc && (
              <p id={descId} className="mt-3 text-sm opacity-80">
                {desc}
              </p>
            )}
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
