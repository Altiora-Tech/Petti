import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    quote: '¡Petti nos salvó! Encontramos una cuidadora increíble para Rocky en menos de una hora. Recibí fotos todo el fin de semana y me quedé muy tranquila.',
    author: 'Camila G.',
    petName: 'Rocky',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/100?u=camila',
  },
  {
    quote: 'Petti encontró al paseador perfecto para Luna. ¡Ahora espera ansiosa a que llegue cada tarde! La app es muy fácil de usar y segura.',
    author: 'Javier L.',
    petName: 'Luna',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/100?u=javier',
  },
  {
    quote: 'El servicio de peluquería fue excelente. El profesional fue súper amoroso con mi gato Mishi, que es muy miedoso. ¡Volveremos sin dudas!',
    author: 'Sofia R.',
    petName: 'Mishi',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/100?u=sofia',
  },
   {
    quote: 'La veterinaria a domicilio es una maravilla. Rápido, profesional y sin el estrés de mover a mis dos perros. Totalmente recomendado.',
    author: 'Martín P.',
    petName: 'Thor y Loki',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/100?u=martin',
  },
   {
    quote: 'Usé el servicio de guardería para mis vacaciones y fue la mejor decisión. Mi perra Cloe volvió feliz. La comunicación fue constante y fluida.',
    author: 'Valentina M.',
    petName: 'Cloe',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/100?u=valentina',
  },
];

const Rating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-petti-accent' : 'text-petti-light-blue/50'}`} />
        ))}
    </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = React.forwardRef<HTMLDivElement, { testimonial: Testimonial }>(({ testimonial }, ref) => (
    <div ref={ref} className="bg-white dark:bg-petti-deep-blue/80 p-8 rounded-2xl shadow-lg dark:shadow-xl h-full flex flex-col justify-between flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
        <div>
            <Rating rating={testimonial.rating} />
            <p className="text-petti-deep-blue/80 dark:text-petti-base/80 mt-4">"{testimonial.quote}"</p>
        </div>
        <div className="mt-6 flex items-center">
            <img 
              src={testimonial.avatarUrl} 
              alt={testimonial.author} 
              className="w-12 h-12 rounded-full object-cover" 
              aria-label={testimonial.author}
              width={48}
              height={48}
            />
            <div className="ml-4">
                <p className="font-bold text-petti-deep-blue dark:text-white">{testimonial.author}</p>
                <p className="text-sm text-petti-deep-blue/60 dark:text-petti-base/60">Dueño(a) de {testimonial.petName}</p>
            </div>
        </div>
    </div>
));
TestimonialCard.displayName = 'TestimonialCard';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInnerRef = useRef<HTMLDivElement>(null);
  const [slideOffset, setSlideOffset] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  const calculateMetrics = useCallback(() => {
    if (carouselInnerRef.current?.children && carouselInnerRef.current.children.length > 0) {
      if (window.innerWidth >= 1024) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 640) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }

      if (carouselInnerRef.current.children.length > 1) {
        const firstCard = carouselInnerRef.current?.children[0] as HTMLElement;
        const secondCard = carouselInnerRef.current?.children[1] as HTMLElement;
        if (firstCard && secondCard) {
          setSlideOffset(secondCard.offsetLeft - firstCard.offsetLeft);
        }
      } else {
        const firstCard = carouselInnerRef.current?.children[0] as HTMLElement;
        setSlideOffset(firstCard.offsetWidth);
      }
    }
  }, []);

  useEffect(() => {
    // Timeout to allow layout to settle before calculating
    const timeoutId = setTimeout(calculateMetrics, 100);
    const observer = new ResizeObserver(() => {
        calculateMetrics();
    });
    if (carouselRef.current) {
        observer.observe(carouselRef.current);
    }
    return () => {
        clearTimeout(timeoutId);
        if (carouselRef.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(carouselRef.current);
        }
    };
  }, [calculateMetrics, testimonials.length]);

  const maxIndex = Math.max(0, testimonials.length - visibleItems);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? maxIndex : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr >= maxIndex ? 0 : curr + 1));
  };
  
  return (
    <section id="testimonials" className="py-20 bg-petti-base dark:bg-petti-deep-blue/60">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-petti-deep-blue dark:text-white">Nuestra comunidad nos avala</h2>
          <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-2xl mx-auto">
            Historias reales de dueños felices y mascotas aún más felices.
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={carouselRef}>
             <div 
              ref={carouselInnerRef}
              className="flex gap-6 p-2 items-stretch transition-transform duration-500 ease-out dark:bg-petti-deep-blue/40"
              style={{ transform: `translateX(-${currentIndex * slideOffset}px)` }}
             >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
             </div>
          </div>
          <button 
            type="button"
            name="button"
            id="button"
            onClick={prev} 
            aria-label="Anterior testimonio" 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 dark:bg-petti-light-blue/20 dark:hover:bg-petti-light-blue/30 hover:bg-white rounded-full p-2 shadow-md transition hidden sm:block">
            <ChevronLeft className="w-6 h-6 text-petti-deep-blue dark:text-white" />
          </button>
           <button 
            type="button"
            name="button"
            id="button"
            onClick={next} 
            aria-label="Siguiente testimonio" 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 dark:bg-petti-light-blue/20 dark:hover:bg-petti-light-blue/30 hover:bg-white rounded-full p-2 shadow-md transition hidden sm:block">
            <ChevronRight className="w-6 h-6 text-petti-deep-blue dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;