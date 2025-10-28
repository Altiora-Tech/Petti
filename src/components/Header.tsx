// Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { label: "Inicio", href: "#/" },
  { label: "Nosotros", href: "#/about" },
  { label: "Asistente AI", href: "#/petti-assistant", icon: <Sparkles className="w-4 h-4 text-petti-accent" /> },
  { label: "Contacto", href: "#/contact" },
];

const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-petti-base/95 dark:bg-petti-deep-blue/95 backdrop-blur-lg z-[1000] shadow-sm h-16 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/pettilogo.png" alt="Petti Logo" className="w-10 h-10 object-contain" />
          <span className="text-lg font-extrabold text-petti-blue dark:text-white">PettiWay</span>
        </Link>

        {/* NAV - DESKTOP */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 text-petti-deep-blue/80 dark:text-petti-base/80 hover:text-petti-blue dark:hover:text-white font-medium transition-colors"
            >
              {link.label}
              {link.icon}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserMenu user={user} isAuthenticated={isAuthenticated} />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu
        links={NAV_LINKS}
        isOpen={isMenuOpen}
        closeMenu={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Header;