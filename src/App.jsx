// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import TeachersPage from "./pages/TeacherPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import NewsDetailPage from "./pages/NewsPageDetail.jsx";
import EksPage from "./pages/EksPage.jsx";
import InfoPage from "./pages/InfoPage.jsx";
import MaterialsTasksPage from "./pages/MaterialsTasksPage.jsx";
import VideosPage from "./pages/VideosPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SpmbPage from "./pages/Spmb.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Profil */}
            <Route path="/profil/tentang" element={<AboutUs />} />
            <Route path="/profil/guru-staff" element={<TeachersPage />} />
            <Route path="/profil/galeri" element={<GalleryPage />} />
            <Route path="/profil/berita" element={<NewsPage />} />
            <Route path="/profil/berita/:slug" element={<NewsDetailPage />} />

            {/* Akademik */}
            <Route path="/akademik/ekstrakurikuler" element={<EksPage />} />
            <Route path="/akademik/informasi" element={<InfoPage />} />
            <Route
              path="/akademik/materi-tugas"
              element={<MaterialsTasksPage />}
            />
            <Route path="/akademik/video" element={<VideosPage />} />

            {/* PPDB (tombol sendiri) */}
            <Route path="/spmb" element={<SpmbPage />} />
            {/* Alias URL pendek */}
            <Route
              path="/ppdb"
              element={<Navigate to="/akademik/ppdb" replace />}
            />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />

            {/* 404 */}
            <Route
              path="*"
              element={<div className="p-8">Halaman tidak ditemukan</div>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
