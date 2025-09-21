import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Profile", path: "/profile" },
  ];

  const navLinkClass =
    "px-4 py-2 rounded-xl font-medium transition-all duration-200 ease-in-out";

  // dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  // scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 border-b
      ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-700 shadow-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Brand */}
        <h1
          className="text-2xl md:text-4xl font-display tracking-wide text-gray-50 dark:text-gray-100
            bg-clip-text dark:text-transparent bg-gradient-to-r dark:from-blue-500 dark:to-indigo-500
            transition-colors duration-300"
        >
          Streako
        </h1>

        {/* Desktop links + dark mode */}
        <div className="hidden md:flex gap-4 items-center text-lg">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClass} bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm`
                  : `${navLinkClass} text-gray-200 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md text-gray-200 dark:text-gray-100
              hover:bg-white/10 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile section */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200/30 dark:bg-gray-700/40
              text-gray-200 dark:text-gray-100 hover:bg-gray-300/40 dark:hover:bg-gray-600
              transition-colors duration-200"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-200/30 dark:hover:bg-gray-700
              transition-colors duration-200"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-gray-200 dark:text-gray-100" />
            ) : (
              <Menu className="w-7 h-7 text-gray-200 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <MobileMenu links={links} closeMenu={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}

