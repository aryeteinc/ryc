import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ProjectGalleryProps {
  title: string;
  images: GalleryImage[];
}

export default function ProjectGallery({ title, images }: ProjectGalleryProps) {
  React.useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + title.replace(/\s+/g, '-').toLowerCase(),
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div 
        className="gallery-container" 
        id={title.replace(/\s+/g, '-').toLowerCase()}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation
          pagination={{ clickable: true }}
          className="w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <a
                href={image.url}
                data-pswp-width={1500}
                data-pswp-height={1000}
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-72 h-48 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt || title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}