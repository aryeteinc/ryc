import React, { useEffect, useRef } from 'react';
import LightGallery from 'lightgallery/react';

// Importar plugins
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';

// Importar estilos
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';

// Importar componentes de Swiper para la vista previa
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

interface GalleryImage {
  url: string;
  alt?: string;
  thumbnail?: string; // URL de miniatura opcional
}

interface EnhancedGalleryProps {
  title?: string;
  images: GalleryImage[];
  className?: string;
}

// Función auxiliar para verificar si un valor existe y no está vacío
function hasValue(value: any): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

export default function EnhancedGallery({ title, images, className = '' }: EnhancedGalleryProps) {
  const lightGalleryRef = useRef<any>(null);
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);
  
  // Generar un ID único para esta galería
  const galleryId = hasValue(title)
    ? 'gallery-' + title.replace(/\s+/g, '-').toLowerCase() 
    : 'gallery-' + Math.random().toString(36).substring(2, 9);

  // Si no hay imágenes, no renderizamos nada
  if (!hasValue(images)) {
    return null;
  }

  // Función para abrir la galería en una imagen específica
  const openGallery = (index: number) => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
    }
  };

  // Asegurar que las URLs de las imágenes son válidas
  const validImages = images.filter(img => img.url && typeof img.url === 'string');

  return (
    <div className={`w-full relative flex flex-col ${className}`}>
      {/* Título de la galería */}
      {hasValue(title) && (
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      )}
      
      {/* Vista previa con Swiper */}
      <div className="preview-gallery mb-6 relative">
        {/* Botones de navegación */}
        <div 
          ref={navigationPrevRef}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md cursor-pointer transition-all duration-200 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </div>
        <div 
          ref={navigationNextRef}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md cursor-pointer transition-all duration-200 flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
          }}
          className="w-full gallery-swiper"
        >
          {validImages.map((image, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <div 
                className="w-72 h-48 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => openGallery(index)}
              >
                <img
                  src={image.thumbnail || image.url}
                  alt={hasValue(image.alt) ? image.alt : (hasValue(title) ? title : 'Project image')}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="transform scale-0 hover:scale-100 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* LightGallery (oculto pero funcional) */}
      <div className="hidden">
        <LightGallery
          elementClassNames="custom-lightgallery"
          plugins={[lgZoom, lgThumbnail, lgFullscreen]}
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
          showThumbByDefault={false}
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
            subHtml: `<h4>${image.alt || title || ''}</h4>`,
          }))}
        />
      </div>

      <style jsx>{`
        .gallery-swiper {
          padding: 0 10px;
        }
        :global(.custom-bullet) {
          width: 8px;
          height: 8px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        :global(.custom-bullet-active) {
          background-color: #000;
          width: 10px;
          height: 10px;
        }
        :global(.lg-backdrop) {
          background-color: rgba(0, 0, 0, 0.85);
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
          border-color: #fff;
        }
      `}</style>
    </div>
  );
}
