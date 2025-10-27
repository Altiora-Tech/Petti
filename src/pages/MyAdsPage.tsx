import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  status: 'active' | 'sold' | 'inactive';
  createdAt: string;
}

const MyAdsPage: React.FC = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchAds = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setAds([
            {
              id: '1',
              title: 'Anuncio de ejemplo',
              description: 'Descripción del anuncio de ejemplo',
              price: 100,
              image: 'https://i.ibb.co/8D9pbP9F/pexels-wolfart-30769359.jpg',
              status: 'active',
              createdAt: new Date().toISOString(),
            },
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching ads:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAds();
    }
  }, [user]);

  const handleDeleteAd = async (adId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      try {
        // Simulate delete API call
        setAds(ads.filter(ad => ad.id !== adId));
      } catch (error) {
        console.error('Error deleting ad:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Acceso no autorizado</h2>
          <p className="mb-4">Necesitas iniciar sesión para ver tus anuncios.</p>
          <Link to="/login" className="text-petti-blue hover:bg-petti-blue/90">
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  // Handle form submission
  const handleSubmitAd = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const adData = {
      id: editingAd?.id || Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      image: formData.get('image') as string,
      status: formData.get('status') as 'active' | 'inactive' | 'sold',
      createdAt: editingAd?.createdAt || new Date().toISOString(),
    };

    if (editingAd) {
      // Update existing ad
      setAds(ads.map(ad => ad.id === editingAd.id ? { ...ad, ...adData } : ad));
    } else {
      // Add new ad
      setAds([adData, ...ads]);
    }
    
    setShowCreateModal(false);
    setEditingAd(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-petti-deep-blue/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-petti-text-light dark:text-petti-text-dark">
                Mis Anuncios
              </h1>
              <p className="text-petti-text-light/80 dark:text-petti-text-dark/80 mt-1">
                Administra tus publicaciones y encuentra nuevos clientes
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary inline-flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Nuevo Anuncio</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-petti-blue"></div>
          </div>
        ) : ads.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-4 text-petti-blue dark:text-petti-light-blue">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-petti-text-light dark:text-petti-text-dark mb-2">No tienes anuncios</h3>
            <p className="text-petti-text-light/80 dark:text-petti-text-dark/80 mb-6">Comienza a publicar tus servicios y encuentra nuevos clientes.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-petti-blue text-white px-6 py-2.5 rounded-lg hover:bg-petti-blue/90 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>+</span>
              <span>Crear mi primer anuncio</span>
            </button>
          </div>
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="card dark:bg-petti-slider-dark rounded-xl border dark:border-petti-slider-dark overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100 dark:bg-petti-slider-dark overflow-hidden">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://i.ibb.co/8D9pbP9F/pexels-wolfart-30769359.jpg';
                  }}
                />
                <div className={`absolute top-3 right-3 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md ${
                  ad.status === 'active' 
                    ? 'bg-green-500/90 dark:bg-green-600/90' 
                    : 'bg-gray-500/90 dark:bg-gray-600/90'
                }`}>
                  {ad.status === 'active' ? 'Activo' : 'Inactivo'}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-1">{ad.title}</h3>
                  <span className="text-petti-blue dark:text-petti-light-blue font-bold text-lg whitespace-nowrap ml-2">
                    ${ad.price.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {ad.description}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-petti-deep-blue/50">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(ad.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingAd(ad)}
                      className="text-sm text-petti-blue hover:text-petti-blue/70 dark:text-petti-light-blue dark:hover:text-petti-light-blue/70 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-petti-deep-blue/50"
                      aria-label="Editar anuncio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="sr-only md:not-sr-only">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteAd(ad.id)}
                      className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                      aria-label="Eliminar anuncio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="sr-only md:not-sr-only">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Ad Modal */}
      {showCreateModal && (
  <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="card w-full max-w-lg relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {editingAd ? 'Editar Anuncio' : 'Nuevo Anuncio'}
        </h2>
        <button
          onClick={() => {
            setShowCreateModal(false);
            setEditingAd(null);
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 -mr-2"
          aria-label="Cerrar"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
            
            <form onSubmit={handleSubmitAd} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  defaultValue={editingAd?.title || ''}
                  className="input-field w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  required
                  name="description"
                  rows={3}
                  defaultValue={editingAd?.description || ''}
                  className="input-field w-full"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Precio ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      defaultValue={editingAd?.price || ''}
                      className="input-field w-full pl-7"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estado
                  </label>
                  <select
                    name="status"
                    defaultValue={editingAd?.status || 'active'}
                    className="input-field w-full"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="sold">Vendido</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Imagen (URL)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="url"
                    name="image"
                    required
                    defaultValue={editingAd?.image || ''}
                    className="input-field w-full"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingAd(null);
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingAd ? 'Guardar cambios' : 'Publicar anuncio'}
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
      </div>
    </div>
    );
};

export default MyAdsPage;
