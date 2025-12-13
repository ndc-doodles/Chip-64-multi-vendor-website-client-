import { useState } from "react";
import Navbar from "@/Components/Navbar/Navbar"; 

export default function HeaderLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border/30 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <Navbar isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
      </nav>
    </header>
  );
}
