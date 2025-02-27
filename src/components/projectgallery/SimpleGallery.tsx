import React, { useState } from 'react';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface SimpleGalleryProps {
  title: string;
  images: GalleryImage[];
}

export default function SimpleGallery({ title, images }: SimpleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filtrar imágenes inválidas
  const validImages = images?.filter(img => img && img.url && typeof img.url === 'string') || [];

  if (!images || validImages.length === 0) {
    return (
      <div className="w-full mb-10 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-red-600">{title} - No hay imágenes válidas</h3>
        <p className="text-sm text-red-500">Recibido: {JSON.stringify(images)}</p>
      </div>
    );
  }

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    // Prevenir scroll cuando el lightbox está abierto
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    // Restaurar scroll
    document.body.style.overflow = '';
  };

  return (
    <div className="w-full mb-10">
      <h3 className="text-xl font-semibold mb-6">{title} ({validImages.length} imágenes)</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {validImages.map((image, index) => (
          <div 
            key={`${image.url}-${index}`}
            className="relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => openLightbox(image)}
          >
            <img
              src={image.url}
              alt={image.alt || title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/assets/images/placeholder.svg';
              }}
            />
            {image.alt && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-50">
                <p className="text-white text-sm truncate">
                  {image.alt}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button 
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt || title}
              className="max-w-full max-h-[90vh] object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/assets/images/placeholder.svg';
              }}
            />
            {selectedImage.alt && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
                <p className="text-white text-center">
                  {selectedImage.alt}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
