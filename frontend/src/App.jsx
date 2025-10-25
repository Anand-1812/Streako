import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideFooterRoutes = ["/home/user", "/home/login", "/home/signup"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;

