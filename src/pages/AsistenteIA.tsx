import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../../types';
import { Sparkles, Send } from 'lucide-react';
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const systemInstruction = `Eres Petti, un asistente de IA amigable y experto en veterinaria y cuidado de mascotas. Tu propósito es ayudar a los dueños de mascotas a gestionar y entender mejor la salud de sus compañeros. Tu tono es cálido, profesional y educativo.

**INFORMACIÓN CLAVE DE CONOCIMIENTO:**

**1. Frecuencia de Baño:**
   - **Perros:** La frecuencia ideal varía. Como regla general:
     - **Pelo corto (ej. Beagle):** Cada 2-3 meses.
     - **Pelo medio/largo (ej. Golden Retriever, Caniche):** Cada 4-6 semanas para evitar enredos.
     - **Razas sin pelo o piel sensible:** Según recomendación veterinaria.
     - **Estilo de vida:** Perros que pasan mucho tiempo al aire libre pueden necesitar baños más frecuentes.
     - **Importante:** Bañar en exceso puede resecar la piel. Usa siempre champú específico para perros.
   - **Gatos:** Son excelentes auto-limpiadores y raramente necesitan un baño. Solo báñalos si:
     - Se han ensuciado con algo tóxico o pegajoso.
     - Tienen una condición médica que lo requiere (ej. sarna, tiña).
     - Son incapaces de asearse por sobrepeso o artritis.
     - Si es necesario, usa champú para gatos y hazlo una experiencia positiva y rápida.

**2. Calendario de Vacunación (Esquema General):**
   - **Cachorros Caninos:**
     - **6-8 semanas:** Moquillo (Distemper), Parvovirus, Hepatitis (Adenovirus).
     - **9-11 semanas:** Refuerzo de las anteriores.
     - **12-16 semanas:** Refuerzo final y, a menudo, la primera dosis de Rabia (según la ley local).
     - **Vacunas no esenciales (según riesgo):** Leptospirosis, Tos de las perreras (Bordetella), enfermedad de Lyme.
   - **Gatitos Felinos:**
     - **6-8 semanas:** Trivalente Felina (Rinotraqueítis, Calicivirus, Panleucopenia).
     - **9-11 semanas:** Refuerzo de la Trivalente.
     - **12-16 semanas:** Refuerzo final de la Trivalente y, a menudo, la primera dosis de Rabia.
     - **Vacunas no esenciales (según riesgo):** Leucemia Felina (FeLV), especialmente para gatos con acceso al exterior.
   - **Adultos (Perros y Gatos):**
     - Refuerzos anuales o cada 3 años, dependiendo de la vacuna y las recomendaciones del veterinario. La Rabia se rige por las leyes locales (anual o cada 3 años).

**REGLAS DE INTERACCIÓN:**

1.  **Conversación Natural:** No tienes información previa de la mascota. Basa tus respuestas en la información que el usuario te proporciona en la conversación. Si necesitas más detalles para dar una mejor respuesta (como especie, raza, edad), ¡pídelos! Por ejemplo: "Para darte una recomendación más precisa, ¿podrías decirme qué tipo de mascota tienes y su edad?".

2.  **Tono y Estilo:** Responde siempre de forma cálida, concisa y útil. Usa emojis de mascotas como 🐾, ❤️, 🦴 cuando sea apropiado. Estructura la información compleja en listas para facilitar la lectura.

3.  **Promociona Petti:** Cuando te pidan recomendaciones de servicios (paseadores, veterinarios, peluqueros), menciona que a través de la app Petti pueden encontrar profesionales verificados en su zona. Anima al usuario a usar el buscador.

4.  **DISCLAIMER OBLIGATORIO:** Siempre, al final de una recomendación de salud, incluye una variación de este aviso: "**Recuerda 🐾:** Esta información es una guía general. El plan de salud perfecto para tu mascota debe ser definido por un **veterinario profesional** que conozca su historial y necesidades específicas. ¡Una consulta a tiempo es el mejor cuidado!". No ofrezcas diagnósticos.

5.  **Honestidad:** Si no sabes una respuesta, dilo honestamente y redirige siempre a la consulta con un profesional. "Esa es una excelente pregunta. Para darte la respuesta más precisa, lo mejor sería consultarlo directamente con un veterinario."`;

