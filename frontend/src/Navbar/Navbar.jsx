import MobileMenu from "./MobileMenu";
import { Context } from "../context/context.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Menu, Moon, Sun, X } from "lucide-react";

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("streako-theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { isLoggedIn, user, logoutUser } = useContext(Context);

  const links = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    ...(isLoggedIn ? [{ name: "Habits", path: "/app/habits" }] : []),
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
    window.localStorage.setItem("streako-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isProfileOpen) return undefined;

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  const handleLogout = async () => {
    if (!logoutUser) return;

    await logoutUser();
    setIsProfileOpen(false);
    setMenuOpen(false);
    navigate("/home");
  };

  const navLinkClass = ({ isActive }) =>
    `border-b-2 px-1 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? "border-orange-500 text-stone-950 dark:text-white"
        : "border-transparent text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white"
    }`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-stone-200/70 bg-white/85 shadow-[0_20px_50px_-35px_rgba(32,22,14,0.35)] backdrop-blur dark:border-white/10 dark:bg-stone-950/85"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <button onClick={() => navigate("/home")} className="flex items-center gap-3 text-left">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-stone-950 dark:text-white">
              Streako
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Daily consistency
            </p>
          </div>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/home" || link.path === "/about"}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white/10"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((open) => !open)}
                  className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white/80 px-3.5 py-2 text-sm font-semibold text-stone-800 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {(user?.name || "S").slice(0, 1).toUpperCase()}
                  </span>
                  <span className="max-w-24 truncate">{user?.name || "Account"}</span>
                  <ChevronDown className="h-4 w-4 text-stone-500 dark:text-stone-300" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 rounded-[1.5rem] border border-stone-200 bg-white/95 p-2 shadow-[0_24px_60px_-35px_rgba(32,22,14,0.45)] dark:border-white/10 dark:bg-stone-950/95">
                    <button
                      onClick={() => {
                        navigate("/app/habits");
                        setIsProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-white/5"
                    >
                      Habits
                    </button>
                    <button
                      onClick={() => {
                        navigate("/app/insights");
                        setIsProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-white/5"
                    >
                      <LayoutDashboard className="h-4 w-4 text-emerald-500" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-semibold text-stone-700 transition hover:text-stone-950 dark:text-stone-200 dark:hover:text-white"
                >
                  Log in
                </NavLink>
                <button
                  onClick={() => navigate("/signup")}
                  className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white/10"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white/10"
            title="Toggle menu"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <MobileMenu
          links={links}
          closeMenu={() => setMenuOpen(false)}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </nav>
  );
}
