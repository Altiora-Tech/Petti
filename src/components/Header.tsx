import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, Sun, Moon } from 'lucide-react';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="text-petti-deep-blue/80 dark:text-petti-base/80 hover:text-petti-blue dark:hover:text-white font-medium transition-colors">{children}</a>
);

const Dropdown: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button 
        type="button"
        name="button"
        aria-label="button"
        id="button"
        className="flex items-center gap-1 text-petti-deep-blue/80 dark:text-petti-base/80 hover:text-petti-blue dark:hover:text-white font-medium transition-colors focus:outline-none">
        {title} <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-petti-deep-blue/95 backdrop-blur-sm rounded-lg shadow-lg p-2 z-50">
          {children}
        </div>
      )}
    </div>
  );
};
const DropdownLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
    <a href={href} onClick={onClick} className="block w-full text-left px-4 py-2 text-petti-deep-blue dark:text-petti-base hover:bg-petti-base dark:hover:bg-petti-light-blue/10 rounded-md">{children}</a>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header id="header" className="sticky top-0 bg-petti-base/80 dark:bg-petti-deep-blue/80 backdrop-blur-lg z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="/pettilogo.png"
          name="Logo Petti"
          aria-label="Logo Petti"
          alt="Petti Logo"
          width={500}
          height={500}
          className="w-auto -mr-2 h-12 sm:h-16 object-contain"
        />
        <p className="text-lg sm:text-xl font-extrabold text-petti-blue dark:text-white leading-tight">
          Petti App
        </p>
      </div>

        <nav className="hidden lg:flex items-center gap-8">
          <NavLink href="#/">Inicio</NavLink>
          {/* <Dropdown title="Para Profesionales">
            <DropdownLink href="#/benefits">Beneficios</DropdownLink>
            <DropdownLink href="#/requirements">Requisitos</DropdownLink>
            <DropdownLink href="#/register">Registrarse</DropdownLink>
          </Dropdown>
          <Dropdown title="Recursos">
            <DropdownLink href="#/blog">Blog</DropdownLink>
            <DropdownLink href="#/aid">Primeros Auxilios</DropdownLink>
            <DropdownLink href="#/recommendations">Recomendaciones</DropdownLink>
          </Dropdown> */}
          <NavLink href="#/about">Sobre Nosotros</NavLink>
          <a href="#/petti-assistant" className="flex items-center gap-2 text-petti-deep-blue/80 dark:text-petti-base/80 hover:text-petti-blue dark:hover:text-white font-medium transition-colors">
            Asistente AI <Sparkles className="w-4 h-4 text-petti-accent"/>
          </a>

          <NavLink href="#/contact">Contacto</NavLink>
        </nav>
        <div className="flex items-center gap-4">
            <button
                type="button"
                name="button"
                id="button"
                onClick={toggleTheme}
                className="p-2 rounded-full text-petti-deep-blue dark:text-petti-base hover:bg-petti-light-blue/20 dark:hover:bg-petti-light-blue/10 transition"
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <a href="#/register" className="hidden sm:block bg-petti-blue text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-transform hover:scale-105">
                Únete
            </a>
            <button 
                type="button"
                name="button"
                id="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="lg:hidden p-2 text-petti-deep-blue dark:text-white" 
                aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
        </div>
      </div>
      {isMenuOpen && (
          <div className="lg:hidden bg-petti-base dark:bg-petti-deep-blue/95 pb-4 px-6 space-y-2" onClick={closeMenu}>
            <NavLink href="#/" onClick={closeMenu}>Inicio</NavLink>
            <NavLink href="#/benefits" onClick={closeMenu}>Para Profesionales</NavLink>
            <NavLink href="#/blog" onClick={closeMenu}>Blog</NavLink>
            <NavLink href="#/petti-assistant" onClick={closeMenu}>Asistente AI</NavLink>
            <NavLink href="#/contact" onClick={closeMenu}>Contacto</NavLink>
            <a href="#/register" onClick={closeMenu} className="block mt-4 text-center bg-petti-blue text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90">
                Únete
            </a>
          </div>
      )}
    </header>
  );
};

export default Header;