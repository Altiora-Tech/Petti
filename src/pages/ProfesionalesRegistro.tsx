import React from 'react';

const ProfesionalesRegistro: React.FC = () => {
  const services = ['Paseos', 'Peluquería', 'Veterinaria', 'Guardería y Alojamiento'];

  return (
    <div id="professionals-registration" className="bg-petti-base dark:bg-petti-deep-blue">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white">
              Conviértete en un cuidador Petti
            </h1>
            <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
              Completa el formulario para comenzar. Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo.
            </p>
          </div>

          <form className="mt-12 bg-white dark:bg-petti-deep-blue/40 p-8 md:p-12 rounded-2xl shadow-xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-petti-deep-blue dark:text-white">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Nombre Completo</label>
                  <input type="text" id="fullName" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-petti-base/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Correo Electrónico</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-petti-base/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" required />
                </div>
                 <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Teléfono</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-petti-base/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" required />
                </div>
                 <div>
                  <label htmlFor="city" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mb-2">Ciudad</label>
                  <input type="text" id="city" className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-petti-base/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" required />
                </div>
              </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-petti-deep-blue dark:text-white">Servicios Ofrecidos</h2>
                <p className="text-sm text-petti-deep-blue/70 dark:text-petti-base/70 mt-1">Selecciona todos los que apliquen.</p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <div key={service}>
                            <input type="checkbox" id={service} name="services" value={service} className="hidden peer" />
                            <label htmlFor={service} className="block text-center px-4 py-3 rounded-xl border border-petti-light-blue dark:text-petti-base/70 dark:border-petti-light-blue/20 cursor-pointer peer-checked:bg-petti-blue peer-checked:text-white peer-checked:border-petti-blue transition">
                                {service}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-petti-deep-blue dark:text-white">Tu Experiencia</h2>
                 <label htmlFor="experience" className="block text-sm font-medium text-petti-deep-blue/80 dark:text-petti-base/80 mt-6 mb-2">Cuéntanos sobre ti y tu experiencia con mascotas</label>
                 <textarea id="experience" rows={5} className="w-full px-4 py-3 rounded-xl border border-petti-light-blue dark:border-petti-light-blue/20 bg-petti-base/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-2 focus:ring-petti-blue transition" placeholder="Ej: He sido paseador de perros por 3 años, tengo experiencia con razas grandes y pequeñas..."></textarea>
            </div>

            <div className="text-center pt-4">
                 <button 
                  type="submit" 
                  name="button"
                  id="button"
                  aria-label="button"
                  required
                  className="bg-petti-blue text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-transform hover:scale-105 shadow-lg">
                    Enviar Solicitud
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfesionalesRegistro;