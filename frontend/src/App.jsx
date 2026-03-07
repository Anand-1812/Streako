import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  const isWorkspaceRoute = location.pathname.startsWith("/app");

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip text-stone-900 dark:text-stone-100">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="flex-1 w-full pt-24">
        <Outlet />
      </main>

      {!isWorkspaceRoute && <Footer />}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2600,
          style: {
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(24, 18, 13, 0.94)",
            color: "#fff7ef",
            boxShadow: "0 20px 60px rgba(23, 17, 11, 0.28)",
          },
        }}
      />
    </div>
  );
}

export default App;
