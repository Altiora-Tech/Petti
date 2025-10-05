import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../../types';
import { Sparkles, Send } from 'lucide-react';
import { HiChatBubbleLeftRight } from "react-icons/hi2";

// --- Mock Data ---
const petProfile = {
  name: 'Nala',
  type: 'Perro',
  breed: 'Golden Retriever',
  age: '3 años',
  vaccines: {
    lastRabies: '2023-08-20',
    nextRabies: '2024-08-20',
  },
  allergies: ['Pollo'],
  notes: 'Le encanta jugar a buscar la pelota y es muy sociable con otros perros.'
};

const systemInstruction = `Eres Petti, un asistente de IA amigable y experto en el cuidado de mascotas. Tu propósito es ayudar a los dueños de mascotas a gestionar el cuidado de sus compañeros.
    
    Aquí está la información de la mascota del usuario actual:
    - Nombre: ${petProfile.name}
    - Especie: ${petProfile.type}
    - Raza: ${petProfile.breed}
    - Edad: ${petProfile.age}
    - Próxima vacuna de rabia: ${petProfile.vaccines.nextRabies}
    - Alergias: ${petProfile.allergies.join(', ')}
    - Notas: ${petProfile.notes}

    Reglas:
    1. Responde siempre de forma cálida, concisa y útil. Usa emojis de mascotas como 🐾, ❤️, 🦴 cuando sea apropiado.
    2. Utiliza la información de la mascota proporcionada para responder preguntas personalizadas.
    3. Cuando te pidan recomendaciones de servicios (paseadores, veterinarios, etc.), menciona que Petti puede encontrar profesionales verificados cercanos y anima al usuario a usar el buscador de la app. Si preguntan por filtros como métodos de pago, confirma que la app permite filtrar la búsqueda. No inventes nombres de profesionales.
    4. Si no sabes una respuesta, dilo honestamente y sugiere consultar a un veterinario profesional.
    5. Mantén las respuestas relativamente cortas y fáciles de leer, usando párrafos cortos o listas.`;

// --- Components ---

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isModel = message.role === 'model';
    return (
        <div id="petti-assistant" className={`flex items-start gap-4 ${!isModel && 'justify-end'}`}>
            {isModel && (
                <div className="flex-shrink-0 w-10 h-10 bg-petti-blue/20 rounded-full flex items-center justify-center">
                    <img 
                        src="/pettiai.png" 
                        alt="Petti AI"
                        name="pettiai"
                        aria-label="pettiai"
                        width={500}
                        height={500}
                        className="w-12 h-auto" />
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
        type="button"
        name="button"
        id="button"
        onClick={() => onClick(text)}
        aria-label="button"
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
                    text: `¡Hola! Soy Petti, tu asistente inteligente \n\nEstoy aquí para ayudarte con todo lo relacionado al cuidado de ${petProfile.name}. ¿En qué te puedo ayudar hoy?`
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
        `¿Cuándo es la próxima vacuna de ${petProfile.name}?`,
        "Encuéntrame un paseador para mañana",
        "¿Qué comida me recomiendas para Nala?",
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
                                required
                                placeholder="Escribe tu pregunta aquí..."
                                className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-white dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition"
                                disabled={isLoading}
                            />
                            <button
                                name="button"
                                id="button"
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