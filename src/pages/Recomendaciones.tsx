import React from 'react';
import { Tip } from '../../types';
import { Bone, Brain, GlassWater, Activity, CloudDrizzle } from 'lucide-react';
import { FaPaw } from 'react-icons/fa';
import { HiAcademicCap } from "react-icons/hi";

const tips: Tip[] = [
    {
        category: "Nutrición",
        icon: <Bone className="w-10 h-10 text-petti-accent" />,
        title: "Lee las Etiquetas",
        description: "Busca alimentos cuyo primer ingrediente sea una proteína animal específica (ej. pollo, salmón), no subproductos o granos.",
    },
    {
        category: "Ejercicio",
        icon: <FaPaw className="w-10 h-10 text-petti-blue" />,
        title: "Varía la Rutina",
        description: "Además de paseos, incluye juegos de buscar, correr en un lugar seguro o senderismo. Mantiene su mente y cuerpo activos.",
    },
    {
        category: "Higiene",
        icon: <CloudDrizzle className="w-10 h-10 text-petti-pink" />,
        title: "Cuidado Dental es Clave",
        description: "Cepilla los dientes de tu mascota varias veces por semana con pasta dental para animales para prevenir enfermedades periodontales.",
    },
    {
        category: "Salud Emocional",
        icon: <Brain className="w-10 h-10 text-petti-blue" />,
        title: "Enriquecimiento Ambiental",
        description: "Usa juguetes interactivos, rompecabezas de comida y esconde premios para estimular su mente y combatir el aburrimiento.",
    },
    {
        category: "Nutrición",
        icon: <GlassWater className="w-10 h-10 text-petti-accent" />,
        title: "Hidratación Constante",
        description: "Asegúrate de que siempre tenga acceso a agua fresca y limpia. Considera fuentes de agua para gatos, ya que los anima a beber más.",
    },
    {
        category: "Ejercicio",
        icon: <Activity className="w-10 h-10 text-petti-blue" />,
        title: "Respeta sus Límites",
        description: "Observa las señales de cansancio de tu mascota, especialmente en climas cálidos o si es un cachorro o un animal mayor.",
    }
];

const Recomendaciones: React.FC = () => {
    return (
        <div id="recomendations" className="bg-white dark:bg-petti-deep-blue/40">
            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <HiAcademicCap className="w-16 h-16 text-petti-blue" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
                        Consejos para un Dueño <span className="text-petti-blue">Ejemplar</span>
                    </h1>
                    <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
                        Pequeños cambios y hábitos diarios que marcan una gran diferencia en la felicidad y salud de tu compañero de vida.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tips.map((tip, index) => (
                        <div key={index} className="p-8 bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                           <div className="flex items-center gap-4">
                             <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-petti-light-blue/10 rounded-full flex items-center justify-center">
                                {tip.icon}
                            </div>
                            <div>
                                <span className="font-bold text-petti-blue">{tip.category}</span>
                                <h3 className="text-xl font-bold text-petti-deep-blue dark:text-white">{tip.title}</h3>
                            </div>
                           </div>
                            <p className="mt-4 text-petti-deep-blue/70 dark:text-petti-base/70">{tip.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recomendaciones;
