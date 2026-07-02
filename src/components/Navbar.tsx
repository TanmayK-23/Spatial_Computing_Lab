import React from "react";
import { useNavigate } from "react-router-dom";
import labLogo from "../assets/APP Lab Logo.jpeg";

export default function Navbar() {
  const navigate = useNavigate();

  const goHome = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const goCircuits = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/", { state: { scrollToCircuits: true } });
  };

  const goAbout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/", { state: { scrollToAbout: true } });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[64px] bg-canvas/90 backdrop-blur-md z-50 flex items-center justify-between px-6 border-b border-hairline transition-all duration-300">
      {/* Wordmark / Logo */}
      <div className="flex items-center gap-3">
        <button onClick={goHome} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          <img
            src={labLogo}
            alt="Spatial Computing Lab"
            className="h-8 w-8 object-cover rounded-full mix-blend-multiply"
          />
          <span className="font-medium text-ink tracking-tight">Spatial Computing Lab</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <button onClick={goHome} className="text-[15px] font-medium text-ink hover:text-muted transition-colors">
          Home
        </button>
        <button onClick={goCircuits} className="text-[15px] font-medium text-ink hover:text-muted transition-colors">
          Circuits
        </button>
        <button onClick={goAbout} className="text-[15px] font-medium text-ink hover:text-muted transition-colors">
          About
        </button>
      </div>

    </nav>
  );
}