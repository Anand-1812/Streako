import { useState } from "react"
import Navbar from "./Navbar/Navbar"
import Home from "./Home/Home"
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const showFooter = location.pathname === "/home";

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex-1">
        <Outlet />
        { showFooter && <Footer /> }
      </div>

    </div>
  )
}

export default App
