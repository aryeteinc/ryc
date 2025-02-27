import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProjectsTitle = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">
          Nuestros proyectos
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          La gran variedad de proyectos que se han realizado
        </p>
        <a 
          href="/proyectos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Ver todos los proyectos
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default ProjectsTitle;