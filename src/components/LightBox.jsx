import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Lightbox v2 — fixed:
 * - Content z-index above side hotspots
 * - Side hotspots z-index lower than content
 * - Image click guarded (no accidental navigation/close)
 * - All previous features (Esc/←/→, swipe, preload, focus trap)
 */
export default function Lightbox({ items, index, onClose, onNext, onPrev }) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const lastActiveRef = useRef(null);
  const [current, setCurrent] = useState(index);

  useEffect(() => setCurrent(index), [index]);

  // Show animation + lock scroll
  useEffect(() => {
    lastActiveRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = requestAnimationFrame(() => setVisible(true));
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(t);
    };
  }, []);

  // Focus trap & return focus
  useEffect(() => {
    contentRef.current?.focus({ preventScroll: true });
    return () => {
      const el = lastActiveRef.current;
      if (el && el.focus) el.focus();
    };
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Tab") {
        e.preventDefault(); // simple trap
        contentRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  // Backdrop click
  const onBackdropMouseDown = (e) => {
    if (e.target === containerRef.current) onClose();
  };

  // Swipe support
  const swipeState = useRef({ x: 0, y: 0, active: false });
  const onPointerDown = (e) => {
    swipeState.current = { x: e.clientX, y: e.clientY, active: true };
  };
  const onPointerUp = (e) => {
    const s = swipeState.current;
    if (!s.active) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    swipeState.current.active = false;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  // Preload neighbor images
  const neighbors = useMemo(() => {
    const prev = items[(current - 1 + items.length) % items.length]?.src;
    const next = items[(current + 1) % items.length]?.src;
    return [prev, next].filter(Boolean);
  }, [current, items]);

  useEffect(() => {
    const imgs = neighbors.map((src) => {
      const i = new Image();
      i.src = src;
      return i;
    });
    return () => {
      imgs.forEach((i) => (i.onload = null));
    };
  }, [neighbors]);

  const item = items[current];

  return createPortal(
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[120] flex items-center justify-center
        ${visible ? "opacity-100" : "opacity-0"} transition-opacity duration-150
        bg-black/60 backdrop-blur-sm`}
      onMouseDown={onBackdropMouseDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      aria-modal="true"
      role="dialog"
      aria-label={item?.title || "Gambar"}
    >
      {/* Content (di atas hotspot): z-20 */}
      <div
        ref={contentRef}
        tabIndex={-1}
        className={`relative z-20 w-[92vw] max-w-5xl max-h-[88vh] outline-none
          ${
            visible ? "scale-100" : "scale-95"
          } transition-transform duration-150`}
        onMouseDown={(e) => e.stopPropagation()} // block backdrop close
        style={{ touchAction: "pan-y" }} // reduce accidental double-tap zoom
      >
        <div className="rounded-2xl bg-base-100 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-base-300">
            <div className="min-w-0 pr-2">
              <h3 className="font-semibold text-base sm:text-lg truncate">
                {item?.title || "Foto"}
              </h3>
              {item?.desc && (
                <p className="text-xs sm:text-sm opacity-70 truncate">
                  {item.desc}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Sebelumnya (←)"
              >
                ←
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Berikutnya (→)"
              >
                →
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Tutup (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Media */}
          <div className="p-2 sm:p-3">
            <img
              src={item?.src}
              alt={item?.title || "Foto"}
              className="block max-h-[70vh] w-auto mx-auto rounded-lg select-none"
              loading="eager"
              decoding="async"
              draggable={false}
              onClick={(e) => {
                // Jangan pernah bubble/trigger apa pun dari klik gambar
                e.preventDefault();
                e.stopPropagation();
              }}
              onDoubleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </div>

          {/* Footer / page indicator */}
          <div className="px-3 sm:px-4 py-2 border-t border-base-300 text-xs sm:text-sm text-base-content/70">
            {current + 1} / {items.length}
          </div>
        </div>
      </div>

      {/* Side nav hotspots (di bawah konten): z-10 */}
      <button
        className="absolute inset-y-0 left-0 w-1/4 md:w-1/3 cursor-pointer z-10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Sebelumnya"
        tabIndex={-1}
        style={{ background: "transparent" }}
      />
      <button
        className="absolute inset-y-0 right-0 w-1/4 md:w-1/3 cursor-pointer z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Berikutnya"
        tabIndex={-1}
        style={{ background: "transparent" }}
      />
    </div>,
    document.body
  );
}
