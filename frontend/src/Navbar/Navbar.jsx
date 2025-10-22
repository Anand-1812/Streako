import { useState, useEffect, useContext } from "react";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { Context } from "../context/Context";

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, user, logoutUser } = useContext(Context);

  const links = [
    { name: "Home", path: "/home" },
    { name: "Signup", path: "/home/signup" },
    { name: "Dashboard", path: "/home/user/dashboard" },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (logoutUser) {
      logoutUser();
    }
    navigate("/home/login");
  };

  const handleActionClick = () => {
    if (isLoggedIn) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      navigate("/home/signup");
    }
  };

  const ActionButton = () => {
    const buttonText = isLoggedIn && user?.name ? user.name : "Get Started";
    const bgColor =
      isLoggedIn
        ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        : "bg-black text-white dark:bg-white dark:text-black";

    return (
      <button
        onClick={handleActionClick}
        className={`cursor-pointer px-4 py-2 rounded-xl font-semibold transition-colors duration-300 transform hover:scale-[1.02] ${bgColor}`}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 border-b
        ${scrolled
          ? "bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-700 shadow-md"
          : "bg-transparent border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

        <h1
          className="font-display text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-wide
          bg-clip-text cursor-pointer
          transition-transform duration-300 transform hover:scale-105"
        >
          Streako
        </h1>

        <div className="hidden md:flex gap-6 items-center text-lg relative">

          <ActionButton />

          {isProfileOpen && isLoggedIn && (
            <div className="absolute right-0 mt-36 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <ul className="flex flex-col">
                <li>
                  <button
                    onClick={() => {
                      navigate("/home/user/dashboard");
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200/30 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200 hover:bg-gray-300/40 dark:hover:bg-gray-600 transition-colors duration-300"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200/30 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200 hover:bg-gray-300/40 dark:hover:bg-gray-600 transition-colors duration-300"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md bg-gray-200/20 dark:bg-gray-700/30 hover:bg-gray-300/40 dark:hover:bg-gray-600 transition-colors duration-300"
            title="Toggle Menu"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && <MobileMenu links={links} closeMenu={() => setMenuOpen(false)} />}
    </nav>
  );
}

