import React from 'react';
import { Hospital, ShowerHead, Footprints, ShieldCheck, Users, Phone } from 'lucide-react';
import { FaPaw } from 'react-icons/fa';
import Cta from '../components/Cta';

const servicesData = [
  {
    name: 'Paseos',
    description: 'Sabemos que un perro cansado es un perro feliz. Nuestros paseadores profesionales se aseguran de que tu compañero tenga su dosis diaria de ejercicio, socialización y exploración en un entorno seguro.',
    icon: <FaPaw className="w-10 h-10 text-petti-blue" />,
    imageUrl: 'https://i.ibb.co/fd00T9jx/paseos.jpg',
    included: [
      'Paseos individuales o en grupos pequeños.',
      'Rastreo GPS en tiempo real.',
      'Fotos y actualizaciones durante el paseo.',
      'Agua fresca y limpieza de patitas al volver.'
    ],
    perfectFor: 'Perros con mucha energía, dueños con horarios ocupados o mascotas que necesitan socializar.'
  },
  {
    name: 'Peluquería',
    description: 'Un servicio de spa completo a domicilio o en el salón de nuestros expertos. Mantenemos a tu mascota limpia, sana y con un look increíble, utilizando productos de alta calidad y mucho cariño.',
    icon: <ShowerHead className="w-10 h-10 text-petti-accent" />,
    imageUrl: 'https://i.ibb.co/Z1K5f4R0/ing.jpg',
    included: [
      'Baño con productos hipoalergénicos.',
      'Corte de pelo y peinado según raza.',
      'Corte de uñas y limpieza de oídos.',
      'Tratamientos anti-pulgas opcionales.'
    ],
    perfectFor: 'Mantenimiento regular, preparación para eventos especiales o mascotas con necesidades de piel específicas.'
  },
  {
    name: 'Veterinaria',
    description: 'La salud de tu mascota es nuestra prioridad. Te conectamos con veterinarios matriculados para consultas a domicilio, vacunaciones anuales o atención de emergencias, evitando el estrés del traslado.',
    icon: <Hospital className="w-10 h-10 text-petti-pink" />,
    imageUrl: 'https://i.ibb.co/rGG5x23G/vet.jpg',
    included: [
      'Consultas generales y chequeos de rutina.',
      'Planes de vacunación y desparasitación.',
      'Atención de dolencias menores.',
      'Asesoramiento nutricional y de comportamiento.'
    ],
    perfectFor: 'Chequeos anuales, mascotas que se estresan en la clínica o para la comodidad de la atención en casa.'
  },
  {
    name: 'Guardería y Alojamiento',
    description: '¿Te vas de viaje? Encuentra un segundo hogar para tu mascota. Cuidadores amorosos ofrecen un ambiente seguro y familiar para que tu compañero se sienta como en casa, con mimos y juegos garantizados.',
    icon: <Footprints className="w-10 h-10 text-petti-blue" />,
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop',
    included: [
      'Alojamiento en un hogar verificado.',
      'Actualizaciones diarias con fotos y videos.',
      'Paseos y tiempo de juego incluidos.',
      'Administración de medicamentos si es necesario.'
    ],
    perfectFor: 'Vacaciones, viajes de trabajo o cuando necesitas que tu mascota esté cuidada por un período prolongado.'
  },
];


const ServiceDetailCard: React.FC<{ service: typeof servicesData[0], index: number }> = ({ service, index }) => {
    const isReversed = index % 2 !== 0;
    return (
        <div id="services-page" className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-12 ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
            <div className={`overflow-hidden rounded-2xl shadow-xl ${isReversed ? 'lg:col-start-2' : ''}`}>
                <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    name="service"
                    aria-label="service"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover aspect-[4/3]" />
            </div>
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <div className={`w-20 h-20 bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl flex items-center justify-center`}>
                        {service.icon}
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-petti-deep-blue dark:text-white">{service.name}</h3>
                    </div>
                </div>
                <p className="mt-4 text-petti-deep-blue/70 dark:text-petti-base/70">{service.description}</p>
                <div className="mt-6">
                    <h4 className="font-bold text-petti-deep-blue dark:text-white">¿Qué incluye?</h4>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-petti-deep-blue/70 dark:text-petti-base/70">
                        {service.included.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div className="mt-6">
                    <h4 className="font-bold text-petti-deep-blue dark:text-white">Ideal para...</h4>
                    <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">{service.perfectFor}</p>
                </div>
                 <a href="#/services" className="inline-block mt-8 bg-petti-blue text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-transform hover:scale-105 shadow-lg">
                    Buscar {service.name}
                </a>
            </div>
        </div>
    );
};


const ServicesPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-petti-deep-blue/40">
            {/* Hero Section */}
            <section className="bg-petti-base dark:bg-petti-deep-blue">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
                        Un cuidado para <span className="text-petti-blue">cada etapa de su vida</span>
                    </h1>
                    <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-3xl mx-auto">
                        Desde el paseo diario hasta la atención especializada que necesitan. Descubre todos los servicios pensados para el bienestar y la felicidad de tu mejor amigo.
                    </p>
                </div>
            </section>
            
            {/* Services Details Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 space-y-20">
                    {servicesData.map((service, index) => (
                        <ServiceDetailCard key={service.name} service={service} index={index} />
                    ))}
                </div>
            </section>
            
            {/* Trust and Safety Section */}
            <section className="bg-petti-base dark:bg-petti-deep-blue py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">Tu tranquilidad es nuestra prioridad</h2>
                    <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-2xl mx-auto">
                        Así es como garantizamos una experiencia segura y de confianza en cada servicio.
                    </p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-6">
                            <div className="flex justify-center"><Users className="w-12 h-12 text-petti-blue"/></div>
                            <h3 className="mt-4 text-xl font-bold text-petti-deep-blue dark:text-white">Profesionales Verificados</h3>
                            <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">Cada cuidador pasa por un proceso de verificación de identidad y revisión de antecedentes.</p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center"><ShieldCheck className="w-12 h-12 text-petti-accent"/></div>
                            <h3 className="mt-4 text-xl font-bold text-petti-deep-blue dark:text-white">Seguro de Confianza Petti</h3>
                            <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">Todos los servicios reservados a través de nuestra plataforma están cubiertos por nuestro seguro.</p>
                        </div>
                         <div className="p-6">
                            <div className="flex justify-center"><Phone className="w-12 h-12 text-petti-pink"/></div>
                            <h3 className="mt-4 text-xl font-bold text-petti-deep-blue dark:text-white">Soporte 24/7</h3>
                            <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">Nuestro equipo de soporte está siempre disponible para ayudarte ante cualquier imprevisto.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <Cta />
        </div>
    );
};

export default ServicesPage;