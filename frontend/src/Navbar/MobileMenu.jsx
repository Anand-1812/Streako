import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function MobileMenu({
  links,
  closeMenu,
  isLoggedIn,
  user,
  onLogout,
}) {
  const navLinkClass =
    "block py-3 text-sm font-semibold transition-colors duration-200";

  return (
    <div className="border-t border-stone-200/70 bg-white/95 shadow-[0_20px_50px_-35px_rgba(32,22,14,0.35)] backdrop-blur md:hidden dark:border-white/10 dark:bg-stone-950/95">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="divide-y divide-stone-200/70 dark:divide-white/10">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/home" || link.path === "/about"}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClass} text-stone-950 dark:text-white`
                  : `${navLinkClass} text-stone-600 dark:text-stone-300`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <div className="rounded-2xl border border-stone-200/70 bg-stone-50/90 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                  Signed in
                </p>
                <p className="mt-2 text-base font-semibold text-stone-950 dark:text-white">
                  {user?.name || "Your account"}
                </p>
              </div>
              <NavLink
                to="/app/habits"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-stone-950"
              >
                Open habits
              </NavLink>
              <button
                onClick={onLogout}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 dark:border-red-400/20 dark:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-full border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 dark:border-white/10 dark:text-stone-200"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-stone-950"
              >
                Get started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
