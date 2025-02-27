import React from 'react';
import EnhancedGallery from './EnhancedGallery';

interface GalleryImage {
  url: string;
  alt?: string;
  thumbnail?: string;
}

interface ModernProjectGalleryProps {
  title?: string;
  subtitle?: string;
  description?: string;
  images: GalleryImage[];
  className?: string;
}

export default function ModernProjectGallery({
  title,
  subtitle,
  description,
  images,
  className = ''
}: ModernProjectGalleryProps) {
  
  // Si no hay imágenes, no renderizamos nada
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`w-full project-gallery-container ${className}`}>
      {/* Encabezado de la galería con título y subtítulo */}
      <div className="gallery-header mb-6">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        )}
        {subtitle && (
          <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-3">{subtitle}</h3>
        )}
        {description && (
          <p className="text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>

      {/* Galería mejorada */}
      <EnhancedGallery 
        images={images} 
        className="mb-10"
      />

      <style jsx>{`
        .project-gallery-container {
          position: relative;
          padding: 1rem 0;
        }
        
        @media (min-width: 768px) {
          .project-gallery-container {
            padding: 2rem 0;
          }
        }
      `}</style>
    </div>
  );
}
