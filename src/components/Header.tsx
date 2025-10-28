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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* LOGO - Mobile & Desktop */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img 
            src="/pettilogo.png" 
            alt="Petti Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain" 
          />
          <span className="text-base sm:text-lg font-extrabold text-petti-blue dark:text-white whitespace-nowrap">
            PettiWay
          </span>
        </Link>

        {/* NAV - DESKTOP */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-6 ml-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 
                hover:text-petti-blue dark:hover:text-white hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/10 
                transition-colors duration-200 flex items-center gap-1.5"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden lg:block">
            <UserMenu user={user} isAuthenticated={isAuthenticated} />
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-petti-blue/50"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
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