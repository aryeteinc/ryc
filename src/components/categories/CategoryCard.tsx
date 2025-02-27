import React from 'react';
import type { CollectionEntry } from 'astro:content';

interface CategoryCardProps {
  category: CollectionEntry<'categories'>;
  projectCount: number;
}

export default function CategoryCard({ category, projectCount }: CategoryCardProps) {
  // Cambiamos la construcción de la URL para asegurar que el parámetro sea correcto
  const projectsUrl = `/projects/?selectedCategory=${encodeURIComponent(category.slug)}`;

  return (
    <a 
      href={projectsUrl}
      className="group block"
    >
      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={category.data.image} 
              alt={category.data.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-200 transition-colors">
              {category.data.title}
            </h2>
            <p className="text-white/90 mb-3 line-clamp-2">
              {category.data.description}
            </p>
            
            <div className="flex items-center text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {projectCount} {projectCount === 1 ? 'Proyecto' : 'Proyectos'}
              </span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}