import React from 'react';
import { UserPlus, Fingerprint, ShieldCheck, NotepadText, Heart } from 'lucide-react';

const requirements = [
    {
        icon: <UserPlus className="w-8 h-8 text-petti-blue" />,
        title: "Ser mayor de 18 años",
        description: "Debes tener la mayoría de edad legal en tu país de residencia para ofrecer servicios en Petti.",
    },
    {
        icon: <Heart className="w-8 h-8 text-petti-pink" />,
        title: "Amor y experiencia con animales",
        description: "Buscamos personas apasionadas y con experiencia demostrable en el cuidado de mascotas.",
    },
    {
        icon: <Fingerprint className="w-8 h-8 text-petti-accent" />,
        title: "Verificación de identidad",
        description: "Para garantizar la seguridad de nuestra comunidad, todos los cuidadores deben completar un proceso de verificación de identidad.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-petti-blue" />,
        title: "Revisión de antecedentes",
        description: "Realizamos una revisión de antecedentes para asegurar un entorno seguro y de confianza para dueños y mascotas.",
    },
    {
        icon: <NotepadText className="w-8 h-8 text-petti-pink" />,
        title: "Perfil completo y profesional",
        description: "Tu perfil es tu carta de presentación. Debe ser completo, con fotos de calidad y una descripción detallada de tus servicios.",
    },
];

const ProfesionalesRequisitos: React.FC = () => {
    return (
        <div id="professionals-requirements" className="bg-white dark:bg-petti-deep-blue/40">
            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
                        Nuestra <span className="text-petti-blue">promesa de confianza</span> y seguridad.
                    </h1>
                    <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
                        Para mantener la calidad y seguridad que nos caracteriza, todos nuestros profesionales deben cumplir con los siguientes requisitos. Es nuestro compromiso con el bienestar de cada mascota.
                    </p>
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {requirements.map((req, index) => (
                            <div key={index} className="flex items-start gap-6 p-6 bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl shadow-sm">
                                <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-petti-light-blue/10 rounded-full flex items-center justify-center">
                                    {req.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-petti-deep-blue dark:text-white">{req.title}</h3>
                                    <p className="mt-1 text-petti-deep-blue/70 dark:text-petti-base/70">{req.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-petti-deep-blue dark:text-white">¿Cumples con los requisitos?</h2>
                    <p className="mt-2 text-petti-deep-blue/70 dark:text-petti-base/70">¡Perfecto! Nos encantaría tenerte en nuestra comunidad.</p>
                    <a href="#/register" className="mt-6 inline-block bg-petti-blue text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-transform hover:scale-105 shadow-lg">
                        Únete a Petti
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfesionalesRequisitos;