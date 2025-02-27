import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce'; // Crearemos este hook después

interface SearchBarProps {
  currentSearch?: string;
  selectedLinea?: string;
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
  debounceTime?: number;
}

const SearchBar = ({
  currentSearch = '',
  selectedLinea,
  placeholder = 'Buscar proyectos...',
  className = '',
  onSearch,
  debounceTime = 300
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(currentSearch);
  const debouncedSearch = useDebounce(searchValue, debounceTime);

  // Actualizar URL con parámetros de búsqueda
  const updateURL = (search: string) => {
    const url = new URL(window.location.href);
    if (search) {
      url.searchParams.set('search', search);
    } else {
      url.searchParams.delete('search');
    }
    
    // Mantener el parámetro de línea si existe
    if (selectedLinea) {
      url.searchParams.set('linea', selectedLinea);
    }
    
    window.history.pushState({}, '', url.toString());
  };

  // Manejar cambios en el input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(searchValue);
    onSearch?.(searchValue);
  };

  // Efecto para el debounce
  useEffect(() => {
    updateURL(debouncedSearch);
    onSearch?.(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;