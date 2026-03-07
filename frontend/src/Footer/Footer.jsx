import { Github, ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 w-full border-t border-stone-200/70 bg-white/40 transition-all duration-300 dark:border-white/10 dark:bg-stone-950/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-stone-950 dark:text-white">
            Streako
          </p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            © {year} Streako. Designed to keep habit tracking readable and consistent.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-stone-600 dark:text-stone-300">
          <NavLink to="/home" className="transition hover:text-stone-950 dark:hover:text-white">
            Home
          </NavLink>
          <NavLink to="/about" className="transition hover:text-stone-950 dark:hover:text-white">
            About
          </NavLink>
          <NavLink
            to="/signup"
            className="transition hover:text-stone-950 dark:hover:text-white"
          >
            Get started
          </NavLink>
          <a
            href="https://github.com/anand-1812"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-stone-950 dark:hover:text-white"
          >
            <Github className="h-4 w-4" />
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
