import React from 'react';
import type { CollectionEntry } from 'astro:content';

interface ProjectGridProps {
  projects: CollectionEntry<'projects'>[];
  categories: Map<string, CollectionEntry<'categories'>>;
}

export default function ProjectGrid({ projects, categories }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const category = categories.get(project.data.category);
        
        return (
          <a 
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
          >
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.data.image} 
                    alt={project.data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {project.data.status !== 'completed' && (
                  <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-medium
                    backdrop-blur-md
                    ${project.data.status === 'in-progress' 
                      ? 'bg-blue-500/80 text-white' 
                      : 'bg-gray-500/80 text-white'}`}>
                    {project.data.status === 'in-progress' ? '⚡ En Progreso' : '🔜 Planificado'}
                  </div>
                )}
              </div>

              <div className="p-6">
                {category && (
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {category.data.title}
                  </div>
                )}

                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {project.data.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.data.description}
                </p>

                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium">{project.data.client}</span>
                  <span className="mx-2">·</span>
                  <time className="font-medium">
                    {new Date(project.data.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </time>
                </div>

                {project.data.technologies && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.data.technologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </a>
        );
      })}
    </div>
  );
}