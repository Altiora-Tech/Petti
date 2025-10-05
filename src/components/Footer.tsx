import React from 'react';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="text-petti-deep-blue/60 dark:text-petti-base/60 hover:text-petti-blue dark:hover:text-white transition-colors">{children}</a>
);

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-petti-base dark:bg-petti-deep-blue/95 border-t border-petti-light-blue/20 dark:border-petti-light-blue/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
          <img 
            src="/pettilogo.png"
            aria-label="Logo Petti"
            name="Logo Petti"
            alt="Logo Petti"
            width={500}
            height={500}
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
          />
          <h3 className="text-lg sm:text-xl font-extrabold text-petti-blue dark:text-white leading-tight">
            Petti App
          </h3>
        </div>
            <p className="mt-4 text-petti-deep-blue/60 dark:text-petti-base/60 text-sm">
              Conectando amor y cuidado para tu mascota.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-petti-deep-blue dark:text-white">Para Dueños</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink href="#/services" className="text-md">Servicios</FooterLink></li>
              <li><FooterLink href="#/sitters" className="text-md">Cuidadores</FooterLink></li>
              <li><FooterLink href="#/petti-assistant" className="text-sm">Asistente de IA</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-petti-deep-blue dark:text-white">Para Profesionales</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink href="#/requirements" className="text-md">Requisitos</FooterLink></li>
              <li><FooterLink href="#/benefits" className="text-md">Beneficios</FooterLink></li>
              <li><FooterLink href="#/aid" className="text-sm">Primeros Auxilios</FooterLink></li>
              {/* <li><FooterLink href="#/register" className="text-md">Registrarse</FooterLink></li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-petti-deep-blue dark:text-white">Recursos</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink href="#/blog" className="text-md">Blog</FooterLink></li>
              <li><FooterLink href="#/recommendations" className="text-sm">Recomendaciones</FooterLink></li>
              <li><FooterLink href="#/contact" className="text-sm">Contacto</FooterLink></li>
            </ul>
          </div>
           <div className="col-span-2 md:col-span-4 lg:col-span-1">
             <h3 className="font-bold text-petti-deep-blue dark:text-white">Suscríbete</h3>
             <p className="mt-4 text-petti-deep-blue/60 dark:text-petti-base/60 text-sm">Recibe consejos y ofertas especiales directo en tu correo.</p>
             <form className="mt-4 flex">
                <input type="email" placeholder="tu@email.com" className="w-full px-4 py-2 rounded-l-lg border border-petti-light-blue dark:border-petti-light-blue/20 bg-white/50 dark:bg-petti-light-blue/10 focus:outline-none focus:ring-1 focus:ring-petti-blue"/>
                <button 
                  type="submit"
                  name="submit"
                  aria-label="submit"
                  id="submit"
                  required
                  className="bg-petti-blue text-white px-4 py-2 rounded-r-lg font-bold hover:opacity-90 flex-shrink-0"
                  >
                    Ir
                </button>
             </form>
           </div>
        </div>
        <div className="mt-12 pt-8 border-t border-petti-light-blue/20 dark:border-petti-light-blue/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-petti-deep-blue/50 dark:text-petti-base/50">
            &copy; {new Date().getFullYear()} Petti. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#!" className="text-petti-deep-blue/60 dark:text-petti-base/60 hover:text-petti-blue dark:hover:text-white"><Twitter className="w-6 h-6" /></a>
            <a href="#!" className="text-petti-deep-blue/60 dark:text-petti-base/60 hover:text-petti-blue dark:hover:text-white"><Instagram className="w-6 h-6" /></a>
            <a href="#!" className="text-petti-deep-blue/60 dark:text-petti-base/60 hover:text-petti-blue dark:hover:text-white"><Facebook className="w-6 h-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;