import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { FaPaw } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

// Extend ImportMeta interface to include env
declare global {
  interface ImportMeta {
    env: {
      VITE_GOOGLE_CLIENT_ID: string;
    };
  }
}

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 Recuperar usuario guardado en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Manejo de login con Google
  const handleGoogleSuccess = useCallback(
    (credentialResponse: CredentialResponse) => {
      setIsLoading(true);
      setGoogleError('');

      if (!credentialResponse.credential) {
        setGoogleError('No se pudo obtener las credenciales de Google');
        setIsLoading(false);
        return;
      }

      try {
        // Decodificar JWT para extraer datos del usuario
        const base64Url = credentialResponse.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const userData = JSON.parse(jsonPayload);
        const userSession = {
          name: userData.name,
          email: userData.email,
          picture: userData.picture || '/default-avatar.png',
          avatar: userData.picture || '/default-avatar.png',
          token: credentialResponse.credential,
          role: 'user' // Default role for Google OAuth users
        };

        // Guardar sesión en localStorage
        localStorage.setItem('user', JSON.stringify(userSession));
        setCurrentUser(userSession);

        // Actualizar contexto
       login(userSession);
       navigate('/profile');
      } catch (error) {
        console.error('Error processing Google Sign-In:', error);
        setGoogleError('Error al procesar el inicio de sesión con Google');
      } finally {
        setIsLoading(false);
      }
    },
    [login, navigate]
  );

  // 🔹 Manejo de error en Google OAuth
  const handleGoogleError = useCallback(() => {
    setGoogleError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
    setIsLoading(false);
  }, []);

  // 🔹 Login simulado con email/contraseña
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userSession = {
        email,
        name: email.split('@')[0],
        picture: '/default-avatar.png',
        avatar: '/default-avatar.png',
        token: 'dummy-token-for-email-login',
        role: 'user' // Default role for email login users
      };

      localStorage.setItem('user', JSON.stringify(userSession));
      setCurrentUser(userSession);
      login(userSession);

      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setGoogleError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-petti-base dark:bg-petti-deep-blue flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Si hay usuario, mostrar su avatar */}
      {currentUser ? (
        <div className="text-center space-y-6 bg-white dark:bg-petti-deep-blue/40 p-8 rounded-2xl shadow-xl max-w-md w-full">
          <img
            src={currentUser.picture}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-petti-blue"
          />
          <h2 className="text-2xl font-semibold text-petti-deep-blue dark:text-white">
            ¡Hola, {currentUser.name}!
          </h2>
          <p className="text-petti-deep-blue/70 dark:text-petti-base/70">{currentUser.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 bg-petti-blue text-white rounded-xl hover:bg-petti-blue/90 transition"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        // Si no hay sesión, mostrar formulario de login
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-petti-slider-dark/20 p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaPaw style={{ height: '3rem', width: '3rem', color: 'var(--petti-light-blue)' }} />
            </div>
            <h1 className="text-3xl font-bold text-petti-text-light dark:text-petti-text-dark mb-2">
            ¡Hola de nuevo!
          </h1>
          <p className="text-petti-text-light/80 dark:text-petti-text-dark/80 mb-8">
            Inicia sesión para continuar a tu cuenta
          </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="w-full">
              {GOOGLE_CLIENT_ID ? (
                <GoogleOAuthProvider 
                  clientId={GOOGLE_CLIENT_ID}
                  onScriptLoadError={() => setGoogleError('Error al cargar Google Sign-In. Por favor, recarga la página.')}
                >
                  <div className="w-full max-w-md mx-auto">
                    <div className="w-full rounded-xl bg-petti-light-blue" style={{ minWidth: '300px' }}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                        auto_select
                        text="continue_with"
                        theme="outline"
                        size="large"
                        width="100%"
                        shape="rectangular"
                        locale="es"
                        ux_mode="popup"
                        use_fedcm_for_prompt={false}
                      />
                    </div>
                    {googleError && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center w-full">
                        {googleError}
                      </p>
                    )}
                  </div>
                </GoogleOAuthProvider>
              ) : (
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                  Error: Google Client ID no configurado
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-petti-light-blue/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-petti-slider-dark text-petti-text-light/70 dark:text-petti-light-blue/70">
                  O inicia sesión con tu correo
                </span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-petti-text-light/90 dark:text-petti-light-blue/90 mb-2"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80"
                    >
                      Contraseña
                    </label>
                    <Link
                      to="/forgot-password"
                      id="forgot-password-link"
                      aria-label="Forgot password"
                      className="text-sm font-medium text-petti-blue hover:text-petti-blue/80"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-petti-blue focus:ring-petti-blue border-petti-light-blue/50 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-petti-deep-blue/80 dark:text-petti-base/80"
                >
                  Recordar mi sesión
                </label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  aria-label="Login"
                  name="login"
                  id="login"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-petti-blue hover:bg-petti-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-petti-blue transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </div>
            </form>

            <div className="text-center text-sm">
              <span className="text-petti-deep-blue/70 dark:text-petti-base/70">
                ¿No tienes una cuenta?{' '}
                <Link
                  to="/signup"
                  id="register-link"
                  aria-label="Register"
                  className="font-medium text-petti-blue hover:text-petti-blue/80"
                >
                  Regístrate
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
