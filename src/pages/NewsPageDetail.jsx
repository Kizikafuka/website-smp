// src/pages/NewsDetailPage.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { news, findNewsBySlug } from "../data/news.js";

function safeDateLabel(isoLike) {
  try {
    const d = new Date(isoLike);
    return {
      iso: d.toISOString(),
      label: d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  } catch {
    return { iso: isoLike || "", label: isoLike || "" };
  }
}

function estimateReadTime(text = "") {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  const wpm = 200; // rata-rata
  return Math.max(1, Math.round(words / wpm));
}

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = searchParams.get("page"); // preserve user's page on back

  const item = findNewsBySlug(slug);

  // build back link that preserves ?page
  const backTo = useMemo(() => {
    const base = "/profil/berita";
    return pageParam ? `${base}?page=${encodeURIComponent(pageParam)}` : base;
  }, [pageParam]);

  // not found
  if (!item) {
    return (
      <main className="px-4 sm:px-8 lg:px-24 py-12">
        <div className="max-w-screen-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Berita tidak ditemukan</h1>
          <Link to="/profil/berita" className="btn">
            Kembali ke daftar berita
          </Link>
        </div>
      </main>
    );
  }

  const { iso: tanggalISO, label: tanggalLabel } = safeDateLabel(item.tanggal);
  const readMin = estimateReadTime(item.konten);

  // Title in tab
  useEffect(() => {
    const prev = document.title;
    if (item?.judul) document.title = `${item.judul} — Berita`;
    return () => {
      document.title = prev;
    };
  }, [item?.judul]);

  // Prev/Next (sorted by date desc)
  const { prev, next } = useMemo(() => {
    const sorted = [...news].sort(
      (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
    );
    const idx = sorted.findIndex((n) => n.slug === slug);
    return {
      prev: idx > 0 ? sorted[idx - 1] : null,
      next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
    };
  }, [slug]);

  // image loaded state for fade-in
  const [imgLoaded, setImgLoaded] = useState(false);

  // share handler
  const onShare = useCallback(async () => {
    const url = window.location.href;
    const title = item?.judul || "Berita";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        alert("Tautan disalin ke clipboard ✨");
      } else {
        prompt("Salin tautan berikut:", url);
      }
    } catch {
      // user canceled or share failed — no-op
    }
  }, [item?.judul]);

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <article className="max-w-screen-md mx-auto">
        {/* Breadcrumb + Back */}
        <nav
          className="mb-4 flex items-center gap-2 text-sm text-base-content/70"
          aria-label="Breadcrumb"
        >
          <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
            ←
          </button>
          <Link to="/" className="link link-hover">
            Beranda
          </Link>
          <span>/</span>
          <Link to={backTo} className="link link-hover">
            Berita
          </Link>
          <span>/</span>
          <span className="truncate max-w-[50%]">{item.judul}</span>
        </nav>

        {/* Header */}
        <header className="mb-4">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl font-extrabold text-primary mb-2"
          >
            {item.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70">
            {item.kategori && (
              <span className="badge badge-ghost">{item.kategori}</span>
            )}
            {Array.isArray(item.tags) &&
              item.tags.slice(0, 3).map((t) => (
                <span key={t} className="badge badge-outline">
                  #{t}
                </span>
              ))}
            {tanggalLabel && (
              <span className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                <time dateTime={tanggalISO}>{tanggalLabel}</time>
              </span>
            )}
            <span>•</span>
            <span>{readMin} menit baca</span>
          </div>
        </header>

        {/* Hero Image */}
        {item.img && (
          <figure className="relative w-full aspect-[16/9] sm:aspect-[3/2] rounded-lg overflow-hidden mb-6 border border-base-200">
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-base-200" />
            )}
            <img
              src={item.img}
              alt={item.judul}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
            />
            {item.keteranganGambar && (
              <figcaption className="absolute bottom-0 left-0 right-0 bg-base-100/80 backdrop-blur px-3 py-2 text-xs text-base-content/80">
                {item.keteranganGambar}
              </figcaption>
            )}
          </figure>
        )}

        {/* Content */}
        <div className="prose max-w-none">
          {/* Jika konten sudah berupa HTML, tinggal render pakai dangerouslySetInnerHTML */}
          {/* <div dangerouslySetInnerHTML={{ __html: item.konten_html }} /> */}
          <p>{item.konten}</p>
        </div>

        {/* Footer actions */}
        <footer className="mt-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(item.tags) &&
                item.tags.map((t) => (
                  <span key={t} className="badge badge-outline">
                    #{t}
                  </span>
                ))}
            </div>
          </div>

          {/* Prev / Next — kiri kanan tetap */}
          {(prev || next) && (
            <nav
              className="mt-6 flex justify-between items-center"
              aria-label="Navigasi artikel"
            >
              <div className="flex-1">
                {prev && (
                  <Link
                    to={`/profil/berita/${prev.slug}${
                      pageParam ? `?page=${pageParam}` : ""
                    }`}
                    className="btn btn-ghost btn-md text-left"
                    title={prev.judul}
                  >
                    ← Sebelumnya
                  </Link>
                )}
              </div>

              <div className="flex-1 text-right">
                {next && (
                  <Link
                    to={`/profil/berita/${next.slug}${
                      pageParam ? `?page=${pageParam}` : ""
                    }`}
                    className="btn btn-ghost btn-md text-right"
                    title={next.judul}
                  >
                    Berikutnya →
                  </Link>
                )}
              </div>
            </nav>
          )}
        </footer>
      </article>
    </main>
  );
}
