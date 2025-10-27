import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaPaw } from 'react-icons/fa';

// Extend IconBaseProps to include className
declare module 'react-icons' {
  interface IconBaseProps {
    className?: string;
  }
}

type Role = 'CLIENT' | 'SITTER' | 'BUSINESS' | 'PROVIDER' | 'SELLER';

const roleOptions = [
  { value: 'CLIENT', label: 'Cliente o dueño de mascotas' },
  { value: 'SITTER', label: 'Profesional que ofrece servicios' },
  { value: 'BUSINESS', label: 'Veterinaria o comercio de servicios' },
  { value: 'PROVIDER', label: 'Distribuidor o comercio que vende productos' },
  { value: 'SELLER', label: 'Emprendedor independiente que vende productos' },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'SITTER' as Role, // Default to SITTER role
    termsAccepted: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      setIsLoading(true);
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: formData.role,
      });
      
      // Redirect based on role or to a welcome page
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // Redirect to Google OAuth with role parameter
    window.location.href = `${process.env.VITE_API_URL}/oauth2/authorization/google?role=SITTER`;
  };

  return (
    <div className="min-h-screen bg-petti-base dark:bg-petti-deep-blue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-petti-slider-dark py-8 px-4 shadow-xl rounded-xl sm:px-10">
          <div className="text-center">
            <div className="flex justify-center">
              <FaPaw className="h-12 w-12 text-petti-blue" />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-petti-text-light dark:text-white">
              Crear una cuenta
            </h2>
            <p className="mt-2 text-sm text-petti-text-light/80 dark:text-petti-light-blue/80">
              Únete a PettiWay como cuidador profesional
            </p>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full flex justify-center items-center py-3 px-4 border border-petti-light-blue/50 dark:border-petti-light-blue/30 rounded-xl text-sm font-medium text-petti-text-light dark:text-white hover:bg-petti-base/50 dark:hover:bg-petti-light-blue/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-petti-blue"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Registrarse con Google
            </button>
          </div>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-petti-light-blue/30 dark:border-petti-light-blue/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-petti-slider-dark text-petti-text-light/70 dark:text-petti-light-blue/70">
                O regístrate con tu correo
              </span>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-lg border border-red-200 dark:border-red-800/50">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-petti-text-light/90 dark:text-petti-light-blue/90 mb-1">
                  Nombres
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-1">
                  Apellidos
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-1">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-1">
                Tipo de cuenta
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
              >
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-1">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 border border-gray-300 dark:border-petti-light-blue/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-petti-blue focus:border-transparent bg-white dark:bg-petti-slider-dark/80 dark:text-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-petti-light-blue/50"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-petti-blue focus:ring-petti-blue border-gray-300 dark:border-petti-light-blue/30 rounded dark:bg-petti-slider-dark/50"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-petti-text-light/90 dark:text-petti-light-blue/90">
                  Acepto los{' '}
                  <a href="/terms" className="text-petti-blue hover:text-petti-blue/80 dark:text-petti-blue dark:hover:text-petti-light-blue">
                    Términos y condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="/privacy" className="text-petti-blue hover:text-petti-blue/80 dark:text-petti-blue dark:hover:text-petti-light-blue">
                    Política de privacidad
                  </a>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-petti-blue hover:bg-petti-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-petti-blue transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Registrando...' : 'Crear cuenta'}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-petti-light-blue/10 text-center text-sm">
            <span className="text-petti-text-light/80 dark:text-petti-light-blue/80">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-petti-blue hover:text-petti-blue/80 dark:text-petti-blue dark:hover:text-petti-light-blue">
                Inicia sesión
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
