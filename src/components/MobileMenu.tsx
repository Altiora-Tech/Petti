import React from "react";
import { Link } from "react-router-dom";

interface Props {
  links: { label: string; href: string; icon?: React.ReactNode }[];
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu: React.FC<Props> = ({ links, isOpen, closeMenu }) => (
  <div
    className={`lg:hidden fixed top-16 left-0 right-0 bg-white dark:bg-petti-deep-blue shadow-lg rounded-b-xl transition-all duration-300 ${
      isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
    }`}
  >
    <nav className="flex flex-col py-4 space-y-2 px-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={closeMenu}
          className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-petti-light-blue/10 dark:hover:bg-petti-light-blue/20 transition-colors text-petti-deep-blue/80 dark:text-petti-base/80"
        >
          {link.label}
          {link.icon}
        </a>
      ))}
      <Link
        to="/login"
        onClick={closeMenu}
        className="block text-center py-3 mt-2 bg-petti-blue text-white rounded-lg font-medium hover:bg-petti-blue/90 transition-colors"
      >
        Iniciar sesión
      </Link>
    </nav>
  </div>
);

export default MobileMenu;
