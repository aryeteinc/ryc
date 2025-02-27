import React, { useState, useCallback, useMemo } from 'react';
import SearchBar from '../searchbar/SearchBar';
import ProjectCard from '../ProjectCardLast';
import LineaFilters from '../LineaFilters';
import type { CollectionEntry } from 'astro:content';

interface ProjectsContainerProps {
  initialProjects: CollectionEntry<'projects'>[];
  lineas: CollectionEntry<'lineas'>[];
  initialLinea?: string;
  initialSearch?: string;
}

const ProjectsContainer = ({
  initialProjects,
  lineas,
  initialLinea = '',
  initialSearch = ''
}: ProjectsContainerProps) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLinea, setSelectedLinea] = useState(initialLinea);

  // Memoize lineasMap
  const lineasMap = useMemo(() => 
    Object.fromEntries(lineas.map(linea => [linea.slug, linea])),
    [lineas]
  );

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter(project => {
      const matchesLinea = !selectedLinea || project.data.linea === selectedLinea;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        project.data.title.toLowerCase().includes(searchLower) ||
        project.data.description.toLowerCase().includes(searchLower) ||
        project.data.client.toLowerCase().includes(searchLower) ||
        (project.data.ubicacion || '').toLowerCase().includes(searchLower);
      
      return matchesLinea && matchesSearch;
    }).sort((a, b) => 
      new Date(b.data.fechaInicio).getTime() - new Date(a.data.fechaInicio).getTime()
    );
  }, [initialProjects, selectedLinea, searchQuery]);

  // Memoize handlers
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleLineaChange = useCallback((linea: string) => {
    setSelectedLinea(linea);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <header className="text-center max-w-3xl mx-auto mb-16">
        <SearchBar
          currentSearch={searchQuery}
          selectedLinea={selectedLinea}
          className="mb-8 max-w-xl mx-auto"
          onSearch={handleSearch}
        />

        <LineaFilters
          lineas={lineas}
          selectedLinea={selectedLinea}
          onLineaChange={handleLineaChange}
          className="mb-8"
        />

        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          {selectedLinea ? lineasMap[selectedLinea]?.data.title : "Nuestros Proyectos"}
        </h1>
        <p className="text-xl text-gray-600">
          {selectedLinea 
            ? lineasMap[selectedLinea]?.data.description
            : "Descubre nuestro portafolio de proyectos exitosos"}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.slug}
            project={project}
            lineaTitle={lineasMap[project.data.linea]?.data.title || ''}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            {searchQuery 
              ? `No se encontraron proyectos que coincidan con "${searchQuery}"`
              : 'No se encontraron proyectos en esta categoría.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsContainer;