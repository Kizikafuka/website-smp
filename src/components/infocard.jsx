// src/components/InfoCard.jsx
import { Link } from "react-router-dom";
import { formatTanggalTile, splitTanggalRow } from "../lib/fetchInfo.js";

function SmartLink({ href = "#", className = "", children, ...rest }) {
  const isExternal =
    /^(?:https?:)?\/\//i.test(href) || /^(mailto:|tel:)/i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export default function InfoCard({
  id,
  tanggal, // ISO string: "2025-07-08"
  kategori,
  judul,
  deskripsi,
  href = "#",
  showButton = true,
  variant = "tile", // "tile" | "row"
}) {
  if (variant === "row") {
    const [d, tail] = splitTanggalRow(tanggal);
    return (
      <div
        id={id}
        className="flex rounded-lg border border-base-200 shadow-sm overflow-hidden bg-base-100"
      >
        {/* Strip tanggal – ikut tema */}
        <div className="bg-primary text-primary-content flex flex-col justify-center items-center px-6 py-6 min-w-[104px]">
          <div className="text-4xl font-extrabold leading-none">{d}</div>
          <div className="text-sm mt-1 uppercase tracking-wide">{tail}</div>
        </div>

        <div className="flex-1 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-extrabold text-xl">{judul}</h3>
            {kategori && (
              <span className="badge badge-secondary badge-sm">{kategori}</span>
              // Atau ganti ke: <span className="badge badge-secondary badge-sm">{kategori}</span>
            )}
          </div>

          {deskripsi && (
            <p className="mt-2 text-sm text-base-content/70">{deskripsi}</p>
          )}

          {showButton && (
            <div className="mt-4">
              <SmartLink
                href={href}
                className="btn btn-primary btn-sm md:btn-md"
              >
                Selengkapnya
              </SmartLink>
            </div>
          )}
        </div>
      </div>
    );
  }

  // TILE
  return (
    <div
      id={id}
      className="card w-full max-w-sm bg-base-100 shadow-sm border border-base-200"
    >
      {/* Header tanggal – ikut tema */}
      <figure className="bg-primary w-full flex justify-center items-center py-12 rounded-t-lg">
        <span className="text-primary-content font-bold text-2xl sm:text-3xl">
          {formatTanggalTile(tanggal)}
        </span>
      </figure>

      <div className="card-body flex flex-col gap-3 sm:gap-4">
        <h2 className="card-title text-xl sm:text-2xl flex items-start gap-2">
          <span className="flex-1">{judul}</span>
          {kategori && (
            <span className="badge badge-secondary">{kategori}</span>
          )}
          {/* atau: <span className="badge badge-secondary">{kategori}</span> */}
        </h2>

        {deskripsi && (
          <p className="line-clamp-2 text-sm sm:text-base text-base-content/80">
            {deskripsi}
          </p>
        )}

        {showButton && (
          <div className="card-actions mt-auto">
            <SmartLink
              href={href}
              className="btn btn-primary btn-block btn-sm md:btn-md"
            >
              Selengkapnya
            </SmartLink>
          </div>
        )}
      </div>
    </div>
  );
}
