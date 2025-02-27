import React from 'react';
import type { CollectionEntry } from 'astro:content';

interface ProjectFiltersProps {
  categories: CollectionEntry<'categories'>[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function ProjectFilters({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: ProjectFiltersProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium
            ${!selectedCategory 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Todos los proyectos
        </button>
        
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium
              ${selectedCategory === category.slug
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category.data.title}
          </button>
        ))}
      </div>
    </div>
  );
}