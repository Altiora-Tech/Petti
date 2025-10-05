import React from 'react';

const partners = [
  { name: 'PetCare', logo: 'https://i.ibb.co/jZq3szRq/royalpetslogo.png' },
  { name: 'Happy Paws', logo: 'https://i.ibb.co/1tf12ngK/animalialogo.png' },
  { name: 'VetConnect', logo: 'https://i.ibb.co/9mvB92yk/petsafelogo.png' },
  { name: 'Groomify', logo: 'https://i.ibb.co/hxfHzs5C/groomfylogo.png' },
  { name: 'PetSafe', logo: 'https://i.ibb.co/9kypkphQ/petconnectlogo.png' },
  { name: 'Animalia', logo: 'https://i.ibb.co/dJM0vc1x/happypawslogo.png' },
  { name: 'Royal Pets', logo: 'https://i.ibb.co/LdbyFTtr/petcarelogo.png' }, 
];

const Partners: React.FC = () => {
  const allPartners = [...partners, ...partners]; 

  return (
    <section id="partners" className="py-20 bg-petti-slider dark:bg-petti-deep-blue/60">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">Nuestros Partners de Confianza</h2>
        <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-2xl mx-auto">
          Colaboramos con las mejores empresas para ofrecerte un servicio excepcional.
        </p>
        <div className="mt-12 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
          <div className="flex items-center justify-center md:justify-start animate-scroll hover:[animation-play-state:paused]">
            {allPartners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex-shrink-0 mx-8">
                <img
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 dark:invert"
                  src={partner.logo}
                  name={partner.name}
                  aria-label={partner.name}
                  width={500}
                  height={500}
                  alt={partner.name}
                  aria-hidden="true" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;