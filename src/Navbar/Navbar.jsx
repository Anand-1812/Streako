import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar({ menuOpen, setMenuOpen }) {
  const navLinkClass =
    "px-4 py-2 rounded-xl font-medium transition-colors duration-200";

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-gray-900 text-2xl md:text-3xl font-display tracking-wide">
            Streako
          </h1>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClass} bg-blue-600 text-white`
                  : `${navLinkClass} text-gray-700 hover:bg-blue-100`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClass} bg-blue-600 text-white`
                  : `${navLinkClass} text-gray-700 hover:bg-blue-100`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClass} bg-blue-600 text-white`
                  : `${navLinkClass} text-gray-700 hover:bg-blue-100`
              }
            >
              Profile
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-7 h-7 text-gray-800" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

