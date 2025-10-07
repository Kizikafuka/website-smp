import { Link } from "react-router-dom";

/**
 * items: [{ label: "Beranda", to: "/" }, { label: "Akademik", to: "/akademik/informasi" }, { label: "Ekstrakurikuler" }]
 * item terakhir otomatis dianggap aktif (tanpa link).
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  const last = items.length - 1;

  return (
    <nav className="mb-4 text-sm breadcrumbs text-base-content/70" aria-label="Breadcrumb">
      <ul>
        {items.map((it, i) =>
          i === last || !it.to ? (
            <li key={i} aria-current="page">
              <span className="font-medium text-base-content">{it.label}</span>
            </span></li>
          ) : (
            <li key={i}>
              <Link to={it.to} className="link link-hover">
                {it.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
