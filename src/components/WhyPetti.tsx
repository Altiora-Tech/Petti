import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { FaPaw } from 'react-icons/fa';
import { Feature } from '../types';

const features: Feature[] = [
    {
        title: "Humanidad + Tecnología",
        description: "No solo conectamos servicios, creamos vínculos de confianza y amor entre personas y mascotas.",
        icon: <Heart className="w-7 h-7 text-petti-pink" />
    },
    {
        title: "Comunidad Verificada",
        description: "Todos los profesionales son revisados cuidadosamente y valorados por la comunidad para tu tranquilidad.",
        icon: <ShieldCheck className="w-7 h-7 text-petti-blue" />
    },
    {
        title: "Cuidado Integral",
        description: "Desde salud y paseo, hasta estética y bienestar emocional. Petti lo abarca todo.",
        icon: <FaPaw className="w-7 h-7 text-petti-accent" />
    }
];

const WhyPetti: React.FC = () => {
  return (
    <section id="why-petti" className="py-20 bg-white dark:bg-petti-deep-blue/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <img 
              src="/pettilove.png" 
              alt="Happy pet with owner" 
              name="pettilove"
              aria-label="pettilove"
              width={500}
              height={500}
              className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[7/6]"
            />
          </div>
          <div className="lg:w-1/2">
            <span className="font-bold text-petti-blue">Petti el juguete que toda mascota ama!</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">Petti lo entiende</h2>
            <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
              Somos más que una app. Somos una comunidad de amantes de los animales, comprometidos con el bienestar de tu mejor amigo.
            </p>
            <div className="mt-8 space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-petti-base dark:bg-petti-light-blue/10 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-petti-deep-blue dark:text-white">{feature.title}</h3>
                    <p className="mt-1 text-petti-deep-blue/70 dark:text-petti-base/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPetti;