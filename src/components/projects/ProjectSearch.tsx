import React from 'react';
import { Search } from 'lucide-react';

interface ProjectSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function ProjectSearch({ searchTerm, onSearchChange }: ProjectSearchProps) {
  return (
    <div className="relative max-w-xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar proyectos por título, descripción o tecnologías..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );
}