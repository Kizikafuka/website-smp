import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import LandingPage from './pages/landing-page.jsx';
import Footer from "./components/footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      <LandingPage />
      </main>
      <Footer />
    </div>
  );
}

