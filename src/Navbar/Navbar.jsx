import { Menu } from "lucide-react"
import { NavLink } from "react-router-dom"

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-gray-900 text-2xl md:text-3xl font-display tracking-wide">
            Streako
          </h1>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
              }
            >
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-blue-500">
              About
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
