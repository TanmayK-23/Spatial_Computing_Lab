import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import labLogo from "../assets/APP Lab Logo.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const goHome = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const goCircuits = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate("/", { state: { scrollToCircuits: true } });
  };

  const goAbout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate("/", { state: { scrollToAbout: true } });
  };

  return (
    <>
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

        {/* Desktop Navigation Links */}
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

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[60]"
          aria-label="Toggle Menu"
        >
          <span className={`bg-ink block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
          <span className={`bg-ink block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-ink block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Full-Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-canvas z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center gap-10 mt-16">
          <button onClick={goHome} className="text-4xl display-font font-light text-ink hover:opacity-70 transition-opacity">
            Home
          </button>
          <button onClick={goCircuits} className="text-4xl display-font font-light text-ink hover:opacity-70 transition-opacity">
            Circuits
          </button>
          <button onClick={goAbout} className="text-4xl display-font font-light text-ink hover:opacity-70 transition-opacity">
            About
          </button>
        </div>
      </div>
    </>
  );
}