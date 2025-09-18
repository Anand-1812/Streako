import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [darkMode, setDarkMode] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Profile", path: "/profile" },
  ];

  const navLinkClass =
    "px-4 py-2 rounded-xl font-medium transition-colors duration-200";

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center h-16">
        <h1 className="text-gray-900 dark:text-gray-100 text-2xl md:text-3xl font-display tracking-wide">
          Streako
        </h1>

        {/* Desktop links + dark toggle */}
        <div className="hidden md:flex gap-4 items-center text-lg">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClass} bg-blue-600 text-white`
                  : `${navLinkClass} text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer p-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ease-in"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-gray-800 dark:text-gray-100" />
            ) : (
              <Menu className="w-7 h-7 text-gray-800 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <MobileMenu
          links={links}
          closeMenu={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}

