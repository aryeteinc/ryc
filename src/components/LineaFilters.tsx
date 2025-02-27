import React from 'react';
import type { CollectionEntry } from 'astro:content';

interface LineaFiltersProps {
  lineas: CollectionEntry<'lineas'>[];
  selectedLinea?: string;
  currentSearch?: string;
  className?: string;
  onLineaChange?: (linea: string) => void;
}

const LineaFilters: React.FC<LineaFiltersProps> = ({
  lineas,
  selectedLinea,
  currentSearch = '',
  className = '',
  onLineaChange
}) => {
  const getFilterUrl = (linea?: string) => {
    const params = new URLSearchParams();
    if (linea) params.set('linea', linea);
    if (currentSearch) params.set('search', currentSearch);
    return `/projects${params.toString() ? `?${params}` : ''}`;
  };

  const handleLineaClick = (linea?: string) => {
    if (onLineaChange) {
      onLineaChange(linea || '');
    } else {
      window.location.href = getFilterUrl(linea);
    }
  };

  return (
    <nav className={`flex justify-center gap-4 flex-wrap ${className}`}>
      <button
        onClick={() => handleLineaClick()}
        className={`px-4 py-2 rounded-full transition-colors ${
          !selectedLinea 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        Todos
      </button>
      {lineas.map(linea => (
        <button
          key={linea.slug}
          onClick={() => handleLineaClick(linea.slug)}
          className={`px-4 py-2 rounded-full transition-colors ${
            linea.slug === selectedLinea 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {linea.data.title}
        </button>
      ))}
    </nav>
  );
};

export default LineaFilters;