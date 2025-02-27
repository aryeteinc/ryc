import React from 'react';
import { Building, Calendar, MapPin, User, Tag } from 'lucide-react';
import ProjectGallery from './ProjectGallery';
import { hasValue } from '../utils/markdownUtils';

// Interfaces
interface GalleryImage {
  url: string;
  alt?: string;
}

interface ProjectData {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  client?: string;
  author?: string;
  area?: string;
  images?: GalleryImage[];
  tags?: string[];
}

interface ProjectDisplayProps {
  data: ProjectData;
}

// Componente principal para mostrar información del proyecto
export default function ProjectDisplay({ data }: ProjectDisplayProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Título */}
      {hasValue(data.title) && (
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      )}
      
      {/* Descripción */}
      {hasValue(data.description) && (
        <p className="text-gray-700 mb-6">{data.description}</p>
      )}
      
      {/* Metadatos principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Cliente */}
        {hasValue(data.client) && (
          <div className="flex items-start">
            <Building className="w-6 h-6 text-gray-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
              <p className="text-gray-900">{data.client}</p>
            </div>
          </div>
        )}
        
        {/* Ubicación */}
        {hasValue(data.location) && (
          <div className="flex items-start">
            <MapPin className="w-6 h-6 text-gray-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Ubicación</h3>
              <p className="text-gray-900">{data.location}</p>
            </div>
          </div>
        )}
        
        {/* Superficie */}
        {hasValue(data.area) && (
          <div className="flex items-start">
            <Tag className="w-6 h-6 text-gray-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Superficie</h3>
              <p className="text-gray-900">{data.area}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Metadatos secundarios */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Fecha */}
        {hasValue(data.date) && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{data.date}</span>
          </div>
        )}
        
        {/* Autor */}
        {hasValue(data.author) && (
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-1" />
            <span>{data.author}</span>
          </div>
        )}
      </div>
      
      {/* Tags */}
      {hasValue(data.tags) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {data.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Galería de imágenes */}
      {hasValue(data.images) && (
        <ProjectGallery 
          title="Galería del Proyecto" 
          images={data.images} 
        />
      )}
    </div>
  );
}