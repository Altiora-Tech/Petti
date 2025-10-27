import React from 'react';
import {
  Clock,
  Users,
  Phone,
} from 'lucide-react';
import { BsCurrencyDollar } from "react-icons/bs";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { BsShieldExclamation } from "react-icons/bs";

const benefits = [
  {
    icon: <Clock className="w-10 h-10 text-petti-blue" />,
    title: 'Flexibilidad Total',
    description: 'Tú eres tu propio jefe. Define tus propios horarios, servicios y tarifas. Trabaja tanto o tan poco como quieras.',
  },
  {
    icon: <Users className="w-10 h-10 text-petti-accent" />,
    title: 'Acceso a Clientes',
    description: 'Conecta con una gran comunidad de dueños de mascotas en tu área que buscan cuidadores de confianza como tú.',
  },
  {
    icon: <BsCurrencyDollar className="w-10 h-10 text-petti-pink" />,
    title: 'Pagos Seguros y Rápidos',
    description: 'Recibe tus pagos de forma segura y directa en tu cuenta bancaria dos días después de completar un servicio.',
  },
  {
    icon: <HiWrenchScrewdriver className="w-10 h-10 text-petti-blue" />,
    title: 'Herramientas de Gestión',
    description: 'Nuestra app te facilita la gestión de reservas, la comunicación con clientes y el seguimiento de tus ganancias.',
  },
  {
    icon: <Phone className="w-10 h-10 text-petti-accent" />,
    title: 'Soporte 24/7',
    description: 'Nuestro dedicado equipo de soporte está disponible para ayudarte a ti y a tus clientes en cualquier momento.',
  },
  {
    icon: <BsShieldExclamation className="w-10 h-10 text-petti-pink" />,
    title: 'Seguro de Confianza Petti',
    description: 'Trabaja con total tranquilidad. Todos los servicios reservados a través de Petti están cubiertos por nuestro seguro.',
  },
];

const ProfesionalesBeneficios: React.FC = () => {
  return (
    <div id="professionals-benefits" className="bg-white dark:bg-petti-deep-blue/40">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
            Haz lo que amas y <span className="text-petti-blue">gana dinero con ello</span>.
          </h1>
          <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
            Unirte a Petti significa más que ofrecer un servicio; es formar parte de una comunidad que comparte tu pasión por los animales. Te damos las herramientas y el soporte para que tu negocio crezca.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-8 bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center h-20 w-20 mx-auto bg-white dark:bg-petti-light-blue/10 rounded-full shadow-md">
                {benefit.icon}
              </div>
              <h3 className="mt-6 text-2xl font-bold text-petti-deep-blue dark:text-white text-center">{benefit.title}</h3>
              <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <a href="#/register" className="bg-petti-blue text-white px-10 py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-transform hover:scale-105 shadow-lg">
              Comenzar ahora
            </a>
            <p className="mt-8 text-sm text-petti-deep-blue/60 dark:text-petti-base/60">
                ¿Tienes preguntas? <a href="#/requirements" className="font-semibold text-petti-blue hover:bg-petti-blue/90">Consulta nuestros requisitos</a>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProfesionalesBeneficios;