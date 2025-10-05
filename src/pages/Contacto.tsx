import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { FaEnvelope } from "react-icons/fa";

const Contacto: React.FC = () => {
  return (
    <div className="bg-white dark:bg-petti-deep-blue/40">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
            ¿Hablamos?
          </h1>
          <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
            Nos encantaría saber de ti. Si tienes preguntas, sugerencias o simplemente quieres saludar, este es el lugar.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column: Form and Info */}
          <div>
            {/* Contact Form */}
            <div className="bg-petti-base dark:bg-petti-deep-blue/80 p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-petti-deep-blue dark:text-white">Envíanos un mensaje</h2>
              <form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Nombre</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-white/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" required />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Correo Electrónico</label>
                    <input type="email" id="contact-email" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-white/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Asunto</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-white/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Mensaje</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-white/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" required></textarea>
                </div>
                <div className="text-right">
                  <button 
                    type="submit" 
                    name="submit"
                    id="submit"
                    aria-label="submit"
                    required
                    className="bg-petti-blue text-white px-8 py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-transform hover:scale-105 shadow-md">
                    Enviar
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-12 space-y-6">
               <div className="bg-petti-base dark:bg-petti-deep-blue/80 p-6 rounded-2xl shadow-lg flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-petti-blue/10 dark:bg-petti-light-blue/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-petti-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-petti-deep-blue dark:text-white">Nuestras Oficinas</h3>
                  <p className="text-petti-deep-blue/70 dark:text-petti-base/70">Argentina y Venezuela</p>
                </div>
              </div>
              <div className="bg-petti-base dark:bg-petti-deep-blue/80 p-6 rounded-2xl shadow-lg flex items-start gap-4">
                 <div className="flex-shrink-0 w-12 h-12 bg-petti-accent/10 dark:bg-petti-accent/10 rounded-full flex items-center justify-center">
                    <FaEnvelope className="w-6 h-6 text-petti-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-petti-deep-blue dark:text-white">Email</h3>
                  <p className="text-petti-deep-blue/70 dark:text-petti-base/70">hola@petti.com</p>
                </div>
              </div>
              <div className="bg-petti-base dark:bg-petti-deep-blue/80 p-6 rounded-2xl shadow-lg flex items-start gap-4">
                 <div className="flex-shrink-0 w-12 h-12 bg-petti-pink/10 dark:bg-petti-pink/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-petti-pink" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-petti-deep-blue dark:text-white">Teléfono</h3>
                  <p className="text-petti-deep-blue/70 dark:text-petti-base/70">(+54) 11 1234-5678</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="min-h-[500px] lg:min-h-0 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889494!2d-58.3840135847702!3d-34.6037388804593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf14188151%3A0x27244f0b76a74b26!2sObelisco!5e0!3m2!1ses!2sar!4v1622558837341!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Petti en el mapa"
              className="w-full h-full rounded-2xl shadow-lg filter grayscale-[0.7] contrast-120 opacity-80 dark:opacity-50"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;