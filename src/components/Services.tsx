import React from 'react';
import { Hospital, ShowerHead, Footprints } from 'lucide-react';
import { FaPaw } from 'react-icons/fa';
import { Service } from '../../types';

const services: Service[] = [
  {
    name: 'Paseos',
    description: 'Aventuras diarias para que tu perro gaste energía y sea feliz.',
    icon: <FaPaw className="w-8 h-8 text-white" />,
    imageUrl: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Peluquería',
    description: 'Baño, corte y mimos para que tu mascota se vea y sienta genial.',
    icon: <ShowerHead className="w-8 h-8 text-white" />,
    imageUrl: 'https://i.ibb.co/Z1HR1b8C/perro-de-raza-pura-siendo-lindo-en-un-estudio.jpg',
  },
  {
    name: 'Veterinaria',
    description: 'Consultas, vacunas y emergencias con profesionales de confianza.',
    icon: <Hospital className="w-8 h-8 text-white" />,
    imageUrl: 'https://i.ibb.co/01k7jQd/gatito.jpg',
  },
  {
    name: 'Guardería',
    description: 'Un segundo hogar seguro y divertido cuando necesitás viajar.',
    icon: <Footprints className="w-8 h-8 text-white" />,
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop',
  },
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="relative rounded-2xl overflow-hidden group shadow-lg h-96">
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          name={service.name}
          aria-label={service.name}
          width={500}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <div className="w-14 h-14 bg-petti-blue/80 rounded-xl flex items-center justify-center backdrop-blur-sm mb-4">
                {service.icon}
            </div>
            <h3 className="text-2xl font-bold">{service.name}</h3>
            <p className="mt-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-500">{service.description}</p>
        </div>
    </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-petti-base dark:bg-petti-deep-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">Un cuidado para cada necesidad</h2>
          <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-2xl mx-auto">
            Todo lo que tu compañero de vida necesita, en un solo lugar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;