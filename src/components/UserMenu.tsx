import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React, { useState } from "react";

interface Props {
  user: any;
  isAuthenticated: boolean;
}

const UserMenu: React.FC<Props> = ({ user, isAuthenticated }) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-petti-blue hover:bg-petti-blue/10 transition-colors"
      >
        <LogIn className="w-5 h-5" />
        Iniciar sesión
      </Link>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt={user?.name || "Usuario"}
          className="w-9 h-9 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-petti-deep-blue/95 rounded-lg shadow-lg p-2">
          <p className="px-3 py-2 text-sm text-petti-deep-blue dark:text-white font-medium">{user?.name}</p>
          <hr className="border-petti-light-blue/10" />
          <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-petti-blue/10">Perfil</Link>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
