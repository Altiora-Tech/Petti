import React, { useState } from 'react';
import { FirstAidTopic } from '../types';
import { XCircle, Beaker } from "lucide-react";
import { FaFirstAid } from "react-icons/fa";
import { FaBandage } from "react-icons/fa6";
import { BsShieldExclamation } from "react-icons/bs";

const topics: FirstAidTopic[] = [
    {
        title: "Cortes y Heridas",
        icon: <FaBandage className="w-8 h-8 text-petti-pink" />,
        content: [
            "1. Lávate las manos y, si es posible, usa guantes.",
            "2. Limpia la herida suavemente con agua y jabón neutro.",
            "3. Aplica presión con una gasa limpia para detener el sangrado.",
            "4. Cubre la herida con un vendaje limpio y no demasiado apretado.",
            "5. Llama a tu veterinario, especialmente si la herida es profunda o no deja de sangrar."
        ]
    },
    {
        title: "Asfixia",
        icon: <XCircle className="w-8 h-8 text-petti-blue" />,
        content: [
            "1. Mantén la calma. Si tu mascota puede toser, anímala a hacerlo.",
            "2. Abre su boca con cuidado para ver si el objeto es visible y puedes retirarlo con pinzas (¡no uses los dedos!).",
            "3. Si no puedes verlo, realiza una versión de la maniobra de Heimlich para mascotas: coloca un puño debajo de su caja torácica y empuja hacia adentro y hacia arriba 3-4 veces.",
            "4. Llama a tu veterinario de emergencia inmediatamente, incluso si logras quitar el objeto."
        ]
    },
    {
        title: "Intoxicación o Envenenamiento",
        icon: <Beaker className="w-8 h-8 text-petti-accent" />,
        content: [
            "1. Identifica el producto tóxico si es posible. Guarda el envase.",
            "2. NO induzcas el vómito a menos que un veterinario te lo indique. Algunos productos pueden causar más daño al volver a pasar por el esófago.",
            "3. Llama inmediatamente a tu centro de toxicología animal o a tu veterinario de emergencia.",
            "4. Ten a mano la información sobre la edad, raza, peso de tu mascota y el tóxico ingerido."
        ]
    }
];

const AccordionItem: React.FC<{ topic: FirstAidTopic, isOpen: boolean, onClick: () => void }> = ({ topic, isOpen, onClick }) => (
    <div className="border-b border-petti-light-blue/50 dark:border-petti-light-blue/10">
        <h2>
            <button
                type="button"
                name="button"
                id="button"
                aria-label="button"
                className="flex items-center justify-between w-full p-6 font-semibold text-left text-petti-deep-blue dark:text-white"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-petti-light-blue/10 rounded-full flex items-center justify-center">
                        {topic.icon}
                    </div>
                    <span className="text-xl">{topic.title}</span>
                </div>
                <svg className={`w-6 h-6 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
        </h2>
        <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : ''}`}>
            <div className="overflow-hidden">
                <div className="p-6 pt-0">
                    <ul className="space-y-2 text-petti-deep-blue/80 dark:text-petti-base/80 list-inside">
                        {topic.content.map((step, index) => <li key={index}>{step}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);


const PrimerosAuxilios: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="first-aid" className="bg-white dark:bg-petti-deep-blue/40">
            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <FaFirstAid className="w-16 h-16 text-petti-blue" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
                        Guía Rápida de Primeros Auxilios
                    </h1>
                    <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
                        Saber cómo actuar en una emergencia puede marcar la diferencia. Aquí tienes una guía básica para situaciones comunes.
                    </p>
                </div>

                <div className="mt-12 max-w-3xl mx-auto bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl shadow-lg">
                    {topics.map((topic, index) => (
                        <AccordionItem
                            key={index}
                            topic={topic}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>

                <div className="mt-12 max-w-3xl mx-auto p-6 bg-petti-pink/20 dark:bg-petti-pink/10 border-l-4 border-petti-pink rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <BsShieldExclamation className="h-6 w-6 text-petti-pink" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-bold text-petti-deep-blue dark:text-white">AVISO IMPORTANTE</h3>
                            <div className="mt-2 text-petti-deep-blue/80 dark:text-petti-base/80">
                                <p>Esta guía no reemplaza el consejo veterinario profesional. En cualquier emergencia, tu prioridad debe ser contactar y acudir a un veterinario lo antes posible.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrimerosAuxilios;
