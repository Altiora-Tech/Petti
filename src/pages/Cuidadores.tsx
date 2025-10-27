import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cuidador } from '../types';
import { Star, ShieldCheck, Search, MapPin, ShowerHead, Footprints, Hospital } from 'lucide-react';
import { FaPaw } from 'react-icons/fa';

// Helper function to generate optimized image URLs
const getOptimizedImageUrl = (url: string, width = 500, quality = 80) => {
  if (!url) return '';
  
  // If using ImgBB, we can add parameters to optimize the image
  if (url.includes('i.ibb.co')) {
    return `${url}${url.includes('?') ? '&' : '?'}width=${width}&quality=${quality}&format=webp`;
  }
  
  return url;
};

const cuidadores: Cuidador[] = [
  { id: 1, name: 'Ana Pérez', imageUrl: 'https://i.ibb.co/PGk7cBn5/ana.jpg', rating: 4.9, reviews: 120, services: ['Paseos', 'Guardería'], priceRange: '$10 - $30', verified: true },
  { id: 2, name: 'Carlos Gómez', imageUrl: 'https://i.ibb.co/ZzGQmr5Z/carlos.jpg', rating: 4.8, reviews: 95, services: ['Paseos', 'Peluquería'], priceRange: '$15 - $50', verified: true },
  { id: 3, name: 'Lucía Fernández', imageUrl: 'https://i.ibb.co/JWcKT09G/lucia.jpg', rating: 5.0, reviews: 210, services: ['Veterinaria', 'Guardería'], priceRange: '$20 - $80', verified: true },
  { id: 4, name: 'Javier Rodríguez', imageUrl: 'https://i.ibb.co/Kxh0PGpc/javier.jpg', rating: 4.7, reviews: 88, services: ['Paseos'], priceRange: '$12 - $25', verified: false },
  { id: 5, name: 'Sofía Martínez', imageUrl: 'https://i.ibb.co/RkwFBWyx/sofia.jpg', rating: 4.9, reviews: 150, services: ['Peluquería', 'Guardería'], priceRange: '$25 - $60', verified: true },
  { id: 6, name: 'Mateo Sánchez', imageUrl: 'https://i.ibb.co/QFv4mVDq/mateo.jpg', rating: 4.6, reviews: 70, services: ['Paseos', 'Alojamiento'], priceRange: '$15 - $40', verified: true },
];

const ServiceIcon: React.FC<{ service: string }> = ({ service }) => {
    switch(service) {
        case 'Paseos': return <FaPaw className="w-4 h-4" />;
        case 'Peluquería': return <ShowerHead className="w-4 h-4" />;
        case 'Veterinaria': return <Hospital className="w-4 h-4" />;
        case 'Guardería': return <Footprints className="w-4 h-4" />;
        case 'Alojamiento': return <Footprints className="w-4 h-4" />;
        default: return null;
    }
}

const CuidadorCard: React.FC<{ cuidador: Cuidador }> = ({ cuidador }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  
  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = getOptimizedImageUrl(cuidador.imageUrl, 600, 90);
    
    img.onload = () => {
      setImageSrc(img.src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error('Error loading image:', cuidador.imageUrl);
      setImageSrc(cuidador.imageUrl); // Fallback to original URL
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [cuidador.imageUrl]);
  
  return (
    <div className="bg-white dark:bg-petti-deep-blue/80 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
      <div className="relative w-full h-48 bg-petti-light-blue/20 dark:bg-petti-light-blue/5">
        {!isLoading && imageSrc && (
          <img
            src={imageSrc}
            aria-label={`${cuidador.name}, cuidador de mascotas`}
            alt={`${cuidador.name}, cuidador de mascotas`}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-petti-blue/30 rounded-full"></div>
              <div className="w-3 h-3 bg-petti-blue/50 rounded-full"></div>
              <div className="w-3 h-3 bg-petti-blue/70 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-petti-deep-blue dark:text-white">{cuidador.name}</h3>
                {cuidador.verified && (
                  <span className="flex items-center" title="Verificado">
                    <ShieldCheck className="w-6 h-6 text-petti-blue" aria-hidden="true" />
                    <span className="sr-only">Verificado</span>
                  </span>
                )}
            </div>
            <div className="flex items-center mt-2 text-sm text-petti-deep-blue/70 dark:text-petti-base/70">
                <Star className="w-5 h-5 text-petti-accent" />
                <span className="ml-1 font-bold">{cuidador.rating}</span>
                <span className="ml-1">({cuidador.reviews} reseñas)</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {cuidador.services.map(service => (
                    <span key={service} className="flex items-center gap-1.5 text-xs font-semibold text-petti-deep-blue dark:text-petti-base bg-petti-light-blue/50 dark:bg-petti-light-blue/10 px-2.5 py-1 rounded-full">
                        <ServiceIcon service={service} />
                        {service}
                    </span>
                ))}
            </div>
            <div className="mt-4 text-right">
                <span className="text-lg font-bold text-petti-deep-blue dark:text-white">{cuidador.priceRange}</span>
                <p className="text-xs text-petti-deep-blue/60 dark:text-petti-base/60">por servicio</p>
            </div>
        </div>
    </div>
    );
}

const Cuidadores: React.FC = () => {
    // Basic filtering state - can be expanded
    const [filteredCuidadores] = useState(cuidadores);

    return (
        <div id="sitters-page" className="bg-petti-base dark:bg-petti-deep-blue">
            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
                        Encuentra al cuidador <span className="text-petti-blue">perfecto</span>
                    </h1>
                    <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
                        Busca entre cientos de profesionales verificados y encuentra el ideal para tu mascota.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mt-12 max-w-4xl mx-auto p-6 bg-white dark:bg-petti-deep-blue/40 rounded-2xl shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                        <div className="lg:col-span-1">
                            <label htmlFor="service" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Servicio</label>
                            <select id="service" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-petti-base/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition">
                                <option>Todos los servicios</option>
                                <option>Paseos</option>
                                <option>Peluquería</option>
                                <option>Veterinaria</option>
                                <option>Guardería y Alojamiento</option>
                            </select>
                        </div>
                        <div className="lg:col-span-1">
                             <label htmlFor="location" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Ubicación</label>
                             <div className="relative">
                                <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-petti-deep-blue/40" />
                                <input type="text" id="location" placeholder="Ciudad o código postal" className="w-full pl-10 pr-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-petti-base/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" />
                            </div>
                        </div>
                        <Link 
                            to="/sitters"
                            className="w-full md:w-auto lg:w-full bg-petti-blue text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-transform hover:scale-105 flex-shrink-0 shadow-lg flex items-center justify-center gap-2"
                            role="button"
                            aria-label="Buscar cuidadores"
                        >
                            <Search className="w-5 h-5" /> Buscar
                        </Link>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCuidadores.map(cuidador => (
                        <CuidadorCard key={cuidador.id} cuidador={cuidador} />
                    ))}
                </div>

                 <div className="mt-16 text-center">
                    <button 
                        name="button"
                        id="button"
                        aria-label="button"
                        type="button"
                        className="text-petti-blue font-bold border-2 border-petti-blue px-8 py-3 rounded-xl hover:bg-petti-blue/10 transition">
                        Cargar más resultados
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cuidadores;