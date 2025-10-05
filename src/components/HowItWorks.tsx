import React from 'react';
import { Search, Calendar, Heart } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-10 h-10 text-petti-blue" />,
      title: 'Encuentra',
      description: 'Busca profesionales verificados cerca de ti. Lee opiniones y elige el ideal para tu mascota.',
    },
    {
      icon: <Calendar className="w-10 h-10 text-petti-accent" />,
      title: 'Reserva',
      description: 'Coordina fechas y horarios con facilidad. Paga de forma segura, todo dentro de la app.',
    },
    {
      icon: <Heart className="w-10 h-10 text-petti-pink" />,
      title: 'Relájate',
      description: 'Recibe fotos y actualizaciones durante el servicio. Tu mascota está en las mejores manos.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-petti-deep-blue/40">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">Cuidar nunca fue tan fácil</h2>
        <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-2xl mx-auto">En solo tres pasos, tienes la tranquilidad que buscas.</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="p-8 bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center h-20 w-20 mx-auto bg-white dark:bg-petti-light-blue/10 rounded-full shadow-md">
                {step.icon}
              </div>
              <h3 className="mt-6 text-2xl font-bold text-petti-deep-blue dark:text-white">{step.title}</h3>
              <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;