/**
 * Utilidad para precachear imágenes críticas
 * 
 * Este script se encarga de precachear las imágenes críticas de la aplicación
 * para mejorar la experiencia de usuario en navegaciones posteriores
 */

import { ImageCache } from './imageCache';

// Lista de imágenes críticas que deben precachearse
// Estas son imágenes que se muestran en la página de inicio y páginas principales
const CRITICAL_IMAGES = [
  // Imágenes de la página de inicio (ajustar según las imágenes reales del sitio)
  '/images/hero-background.jpg',
  '/images/logo-full.png',
  '/images/solo-logo.png',
  
  // Iconos y elementos de UI comunes
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/icon-192x192.png',
  
  // Añadir aquí otras imágenes críticas
];

/**
 * Precachea todas las imágenes críticas
 */
export async function preloadCriticalImages(): Promise<void> {
  const imageCache = ImageCache.getInstance();
  
  try {
    console.log('Precacheando imágenes críticas...');
    await imageCache.preCacheMultiple(CRITICAL_IMAGES);
    console.log('Imágenes críticas precacheadas con éxito');
  } catch (error) {
    console.error('Error al precachear imágenes críticas:', error);
  }
}

/**
 * Precachea imágenes de una página específica
 * @param pageUrl URL de la página a precachear
 */
export async function preloadPageImages(pageUrl: string): Promise<void> {
  if (!pageUrl || !pageUrl.startsWith('/')) return;
  
  const imageCache = ImageCache.getInstance();
  const fullUrl = window.location.origin + pageUrl;
  
  try {
    // Usar fetch para obtener el HTML de la página
    const response = await fetch(fullUrl);
    const html = await response.text();
    
    // Parsear el HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extraer todas las imágenes
    const images = doc.querySelectorAll('img');
    const imageUrls = Array.from(images)
      .map(img => img.src)
      .filter(src => src && src.trim() !== '');
    
    // Precachear las imágenes (limitado a 10 para no sobrecargar)
    const imagesToPreCache = imageUrls.slice(0, 10);
    await imageCache.preCacheMultiple(imagesToPreCache);
    
    console.log(`Imágenes de ${pageUrl} precacheadas con éxito`);
  } catch (error) {
    console.error(`Error al precachear imágenes de ${pageUrl}:`, error);
  }
}

/**
 * Inicializa el sistema de precarga
 * - Precachea imágenes críticas
 * - Configura listeners para precachear páginas cuando el usuario hace hover en enlaces
 */
export function initPreloadSystem(): void {
  // Precachear imágenes críticas al inicio
  window.addEventListener('load', () => {
    // Esperar a que la página termine de cargar completamente
    setTimeout(() => {
      preloadCriticalImages();
    }, 2000); // Retrasar 2 segundos para no competir con la carga inicial
  });
  
  // Precachear imágenes de páginas cuando el usuario hace hover en enlaces
  document.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href && link.href.startsWith(window.location.origin)) {
      // Extraer la ruta relativa
      const url = new URL(link.href);
      const path = url.pathname;
      
      // Precachear imágenes de la página
      preloadPageImages(path);
    }
  });
}