// --- Components ---

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isModel = message.role === 'model';
    return (
        <div className={`flex items-start gap-4 ${!isModel && 'justify-end'}`}>
            {isModel && (
                <div className="flex-shrink-0 w-10 h-10 bg-petti-blue/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-petti-blue" />
                </div>
            )}
            <div className={`max-w-md p-4 rounded-2xl ${isModel ? 'bg-white dark:bg-petti-deep-blue/80 rounded-tl-none' : 'bg-petti-blue text-white rounded-br-none'}`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
        </div>
    );
};

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-petti-blue/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-petti-blue" />
        </div>
        <div className="max-w-md p-4 rounded-2xl bg-white dark:bg-petti-deep-blue/80 rounded-tl-none flex items-center gap-2">
            <span className="w-2 h-2 bg-petti-light-blue rounded-full animate-pulse delay-0"></span>
            <span className="w-2 h-2 bg-petti-light-blue rounded-full animate-pulse delay-150"></span>
            <span className="w-2 h-2 bg-petti-light-blue rounded-full animate-pulse delay-300"></span>
        </div>
    </div>
);

const PromptSuggestion: React.FC<{ text: string, onClick: (text: string) => void }> = ({ text, onClick }) => (
    <button
        onClick={() => onClick(text)}
        className="px-4 py-2 bg-white/80 dark:bg-petti-light-blue/10 border border-petti-light-blue dark:border-petti-light-blue/20 rounded-full text-sm text-petti-deep-blue dark:text-petti-base hover:bg-white dark:hover:bg-petti-light-blue/20 transition"
    >
        {text}
    </button>
);

// --- Main Page Component ---

const AsistenteIA: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const chatInstance = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                      systemInstruction: systemInstruction,
                    },
                  });
                chatRef.current = chatInstance;
                setMessages([{
                    role: 'model',
                    text: `¡Hola! Soy Petti, tu asistente veterinario de IA 🐾\n\nEstoy aquí para ayudarte con cualquier duda sobre la salud y bienestar de tu mascota. ¿En qué puedo ayudarte hoy?`
                }]);
            } catch (error) {
                console.error("Error initializing chat:", error);
                setMessages([{ role: 'model', text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta de nuevo más tarde." }]);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (prompt?: string) => {
        const messageText = prompt || userInput;
        if (!messageText.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', text: messageText };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            if (chatRef.current) {
                const response = await chatRef.current.sendMessage({ message: messageText });
                const modelMessage: ChatMessage = { role: 'model', text: response.text };
                setMessages(prev => [...prev, modelMessage]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Oops, algo salió mal. Por favor, intenta de nuevo." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestions = [
        "¿Cada cuánto debo bañar a mi perro?",
        "Háblame sobre las vacunas para cachorros",
        "¿Qué es la vacuna Trivalente Felina?",
    ];

    return (
        <div className="bg-white dark:bg-petti-deep-blue/40">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <HiChatBubbleLeftRight className="w-16 h-16 text-petti-blue" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
                        Asistente Inteligente Petti
                    </h1>
                    <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
                        Tu copiloto personal para el cuidado de mascotas, impulsado por Gemini.
                    </p>
                </div>

                <div className="mt-12 max-w-3xl mx-auto h-[70vh] flex flex-col bg-petti-base dark:bg-petti-deep-blue rounded-2xl shadow-2xl overflow-hidden">
                    <div ref={chatContainerRef} className="flex-1 p-6 space-y-6 overflow-y-auto">
                        {messages.map((msg, index) => <MessageBubble key={index} message={msg} />)}
                        {isLoading && <TypingIndicator />}
                    </div>
                    <div className="p-4 bg-white/50 dark:bg-petti-deep-blue/60 border-t border-petti-light-blue/50 dark:border-petti-light-blue/10">
                        {messages.length <= 1 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {suggestions.map(s => <PromptSuggestion key={s} text={s} onClick={handleSendMessage} />)}
                            </div>
                        )}
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-4">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Escribe tu pregunta aquí..."
                                className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-white dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !userInput.trim()}
                                className="p-3 bg-petti-blue text-white rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                aria-label="Send message"
                            >
                                <Send className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsistenteIA;