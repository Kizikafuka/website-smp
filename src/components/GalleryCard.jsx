import { useEffect, useId, useRef, useState } from "react";

export default function GalleryCard({
  src,
  title,
  desc,
  alt = "",
  className = "",
  eager = false,
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Lock scroll + ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  // Return focus
  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className={`card bg-base-100 border border-base-200 shadow-sm w-full text-left ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={titleId}
      >
        <figure className="w-full overflow-hidden rounded-box">
          <img
            src={src}
            alt={alt || title}
            className="w-full h-auto object-cover"
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        </figure>
        {(title || desc) && (
          <div className="card-body p-4">
            {title && <h2 className="font-semibold">{title}</h2>}
            {desc && <p className="text-sm text-base-content/70">{desc}</p>}
          </div>
        )}
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
        <div className="modal-box w-11/12 max-w-4xl p-3 md:p-4 max-h-[85vh] flex flex-col overflow-y-auto">
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
