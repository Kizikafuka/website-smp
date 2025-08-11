import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import LandingPage from './pages/landing-page.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <LandingPage />
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-24 py-6">
      </main>
    </div>
  );
}

