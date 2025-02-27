import React, { useState, useEffect, useRef } from 'react';
import LightGallery from 'lightgallery/react';

// Importar plugins
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgRotate from 'lightgallery/plugins/rotate';

// Importar estilos
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-rotate.css';

interface GalleryImage {
  url: string;
  alt?: string;
  thumbnail?: string;
  caption?: string;
}

interface ProjectDetailGalleryProps {
  title?: string;
  subtitle?: string;
  description?: string;
  images: GalleryImage[];
  className?: string;
}

export default function ProjectDetailGallery({
  title,
  subtitle,
  description,
  images,
  className = ''
}: ProjectDetailGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const lightGalleryRef = useRef<any>(null);
  
  // Si no hay imágenes, no renderizamos nada
  if (!images || images.length === 0) {
    return null;
  }

  // Asegurar que las URLs de las imágenes son válidas
  const validImages = images.filter(img => img.url && typeof img.url === 'string');
  
  // Si no hay imágenes válidas después del filtrado, no renderizamos nada
  if (validImages.length === 0) {
    return null;
  }

  // Función para abrir la galería en una imagen específica
  const openGallery = (index: number) => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
    }
  };

  return (
    <div className={`w-full project-detail-gallery ${className}`}>
      {/* Encabezado de la galería */}
      <div className="gallery-header mb-8">
        {title && (
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        )}
        {subtitle && (
          <h3 className="text-xl font-medium text-gray-600 mb-3">{subtitle}</h3>
        )}
        {description && (
          <p className="text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>

      {/* Vista principal y miniaturas */}
      <div className="gallery-container flex flex-col lg:flex-row gap-4">
        {/* Imagen principal */}
        <div className="main-image-container lg:w-3/4 relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={validImages[selectedImage].url}
            alt={validImages[selectedImage].alt || title || 'Project image'}
            className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
            onClick={() => openGallery(selectedImage)}
          />
          
          {/* Botón de zoom */}
          <button 
            className="absolute bottom-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-90 p-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
            onClick={() => openGallery(selectedImage)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
          
          {/* Leyenda de la imagen si existe */}
          {validImages[selectedImage].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 transition-opacity duration-300">
              <p>{validImages[selectedImage].caption}</p>
            </div>
          )}
        </div>
        
        {/* Miniaturas */}
        <div className="thumbnails-container lg:w-1/4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0">
          {validImages.map((image, index) => (
            <div 
              key={index}
              className={`thumbnail-item min-w-[100px] h-[100px] rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${selectedImage === index ? 'ring-2 ring-blue-500 shadow-lg' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.thumbnail || image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LightGallery (oculto pero funcional) */}
      <div className="hidden">
        <LightGallery
          elementClassNames="custom-lightgallery"
          plugins={[lgZoom, lgThumbnail, lgFullscreen, lgRotate]}
          mode="lg-fade"
          speed={500}
          onInit={(detail) => {
            if (detail) {
              lightGalleryRef.current = detail.instance;
            }
          }}
          zoomFromOrigin={true}
          download={false}
          counter={true}
          slideDelay={400}
          thumbWidth={100}
          thumbHeight={100}
          thumbMargin={10}
          showThumbByDefault={true}
          allowMediaOverlap={true}
          toggleThumb={true}
          closable={true}
          showMaximizeIcon={true}
          actualSize={true}
          autoplayFirstVideo={false}
          videojs={false}
          videojsOptions={{}}
          dynamic={true}
          dynamicEl={validImages.map(image => ({
            src: image.url,
            thumb: image.thumbnail || image.url,
            subHtml: `
              <div class="lightGallery-captions">
                <h4>${image.alt || title || ''}</h4>
                ${image.caption ? `<p>${image.caption}</p>` : ''}
              </div>
            `,
          }))}
        />
      </div>

      <style jsx>{`
        .project-detail-gallery {
          position: relative;
          padding: 1rem 0;
        }
        
        @media (min-width: 768px) {
          .project-detail-gallery {
            padding: 2rem 0;
          }
        }
        
        /* Estilos para la barra de desplazamiento de miniaturas */
        .thumbnails-container::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .thumbnails-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .thumbnails-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        
        .thumbnails-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Estilos para LightGallery */
        :global(.lg-backdrop) {
          background-color: rgba(0, 0, 0, 0.9);
        }
        
        :global(.lg-toolbar .lg-icon),
        :global(.lg-actions .lg-next), 
        :global(.lg-actions .lg-prev) {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          transition: all 0.3s ease;
        }
        
        :global(.lg-toolbar .lg-icon:hover),
        :global(.lg-actions .lg-next:hover), 
        :global(.lg-actions .lg-prev:hover) {
          background-color: rgba(255, 255, 255, 0.4);
        }
        
        :global(.lg-outer .lg-thumb-item.active), 
        :global(.lg-outer .lg-thumb-item:hover) {
          border-color: #3b82f6;
        }
        
        :global(.lightGallery-captions) {
          text-align: center;
          max-width: 80%;
          margin: 0 auto;
        }
        
        :global(.lightGallery-captions h4) {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        
        :global(.lightGallery-captions p) {
          font-size: 1rem;
          color: #ccc;
        }
      `}</style>
    </div>
  );
}
