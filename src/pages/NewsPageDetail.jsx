// src/pages/NewsDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { findNewsBySlug } from "../data/news.js";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const item = findNewsBySlug(slug);

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

  const tanggalID = new Date(item.tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="px-4 sm:px-8 lg:px-24 py-8">
      <article className="max-w-screen-md mx-auto">
        <Link to="/profil/berita" className="btn btn-sm mb-4">
          ← Kembali
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          {item.judul}
        </h1>
        <p className="text-sm opacity-70 mb-4">{tanggalID}</p>

        {item.img && (
          <img
            src={item.img}
            alt={item.judul}
            className="w-full rounded-lg mb-6 object-cover max-h-[420px]"
          />
        )}

        <div className="prose max-w-none">
          <p>{item.konten}</p>
        </div>
      </article>
    </main>
  );
}
