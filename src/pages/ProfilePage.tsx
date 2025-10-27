import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-petti-text-light dark:text-petti-text-dark">Por favor inicia sesión</h2>
          <Link to="/login" className="text-petti-blue hover:bg-petti-blue/90">
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  // Add optional bio to the user object if it doesn't exist
  const userWithBio = {
    ...user,
    bio: (user as any).bio || ''
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-petti-deep-blue/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-petti-text-light dark:text-petti-light-blue">
            Perfil de Usuario
          </h1>
          <p className="text-petti-text-light/80 dark:text-petti-text-dark/80 mt-1">
            Administra la información de tu perfil y preferencias
          </p>
        </div>
        
        <div className="card">
        {/* Profile Header */}
        <div className="bg-petti-blue dark:bg-petti-deep-blue p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white p-1 mb-4 md:mb-0 md:mr-6">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-white">{user.email}</p>
              <div className="mt-2">
                <span className="inline-block bg-petti-light-blue/20 text-white text-sm px-3 py-1 rounded-full">
                  {user.role || 'Usuario'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-petti-deep-blue/40">
          <nav className="flex overflow-x-auto px-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'border-b-2 border-petti-blue text-petti-blue dark:text-petti-light-blue dark:border-petti-light-blue font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-petti-blue dark:hover:text-petti-light-blue hover:border-gray-300 dark:hover:border-petti-light-blue/30'
              }`}
            >
              Perfil
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'settings'
                  ? 'border-b-2 border-petti-blue text-petti-blue dark:text-petti-light-blue dark:border-petti-light-blue font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-petti-blue dark:hover:text-petti-light-blue hover:border-gray-300 dark:hover:border-petti-light-blue/30'
              }`}
            >
              Configuración
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Información del Perfil</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label dark:text-petti-light-blue">Nombre completo</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{user.name}</p>
                </div>
                
                <div className="form-group">
                  <label className="form-label dark:text-petti-light-blue">Correo electrónico</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{user.email}</p>
                </div>
                
                <div className="form-group">
                  <label className="form-label dark:text-petti-light-blue">Rol</label>
                  <p className="mt-1 text-gray-900 dark:text-white capitalize">
                    {user.role?.toLowerCase() || 'usuario'}
                  </p>
                </div>
                
                <div className="form-group">
                  <label className="form-label dark:text-petti-light-blue">Miembro desde</label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Acerca de mí</h3>
                <div className="form-group">
                  <label className="form-label dark:text-petti-light-blue">Biografía</label>
                  <div className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-petti-deep-blue/50 p-4 rounded-lg">
                    {userWithBio.bio || 'No hay información adicional proporcionada.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Configuración de la Cuenta</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configuración avanzada de tu cuenta disponible en la página de configuración principal.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Configuración avanzada</h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <p>Para una experiencia de personalización completa, visita la página de configuración principal.</p>
                    </div>
                    <div className="mt-4">
                      <Link
                        to="/settings"
                        className="btn-primary inline-flex items-center"
                      >
                        Ir a Configuración
                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
