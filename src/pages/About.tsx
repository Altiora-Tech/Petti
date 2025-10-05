import React from 'react';
import { Heart, Sparkles, ShieldCheck, Users } from 'lucide-react';
import Cta from '../components/Cta';

const values = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-petti-blue" />,
        title: 'Confianza y Seguridad',
        description: 'La seguridad es la base de todo. Verificamos a cada profesional para construir una comunidad en la que puedas confiar plenamente.',
    },
    {
        icon: <Heart className="w-10 h-10 text-petti-pink" />,
        title: 'Amor por los Animales',
        description: 'Somos amantes de las mascotas, igual que tú. Esta pasión es el motor de cada decisión que tomamos y de cada conexión que creamos.',
    },
    {
        icon: <Users className="w-10 h-10 text-petti-accent" />,
        title: 'Comunidad Fuerte',
        description: 'Creemos en el poder de conectar personas. Fomentamos vínculos fuertes y duraderos entre dueños, mascotas y cuidadores.',
    },
];

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-petti-deep-blue/40">
      {/* Hero Section */}
      <section className="relative bg-petti-base dark:bg-petti-deep-blue pt-20 pb-10">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
                Nuestra historia: Conectando <span className="text-petti-blue">Corazones y Patas</span>
            </h1>
            <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-3xl mx-auto">
                Petti nació de una idea simple: el amor incondicional por nuestras mascotas merece un cuidado igual de incondicional. Somos un equipo de dueños, tecnólogos y amantes de los animales dedicados a hacer que encontrar cuidado de confianza sea más fácil y seguro que nunca.
            </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="bg-petti-base dark:bg-petti-deep-blue/80 p-8 rounded-2xl shadow-lg text-center">
                    <div className="inline-block p-4 bg-white dark:bg-petti-light-blue/10 rounded-full">
                         <Heart className="w-10 h-10 text-petti-pink" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-petti-deep-blue dark:text-white">Nuestra Misión</h2>
                    <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">
                        Simplificar el cuidado de mascotas, creando una comunidad segura y de confianza donde cada animal reciba el amor y la atención que merece, y cada dueño encuentre la tranquilidad que busca.
                    </p>
                </div>
                <div className="bg-petti-base dark:bg-petti-deep-blue/80 p-8 rounded-2xl shadow-lg text-center">
                    <div className="inline-block p-4 bg-white dark:bg-petti-light-blue/10 rounded-full">
                        <Sparkles className="w-10 h-10 text-petti-accent" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-petti-deep-blue dark:text-white">Nuestra Visión</h2>
                    <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">
                        Ser la plataforma líder y más amada en el mundo del cuidado de mascotas, transformando la forma en que las personas se conectan con los cuidadores y fomentando un mundo donde el bienestar animal es la máxima prioridad.
                    </p>
                </div>
            </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-petti-base dark:bg-petti-deep-blue">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">Lo que nos mueve</h2>
              <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-2xl mx-auto">Nuestros valores son la brújula que guía cada paso que damos.</p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {values.map((value) => (
                      <div key={value.title} className="p-8">
                          <div className="flex items-center justify-center h-20 w-20 mx-auto bg-white dark:bg-petti-light-blue/10 rounded-full shadow-md">
                              {value.icon}
                          </div>
                          <h3 className="mt-6 text-2xl font-bold text-petti-deep-blue dark:text-white">{value.title}</h3>
                          <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">{value.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* Meet Petti Toy Section */}
       <section className="py-20 bg-white dark:bg-petti-deep-blue/40">
          <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="lg:w-1/2">
                      <img 
                          src="/pettijuguete.png" 
                          alt="Un adorable juguete para mascotas de Petti" 
                          name="pettijuguete"
                          aria-label="pettijuguete"
                          width={500}
                          height={500}
                          className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-square"
                      />
                  </div>
                  <div className="lg:w-1/2">
                      <span className="font-bold text-petti-blue">MÁS QUE UN NOMBRE</span>
                      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">¿Quién es Petti? El juguete que tu mascota amará</h2>
                      <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
                          Petti no es solo el nombre de nuestra app. Es el espíritu de nuestra comunidad, materializado en el juguete perfecto. Diseñado por expertos en comportamiento animal, Petti es más que un simple objeto: es un compañero de juegos interactivo, duradero y seguro, creado para enriquecer la vida de tu mascota y fortalecer vuestro vínculo.
                      </p>
                      <ul className="mt-6 space-y-2 text-petti-deep-blue/80 dark:text-petti-base/80">
                          <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-petti-accent"/> Materiales 100% no tóxicos y ecológicos.</li>
                          <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-petti-accent"/> Diseño que estimula la mente y reduce la ansiedad.</li>
                          <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-petti-accent"/> Apto para mordedores de todas las edades y tamaños.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <Cta />
    </div>
  );
};

export default About;