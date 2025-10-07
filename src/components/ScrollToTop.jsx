import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll halaman ke atas setiap kali rute berubah.
 * Aman untuk SSR dan tidak scroll ulang jika masih di path yang sama.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safety
    // Pastikan hanya scroll saat pindah rute baru
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [pathname]);

  return null;
}
