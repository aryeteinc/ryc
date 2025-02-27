import React from 'react';
import { Video, Camera, Calendar, MapPin, Timer } from 'lucide-react';
import type { CollectionEntry } from 'astro:content';
import ShareButtons from './ShareButtons.tsx';
import StatusBadge from './StatusBadge.tsx';

interface ProjectCardProps {
  project: CollectionEntry<'projects'>;
  lineaTitle: string;
  showGalleryCount?: boolean;
  showVideoCount?: boolean;
  className?: string;
}

const ProjectCard = ({
  project,
  lineaTitle,
  showGalleryCount = true,
  showVideoCount = true,
  className = ''
}: ProjectCardProps) => {
  const {
    title,
    description,
    image,
    client,
    fechaInicio,
    fechaFinalizacion,
    ubicacion,
    status,
    duracion,
    galeriaBefore,
    galeriaAfter,
    videos
  } = project.data;

  const totalGalleryImages = (galeriaBefore?.length || 0) + (galeriaAfter?.length || 0);
  const hasGallery = totalGalleryImages > 0;
  const hasVideos = videos && videos.length > 0;

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  // Calculate duration or use provided duration
  const projectDuration = duracion || (fechaFinalizacion ? 
    `${Math.ceil((fechaFinalizacion.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24 * 30))} meses` : 
    'En proceso');

  const path_proyectos = import.meta.env.PUBLIC_PATH_PROJECTS;
  const path_linea = `/lineas/${lineaTitle.toLowerCase().replace(/ /g, '-')}`;

  return (
    <article className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${className}`}>
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
        </div>

        
        <StatusBadge 
          status={status} 
          className="absolute bottom-4 right-4" 
          showIcon={true}
          size="sm"
        />

        <div className="absolute top-4 right-4 flex gap-2">
          {showGalleryCount && hasGallery && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-white/90 backdrop-blur-sm text-gray-700">
              <Camera size={14} className="mr-1" />
              {totalGalleryImages}
            </span>
          )}
          {showVideoCount && hasVideos && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-white/90 backdrop-blur-sm text-gray-700">
              <Video size={14} className="mr-1" />
              {videos.length}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors break-words hyphens-auto overflow-hidden line-clamp-2">
          <a href={`${path_proyectos}/${project.slug}`}>
            {title}
          </a>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-y-2 items-center text-sm text-gray-500 mb-4">
          <span className="font-medium">{client}</span>
          <span className="mx-2">·</span>
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(fechaInicio)}
          </span>
          {ubicacion && (
            <>
              <span className="mx-2">·</span>
              <span className="flex items-center">
                <MapPin size={14} className="mr-1" />
                {ubicacion}
              </span>
            </>
          )}
          {duracion && (
            <>
              <span className="mx-2">·</span>
              <span className="flex items-center">
                <Timer size={14} className="mr-1" />
                {projectDuration}
              </span>
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <a 
            href={`${path_proyectos}/${project.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Ver Detalles →
          </a>
          <ShareButtons 
            path={`${path_proyectos}/${project.slug}`}
            title={title}
            className="flex gap-1"
          />
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;