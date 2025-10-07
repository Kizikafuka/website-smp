export default function GalleryCard({
  src,
  title,
  desc,
  alt = "",
  className = "",
  eager = false,
  onOpen,
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`card bg-base-100 border border-base-200 shadow-sm w-full text-left hover:shadow transition ${className}`}
      aria-haspopup="dialog"
      aria-label={`Buka ${title || "foto"}`}
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
  );
}
