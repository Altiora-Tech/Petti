import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      newsletter: true,
    },
    language: 'es',
    theme: 'system',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/settings' } });
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Configuración guardada correctamente');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error al guardar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Handle account deletion
      console.log('Account deletion requested');
      logout();
      navigate('/');
    }
  };

  if (!user) {
    return null; // Redirection is handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-petti-deep-blue/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-petti-text-light dark:text-petti-text-dark mb-2">
          Configuración
        </h1>
        <p className="text-petti-text-light/80 dark:text-petti-text-dark/80 mb-8">
          Personaliza la configuración de tu cuenta y preferencias
        </p>
      </div>
        
      <div className="bg-white dark:bg-petti-deep-blue/30 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-petti-deep-blue/50">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-petti-deep-blue/40">
          <nav className="flex overflow-x-auto px-2">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'account'
                  ? 'border-b-2 border-petti-blue text-petti-blue dark:text-petti-light-blue dark:border-petti-light-blue font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-petti-blue dark:hover:text-petti-light-blue hover:border-gray-300 dark:hover:border-petti-light-blue/30'
              }`}
            >
              Cuenta
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'security'
                  ? 'border-b-2 border-petti-blue text-petti-blue dark:text-petti-light-blue dark:border-petti-light-blue font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-petti-blue dark:hover:text-petti-light-blue hover:border-gray-300 dark:hover:border-petti-light-blue/30'
              }`}
            >
              Seguridad
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-petti-blue text-petti-blue dark:text-petti-light-blue dark:border-petti-light-blue font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-petti-blue dark:hover:text-petti-light-blue hover:border-gray-300 dark:hover:border-petti-light-blue/30'
              }`}
            >
              Notificaciones
            </button>
            {/* <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'preferences'
                  ? 'border-b-2 border-petti-blue text-petti-blue dark:text-petti-light-blue dark:border-petti-light-blue font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-petti-blue dark:hover:text-petti-light-blue hover:border-gray-300 dark:hover:border-petti-light-blue/30'
              }`}
            >
              Preferencias
            </button> */}
          </nav>
        </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-6 md:p-8">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Información de la cuenta</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Actualiza la información de tu cuenta y dirección de correo electrónico.
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4 md:mb-0 md:mr-6">
                      <img
                        src={user.avatar || '/default-avatar.png'}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="text-sm text-petti-blue hover:bg-petti-blue/90"
                      >
                        Cambiar foto de perfil
                      </button>
                      <p className="text-sm text-gray-500 mt-1">
                        Formatos permitidos: JPG, PNG. Tamaño máximo: 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Cambiar contraseña</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Asegúrate de que tu nueva contraseña sea segura y no la compartas con nadie.
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Contraseña actual
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nueva contraseña
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirmar nueva contraseña
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Zona de peligro</h3>
                          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                            <p>Al eliminar tu cuenta, se eliminarán todos tus datos de forma permanente. Esta acción no se puede deshacer.</p>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={handleDeleteAccount}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                            >
                              Eliminar mi cuenta
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-petti-blue text-white rounded-lg hover:bg-petti-blue/90 disabled:opacity-70 flex items-center"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Guardando...
                          </>
                        ) : 'Guardar cambios'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="p-6 md:p-8">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Seguridad</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Actualiza tu contraseña y configura la autenticación de dos factores.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Cambiar contraseña</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Asegúrate de que tu nueva contraseña sea segura y no la compartas con nadie.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contraseña actual
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nueva contraseña
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirmar nueva contraseña
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-red-600 font-medium mb-2">Zona de peligro</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Una vez que eliminas tu cuenta, no hay vuelta atrás. Por favor, ten en cuenta que esta acción no se puede deshacer.
                      </p>
                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        Eliminar mi cuenta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Notificaciones</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Controla cómo y cuándo recibes notificaciones.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Idioma
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                         className="w-full px-3 py-2 border rounded-lg focus:border-petti-blue border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tema
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:border-petti-blue border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-deep-blue/50 dark:text-white transition-colors duration-200"
                      >
                        <option value="system">Sistema</option>
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-petti-blue text-white rounded-lg hover:bg-petti-blue/90 disabled:opacity-70"
                      >
                        {isLoading ? 'Guardando...' : 'Guardar preferencias'}
                      </button>
                    </div>
                  </div>
                 </form>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default SettingsPage;
