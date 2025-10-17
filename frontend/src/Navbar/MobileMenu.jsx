import { NavLink } from "react-router-dom";

export default function MobileMenu({ links, closeMenu }) {
  const navLinkClass =
    "text-center px-4 py-2 rounded-xl font-medium transition-colors duration-200";

  return (
    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md transition-colors">
      <div className="flex flex-col px-6 py-4 gap-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${navLinkClass} bg-blue-600 text-white`
                : `${navLinkClass} text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

