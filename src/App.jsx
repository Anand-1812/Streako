import { useState } from "react"
import Navbar from "./Navbar/Navbar"

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  )
}

export default App
