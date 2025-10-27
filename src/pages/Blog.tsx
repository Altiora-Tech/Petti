import React from 'react';
import { BlogArticle } from '../types';

const articles: BlogArticle[] = [
  {
    slug: 'como-elegir-juguete-perfecto',
    category: 'Bienestar',
    title: 'Cómo elegir el juguete perfecto para la personalidad de tu perro',
    author: 'Dr. Lucas Marín',
    date: '15 de Julio, 2025',
    imageUrl: 'https://i.ibb.co/bRRjFBkm/juegue.jpg',
    excerpt: 'No todos los juguetes son iguales. Aprende a identificar qué tipo de juguete estimulará mejor a tu perro según su raza, edad y nivel de energía.'
  },
  {
    slug: 'ansiedad-por-separacion',
    category: 'Comportamiento',
    title: 'Ansiedad por separación: Señales y cómo ayudar a tu mascota',
    author: 'Ana Torres, Etóloga',
    date: '10 de Julio, 2025',
    imageUrl: 'https://i.ibb.co/xtw53Kjs/tierur.jpg',
    excerpt: '¿Tu perro se estresa cuando te vas? Descubre las señales clave de la ansiedad por separación y estrategias efectivas para darle tranquilidad.'
  },
  {
    slug: 'introducir-gato-nuevo',
    category: 'Convivencia',
    title: 'El arte de las presentaciones: Cómo introducir un nuevo gato en casa',
    author: 'Equipo Petti',
    date: '5 de Julio, 2025',
    imageUrl: 'https://i.ibb.co/847j0p7Q/gatito.jpg',
    excerpt: 'Traer un nuevo felino a casa es un proceso delicado. Sigue estos pasos para asegurar una transición suave y una amistad duradera.'
  },
  {
    slug: 'beneficios-paseos-diarios',
    category: 'Salud',
    title: 'Más que un paseo: Los beneficios ocultos de la caminata diaria',
    author: 'Dr. Lucas Marín',
    date: '1 de Julio, 2025',
    imageUrl: 'https://i.ibb.co/gL5NCtHk/pasosee.jpg',
    excerpt: 'Exploramos cómo los paseos diarios impactan positivamente no solo en la salud física de tu perro, sino también en su bienestar mental y social.'
  }
];

const featuredArticle = articles[0];
const recentArticles = articles.slice(1);

const Blog: React.FC = () => {
  return (
    <div id="blog" className="bg-white dark:bg-petti-deep-blue/40">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-petti-deep-blue dark:text-white leading-tight">
            El Blog de Petti
          </h1>
          <p className="mt-6 text-lg text-petti-deep-blue/70 dark:text-petti-base/70">
            Consejos de expertos, historias conmovedoras y las últimas novedades en el mundo del cuidado de mascotas.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mt-16">
          <a href={`/blog/${featuredArticle.slug}`} className="block group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="overflow-hidden rounded-xl">
                <img 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title} 
                  name="featuredArticle"
                  aria-label="featuredArticle"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div>
                <span className="text-sm font-bold text-petti-blue uppercase">{featuredArticle.category}</span>
                <h2 className="mt-2 text-3xl font-bold text-petti-deep-blue dark:text-white group-hover:text-petti-blue transition-colors">{featuredArticle.title}</h2>
                <p className="mt-4 text-petti-deep-blue/70 dark:text-petti-base/70">{featuredArticle.excerpt}</p>
                <div className="mt-4 text-sm text-petti-deep-blue/60 dark:text-petti-base/60">
                  <span>Por {featuredArticle.author}</span> &bull; <span>{featuredArticle.date}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
        
        {/* Recent Articles */}
        <div className="mt-20">
            <h3 className="text-3xl font-bold text-petti-deep-blue dark:text-white mb-8">Artículos Recientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentArticles.map(article => (
                    <a href={`/blog/${article.slug}`} key={article.slug} className="block group bg-petti-base dark:bg-petti-deep-blue/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="overflow-hidden">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title} 
                              name="article"
                              aria-label="article"
                              width={500}
                              height={500}
                              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-bold text-petti-pink uppercase">{article.category}</span>
                            <h4 className="mt-2 text-xl font-bold text-petti-deep-blue dark:text-white group-hover:text-petti-blue transition-colors">{article.title}</h4>
                            <p className="mt-3 text-sm text-petti-deep-blue/60 dark:text-petti-base/60">Por {article.author}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Blog;
