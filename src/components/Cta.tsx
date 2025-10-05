import React from 'react';
import { Sparkles } from 'lucide-react';

const Cta: React.FC = () => {
  return (
    <section id="cta" className="bg-petti-deep-blue">
      <div className="container mx-auto px-6 py-20 text-center">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
        <Sparkles className="w-12 h-12 text-white mb-4 animate-bounce-smooth" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
          ¡Tu tranquilidad está a un clic de distancia!
        </h2>
        </div>
          <p className="mt-4 text-lg text-petti-light-blue/80">
            Únete a miles de dueños que ya confían en Petti para el cuidado de sus mascotas.
            La seguridad y el amor que buscas están aquí.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#/sitters" className="bg-petti-blue text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-transform hover:scale-105 shadow-lg">
              Encontrar un cuidador
            </a>
            <a href="#/register" className="bg-transparent border-2 border-petti-light-blue/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-petti-light-blue/10 transition-all hover:scale-105">
              Eres profesional
            </a>
          </div>
        </div>
    </section>
  );
};

export default Cta;