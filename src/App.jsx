import { useState } from "react"
import Navbar from "./Navbar/Navbar"
import Home from "./Home/Home"

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex-1">
        <Home />
      </div>
    </div>
  )
}

export default App
