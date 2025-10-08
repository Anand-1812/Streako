import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";


export default function Navbar({ menuOpen, setMenuOpen }) {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // take the user to either signup or login
  const handleProfileClick = () => {
    const hasSignedup = localStorage.getItem("hasSignedup");

    if (hasSignedup) {
      navigate('/login')
    } else navigate('/signup')

  }
  const links = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
  ];

  const navLinkClass =
    "px-4 py-2 rounded-xl font-medium transition-all duration-300 ease-in-out transform hover:scale-105";

  // Dark mode toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
      else root.classList.remove("dark");
  }, [darkMode]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
          className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-wide
          bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 cursor-pointer
          transition-transform duration-300 transform hover:scale-105"
        >
          Streako
        </h1>

        {/* Desktop links + dark mode */}
        <div className="hidden md:flex gap-6 items-center text-lg">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClass} bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md`
                  : `${navLinkClass} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={handleProfileClick}
            className={`${navLinkClass} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
          >
            Profile
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200/30 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200 hover:bg-gray-300/40 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile section */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200/30 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200 hover:bg-gray-300/40 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md bg-gray-200/20 dark:bg-gray-700/30 hover:bg-gray-300/40 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            ) : (
                <Menu className="w-7 h-7 text-gray-700 dark:text-gray-200" />
              )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && <MobileMenu links={links} closeMenu={() => setMenuOpen(false)} />}
    </nav>
  );
}

