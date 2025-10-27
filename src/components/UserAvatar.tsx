import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserAvatar: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <div className="relative group">
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name || 'User'}
            className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-petti-blue"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-petti-blue/10 flex items-center justify-center text-petti-blue font-medium">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">
        {user.name || 'Usuario'}
      </span>
    </div>
  );
};

export default UserAvatar;
