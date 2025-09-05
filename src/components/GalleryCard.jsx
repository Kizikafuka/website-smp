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

  // Lock background + ESC + focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open]);

  // Return focus to trigger
  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Card */}
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className={`relative card bg-base-100 shadow-sm w-full max-w-sm cursor-pointer group overflow-hidden text-left ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={titleId}
      >
        <figure className="relative w-full h-56">
          <img
            src={src}
            alt={alt || title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"
          />
        </figure>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white pointer-events-none">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {desc && <p className="text-sm mt-1 line-clamp-2">{desc}</p>}
        </div>
      </button>

      {/* Modal / Lightbox */}
      <div
        className={`modal ${open ? "modal-open" : ""}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={desc ? descId : undefined}
        onMouseDown={(e) => {
          if (e.target === modalRef.current) setOpen(false);
        }}
      >
        {/* Option B: make the modal-box the scroll container (usually smoothest) */}
        <div
          className="modal-box w-11/12 max-w-4xl p-3 md:p-4 max-h-[85vh] flex flex-col overflow-y-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            transform: "translateZ(0)", // promote to its own layer
            backfaceVisibility: "hidden",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2 md:mb-3 shrink-0">
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

          {/* Content */}
          <div className="flex-1">
            <img
              src={src}
              alt={alt || title}
              className="block w-full h-auto rounded-lg"
              loading="lazy"
              decoding="async"
            />
            {desc && (
              <p id={descId} className="mt-3 text-sm opacity-80">
                {desc}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="modal-action shrink-0">
            <button className="btn" onClick={() => setOpen(false)}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
