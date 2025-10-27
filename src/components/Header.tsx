import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, Sun, Moon, LogIn, User, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void; className?: string }> = ({ href, children, onClick, className }) => (
  <a
    href={href}
    onClick={onClick}
    className={`block text-petti-deep-blue/80 dark:text-petti-base/80 hover:text-petti-blue dark:hover:text-white font-medium transition-colors duration-300 ${className}`}
  >
    {children}
  </a>
);

const Dropdown: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Detecta si el usuario está en móvil
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggleDropdown = () => {
    if (isMobile) setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-petti-deep-blue/80 dark:text-petti-base/80 hover:text-petti-blue dark:hover:text-white font-medium transition-colors focus:outline-none"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute lg:left-1/2 lg:-translate-x-1/2 mt-2 w-56 bg-white dark:bg-petti-deep-blue/95 backdrop-blur-sm rounded-lg shadow-lg p-2 z-50 transition-all duration-300 origin-top
          ${isOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}
      >
        {children}
      </div>
    </div>
  );
};

const DropdownLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({
  href,
  children,
  onClick,
}) => (
  <a
    href={href}
    onClick={onClick}
    className="block w-full text-left px-4 py-2 text-petti-deep-blue dark:text-petti-base hover:bg-petti-base/60 dark:hover:bg-petti-light-blue/10 rounded-md transition-colors"
  >
    {children}
  </a>
);

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.menu-button')) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 bg-petti-base/95 dark:bg-petti-deep-blue/95 backdrop-blur-lg z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img
              src="/pettilogo.png"
              alt="Petti Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <p className="ml-2 text-base sm:text-lg md:text-xl font-extrabold text-petti-blue dark:text-white leading-tight">PettiWay</p>
          </Link>
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          <NavLink href="#/">Inicio</NavLink>

          {/* <Dropdown title="Profesionales">
            <DropdownLink href="#/benefits">Beneficios</DropdownLink>
            <DropdownLink href="#/requirements">Requisitos</DropdownLink>
            <DropdownLink href="#/register">Registrarse</DropdownLink>
          </Dropdown>

          <Dropdown title="Recursos">
            <DropdownLink href="#/blog">Blog</DropdownLink>
            <DropdownLink href="#/aid">Primeros Auxilios</DropdownLink>
            <DropdownLink href="#/recommendations">Recomendaciones</DropdownLink>
          </Dropdown> */}

          <NavLink href="#/about">Nosotros</NavLink>
          <a
            href="#/petti-assistant"
            className="flex items-center gap-2 text-petti-deep-blue/80 dark:text-petti-base/80 hover:text-petti-blue dark:hover:text-white font-medium transition-colors"
          >
            Asistente AI <Sparkles className="w-4 h-4 text-petti-accent" />
          </a>

          <NavLink href="#/contact">Contacto</NavLink>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-petti-light-blue/20 dark:hover:bg-petti-light-blue/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-petti-accent" />
            ) : (
              <Moon className="w-5 h-5 text-petti-slider-dark" />
            )}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-button text-petti-deep-blue dark:text-petti-base hover:text-petti-blue dark:hover:text-white focus:outline-none p-2"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* BOTONES */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-petti-light-blue/20 dark:hover:bg-petti-light-blue/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-petti-accent" />
            ) : (
              <Moon className="w-5 h-5 text-petti-slider-dark" />
            )}
          </button>
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-petti-light-blue/20 dark:hover:bg-petti-light-blue/10 transition-colors"
                aria-label="Perfil de usuario"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'Usuario'}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-petti-blue/10 dark:bg-petti-light-blue/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-petti-blue dark:text-petti-light-blue" />
                  </div>
                )}
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-petti-deep-blue/95 backdrop-blur-sm rounded-lg shadow-lg p-2 z-50">
                  <div className="px-4 py-3 border-b border-petti-light-blue/20 dark:border-petti-light-blue/10">
                    <p className="text-sm font-medium text-petti-deep-blue dark:text-white truncate">
                      {user?.name || 'Usuario'}
                    </p>
                    <p className="text-xs text-petti-deep-blue/60 dark:text-petti-base/60 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <DropdownLink href="#/profile">Mi perfil</DropdownLink>
                    <DropdownLink href="#/my-ads">Mis anuncios</DropdownLink>
                    <DropdownLink href="#/settings">Configuración</DropdownLink>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-petti-blue hover:bg-petti-blue/10 dark:hover:bg-petti-light-blue/10 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Iniciar sesión
            </Link>
          )}
          
          {/* <button 
            className="flex items-center gap-2 bg-petti-blue hover:bg-petti-blue/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            aria-label="Publicar anuncio"
          >
            <span className="hidden sm:inline">Publicar anuncio</span>
            <Plus className="w-5 h-5" />
          </button> */}
          
          {/* Botón de menú móvil */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 transition-colors"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        role="presentation"
      >
        <div 
          className={`mobile-menu-container fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white dark:bg-petti-deep-blue shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full overflow-y-auto overscroll-contain">
            {/* Close button for mobile */}
            <div className="flex justify-end p-2 lg:hidden">
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* User Profile Section */}
            <div className="px-4 pt-2 pb-4 border-b border-petti-light-blue/20 dark:border-petti-light-blue/10">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={user?.avatar || '/default-avatar.png'}
                      onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
                      alt={user?.name || 'Usuario'}
                      className="w-12 h-12 rounded-full object-cover border-2 border-petti-blue/20"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-petti-deep-blue" aria-hidden="true"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-petti-deep-blue dark:text-white truncate">
                      {user?.name || 'Usuario'}
                    </p>
                    <p className="text-sm text-petti-deep-blue/60 dark:text-petti-base/60 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full text-center py-3 px-4 rounded-lg font-medium text-petti-blue 
                      hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/10 
                      active:bg-petti-light-blue/20 transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-petti-blue/50"
                    onClick={closeMenu}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-center py-3 px-4 bg-petti-blue text-white rounded-lg font-medium 
                      hover:bg-petti-blue/90 active:bg-petti-blue/800 
                      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-petti-blue/50"
                    onClick={closeMenu}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
            <nav className="flex-1 px-4 py-2 space-y-3">
              <NavLink href="#/" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 transition-colors">
                Inicio
              </NavLink>
              <NavLink href="#/about" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 transition-colors">
                Nosotros
              </NavLink>
              <NavLink 
                href="#/petti-assistant" 
                onClick={closeMenu}
                className="flex items-center py-2.5 px-3 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 transition-colors"
              >
                <span className="flex items-center gap-2">
                  Asistente AI <Sparkles className="w-4 h-4 text-petti-accent flex-shrink-0" />
                </span>
              </NavLink>
              <NavLink href="#/contact" onClick={closeMenu} className="block py-2.5 px-3 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 transition-colors">
                Contacto
              </NavLink>

              {!isAuthenticated && (
                <div className="pt-2">
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="block w-full text-center bg-petti-blue text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    Regístrate gratis
                  </Link>
                </div>
              )}
            </nav>
            
            {isAuthenticated && (
              <div className="p-4 border-t border-petti-light-blue/20 mt-auto">
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;