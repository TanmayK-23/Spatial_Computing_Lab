import { NavLink, useNavigate, useLocation } from "react-router-dom";
import labLogo from "../assets/APP Lab Logo.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const goCircuits = () => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("circuits")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <button
        onClick={goHome}
        className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white"
      >
        <img
          src={labLogo}
          alt="Spatial Computing Lab Logo"
          className="h-9 w-9 object-contain"
        />
        <span className="hidden sm:inline">SPATIAL COMPUTING LAB</span>
        <span className="sm:hidden">SCL</span>
      </button>

        <div className="flex items-center gap-6">
          <button
            onClick={goHome}
            className={
              location.pathname === "/"
                ? "text-blue-400 font-medium"
                : "text-slate-300 hover:text-white transition"
            }
          >
            Home
          </button>

          <button
            onClick={goCircuits}
            className="text-slate-300 hover:text-white transition"
          >
            Circuits
          </button>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium"
                : "text-slate-300 hover:text-white transition"
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}