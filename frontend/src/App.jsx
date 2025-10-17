import { useState } from "react"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex-1">
        <Outlet />
        <Footer />
      </div>

    </div>
  )
}

export default App
