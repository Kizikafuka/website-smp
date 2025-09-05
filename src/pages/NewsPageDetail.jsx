// src/pages/NewsDetailPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { news, findNewsBySlug } from "../data/news.js";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page"); // preserve user's page on back

  const item = findNewsBySlug(slug);

  // Build back link that preserves ?page
  const backTo = useMemo(() => {
    const base = "/profil/berita";
    return pageParam ? `${base}?page=${encodeURIComponent(pageParam)}` : base;
  }, [pageParam]);

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

  // Date formatting with fallback
  let tanggalLabel = "";
  let tanggalISO = "";
  try {
    const d = new Date(item.tanggal);
    tanggalISO = d.toISOString();
    tanggalLabel = d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    tanggalLabel = item.tanggal || "";
    tanggalISO = item.tanggal || "";
  }

  // Title in tab
  useEffect(() => {
    const prev = document.title;
    if (item?.judul) document.title = `${item.judul} — Berita`;
    return () => {
      document.title = prev;
    };
  }, [item?.judul]);

  // Prev/Next (optional nicety)
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

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <article className="max-w-screen-md mx-auto">
        <header className="mb-4">
          <Link to={backTo} className="btn btn-sm mb-4">
            ← Kembali
          </Link>

          <h1
            id="page-title"
            className="text-3xl sm:text-4xl font-extrabold mb-2"
          >
            {item.judul}
          </h1>

          {tanggalLabel && (
            <p className="text-sm opacity-70">
              <time dateTime={tanggalISO}>{tanggalLabel}</time>
            </p>
          )}
        </header>

        {item.img && (
          <figure className="relative w-full aspect-[16/9] sm:aspect-[3/2] rounded-lg overflow-hidden mb-6 border border-base-200">
            {/* skeleton placeholder */}
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
          </figure>
        )}

        <div className="prose max-w-none">
          <p>{item.konten}</p>
        </div>

        <footer className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-2">
            {prev && (
              <Link
                to={`/profil/berita/${prev.slug}${
                  pageParam ? `?page=${pageParam}` : ""
                }`}
                className="btn btn-outline btn-sm"
                title={prev.judul}
              >
                ← Sebelumnya
              </Link>
            )}
            {next && (
              <Link
                to={`/profil/berita/${next.slug}${
                  pageParam ? `?page=${pageParam}` : ""
                }`}
                className="btn btn-outline btn-sm"
                title={next.judul}
              >
                Berikutnya →
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </main>
  );
}
