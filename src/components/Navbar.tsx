import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-700">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Circuit Lab
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium"
                : "text-slate-300 hover:text-white transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/circuits"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium"
                : "text-slate-300 hover:text-white transition"
            }
          >
            Circuits
          </NavLink>

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