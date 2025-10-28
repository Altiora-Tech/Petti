import React, { useEffect, useRef } from 'react';

// Ruta a la imagen en la carpeta public
const pettiHappy = '/pettihappy.png';
const pettiFallback = '/petti-fallback.png';

const Hero: React.FC = () => {
  const pet3dRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pet3dRef.current) return;
      
      const { left, top, width, height } = pet3dRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 5; 
      const y = ((e.clientY - top) / height - 0.5) * 5; 
      
      pet3dRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="bg-petti-base dark:bg-petti-deep-blue relative overflow-hidden pt-24 md:pt-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-30 w-80 h-80 bg-petti-blue/10 dark:bg-petti-light-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-10 w-96 h-96 bg-petti-pink/10 dark:bg-petti-pink/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 pt-4 pb-10 md:py-20 lg:py-20 flex flex-col lg:flex-row items-center relative z-10">
        <div className="lg:w-1/2 z-10 mb-12 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
            Cuidado de mascotas <span className="text-petti-blue">a tu puerta</span>.
          </h1>
          <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-xl">
            Paseadores, veterinarios, peluquería y más. Encuentra cuidadores de confianza, revisados por nuestra comunidad y listos para dar amor.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg">
            <input 
              type="text" 
              placeholder="¿Qué servicio necesitas?" 
              aria-label="Buscar servicio para mascotas"
              className="w-full px-5 py-3.5 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-white/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition placeholder-petti-deep-blue/50 dark:placeholder-petti-base/50 backdrop-blur-sm"
            />
            <button 
                type="button"
                id="find-sitters-button"
                aria-label="Buscar cuidadores de mascotas"
                className="bg-petti-blue text-white px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-transform hover:scale-105 flex-shrink-0 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '#/sitters'}
            >
              Buscar Cuidadores
            </button>
          </div>
          <div className="mt-4 text-sm text-petti-deep-blue/60 dark:text-petti-base/60">
            <span className="font-semibold">Popular:</span> Paseador, Peluquería, Guardería
          </div>
        </div>

        {/* 3D Pet Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
          <div 
            ref={pet3dRef}
            className="relative w-full max-w-md h-80 md:h-96 lg:h-[32rem] transition-transform duration-300 ease-out will-change-transform"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-petti-blue/20 to-petti-pink/20 dark:from-petti-blue/10 dark:to-petti-pink/10 rounded-3xl transform rotate-6 scale-95"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-petti-blue/15 to-petti-pink/15 dark:from-petti-blue/5 dark:to-petti-pink/5 rounded-3xl transform -rotate-6 scale-95"></div>
            
            <div className="relative h-full w-full flex items-center justify-center">
              <img
                src={pettiHappy}
                alt="Mascota feliz de Petti"
                width={500}
                height={500}
                aria-label="Mascota feliz de Petti"
                className="w-full h-auto max-h-full object-contain transform transition-all duration-500 hover:scale-105"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = pettiFallback;
                }}
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-petti-pink/20 dark:bg-petti-pink/10 rounded-full filter blur-xl animate-float"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-petti-blue/20 dark:bg-petti-blue/10 rounded-full filter blur-xl animate-float animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// Add global styles for the animation
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
`;

// Add styles to the head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
