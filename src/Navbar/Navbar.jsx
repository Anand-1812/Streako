import { Menu } from "lucide-react"

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav className="fixed top-0 w-full z-40 bg-white shadow text-gray-900">
      <div className="max-w-4xl mx-auto p-2">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-gray-900 text-3xl font-display">Streako</h1>

          <button type="button" className="cursor-pointer md:hidden">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
