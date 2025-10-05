import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfesionalesBeneficios from './pages/ProfesionalesBeneficios';
import ProfesionalesRegistro from './pages/ProfesionalesRegistro';
import ProfesionalesRequisitos from './pages/ProfesionalesRequisitos';
import Blog from './pages/Blog';
import PrimerosAuxilios from './pages/PrimerosAuxilios';
import Recomendaciones from './pages/Recomendaciones';
import Contacto from './pages/Contacto';
import AsistenteIA from './pages/AsistenteIA';
import ServicesPage from './pages/ServicesPage';
import Cuidadores from './pages/Cuidadores';
import About from './pages/About';

const routes: { [key: string]: React.ComponentType } = {
  '/': HomePage,
  '/benefits': ProfesionalesBeneficios,
  '/register': ProfesionalesRegistro,
  '/requirements': ProfesionalesRequisitos,
  '/blog': Blog,
  '/aid': PrimerosAuxilios,
  '/recommendations': Recomendaciones,
  '/contact': Contacto,
  '/petti-assistant': AsistenteIA,
  '/services': ServicesPage,
  '/sitters': Cuidadores,
  '/about': About,
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1) || '/';
      // A simple split to handle potential slug routes for blog posts, defaulting to the main blog page
      const basePath = path.startsWith('/blog/') ? '/blog' : path;
      setCurrentPath(basePath);
      window.scrollTo(0, 0);
    };

    handleHashChange(); // Set initial page correctly
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Simple routing logic
  const CurrentPage = routes[currentPath] || routes['/'];

  return (
    <div className="flex flex-col min-h-screen bg-petti-base dark:bg-petti-deep-blue">
      <Header />
      <main className="flex-grow">
        <CurrentPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;