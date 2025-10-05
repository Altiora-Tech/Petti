import React from 'react';

// const PettiLogoSad: React.FC<{ className?: string }> = ({ className }) => {
//   return (
//     <svg
//       width="128"
//       height="128"
//       viewBox="0 0 48 48"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//       aria-hidden="true"
//     >
//       <circle cx="24" cy="24" r="24" className="fill-petti-light-blue/50 dark:fill-petti-deep-blue" />
//       <path
//         d="M34.77,32.55c-1.16,3.48-4.6,6-8.77,6s-7.61-2.52-8.77-6c-2.7-8.11,3.23-15.42,3.23-15.42,2.3-2.65,6.17-2.65,8.47,0,0,0,5.93,7.31,5.84,15.42Z"
//         className="fill-petti-blue"
//       />
//       <circle cx="20.5" cy="23.5" r="2" className="fill-petti-deep-blue dark:fill-petti-base"/>
//       <circle cx="27.5" cy="23.5" r="2" className="fill-petti-deep-blue dark:fill-petti-base"/>
//       <path
//           d="M21 19.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5"
//           className="stroke-petti-deep-blue dark:stroke-petti-base"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//       />
//        <path
//           d="M29 19.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5"
//           className="stroke-petti-deep-blue dark:stroke-petti-base"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           transform="translate(-6, 0)"
//       />
//       {/* Sad mouth */}
//       <path
//         d="M20,32 Q24,29,28,32"
//         className="stroke-petti-deep-blue dark:stroke-petti-base"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         fill="none"
//       />
//       {/* Teardrop */}
//       <path d="M18 26 C 18 28, 16 29, 16 29 C 14 29, 14 28, 14 26 C 14 24, 16 24, 16 24 C 18 24, 18 24, 18 26 Z" className="fill-petti-blue/80 dark:fill-petti-light-blue/80" />
//     </svg>
//   );
// };


const NotFound: React.FC = () => {
  return (
    <div id="not-found" className="flex flex-col items-center justify-center text-center flex-grow py-20 px-6">
      <img 
        src="/petti404.png" 
        alt="404" 
        name="not-found"
        aria-label="not-found"
        width={128}
        height={128}
        className="w-24 h-24" 
      />
      <h1 className="mt-8 text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white">
        ¡Oh, no!
      </h1>
      <p className="mt-4 text-lg text-petti-deep-blue/70 dark:text-petti-base/70 max-w-md">
        Parece que esta página se fue de paseo. ¡No te preocupes, te ayudamos a volver a casa!
      </p>
      <a
        href="#/"
        className="mt-8 bg-petti-blue text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-transform hover:scale-105 shadow-lg"
      >
        Volver al Inicio
      </a>
    </div>
  );
};
export default NotFound;