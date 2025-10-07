// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

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
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./pages/LoginPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profil/tentang" element={<AboutUs />} />
            <Route path="/profil/guru-staff" element={<TeachersPage />} />
            <Route path="/profil/galeri" element={<GalleryPage />} />
            <Route path="/profil/berita" element={<NewsPage />} />
            <Route path="/profil/berita/:slug" element={<NewsDetailPage />} />
            <Route path="/akademik/ekstrakurikuler" element={<EksPage />} />
            <Route path="/akademik/informasi" element={<InfoPage />} />
            <Route
              path="/akademik/materi-tugas"
              element={<MaterialsTasksPage />}
            />
            <Route path="/akademik/video" element={<VideosPage />} />
            <Route path="/login" element={<LoginPage />} />
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
