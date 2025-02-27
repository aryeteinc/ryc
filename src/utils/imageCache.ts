/**
 * Utilidad para gestionar el caché de imágenes
 * Permite precachear imágenes y recuperarlas rápidamente del caché
 */

// Tamaño máximo del caché en bytes (10MB)
const MAX_CACHE_SIZE = 10 * 1024 * 1024;

// Estructura para almacenar metadatos del caché
interface CacheMetadata {
  size: number;
  lastAccessed: number;
  url: string;
}

// Clase para gestionar el caché de imágenes
export class ImageCache {
  private static instance: ImageCache;
  private cache: Map<string, Blob>;
  private metadata: Map<string, CacheMetadata>;
  private totalSize: number;

  private constructor() {
    this.cache = new Map();
    this.metadata = new Map();
    this.totalSize = 0;
    
    // Intentar cargar el caché desde localStorage
    this.loadFromStorage();
  }

  // Patrón Singleton para asegurar una única instancia del caché
  public static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache();
    }
    return ImageCache.instance;
  }

  // Precachear una imagen
  public async preCache(url: string): Promise<void> {
    if (this.cache.has(url)) {
      // Actualizar timestamp de último acceso
      const meta = this.metadata.get(url);
      if (meta) {
        meta.lastAccessed = Date.now();
      }
      return;
    }

    try {
      const response = await fetch(url, { cache: 'force-cache' });
      const blob = await response.blob();
      
      // Verificar si hay espacio en el caché
      if (this.totalSize + blob.size > MAX_CACHE_SIZE) {
        this.evictOldEntries(blob.size);
      }
      
      // Guardar en caché
      this.cache.set(url, blob);
      this.metadata.set(url, {
        size: blob.size,
        lastAccessed: Date.now(),
        url
      });
      
      this.totalSize += blob.size;
      
      // Guardar en localStorage
      this.saveToStorage();
    } catch (error) {
      console.error('Error al precachear imagen:', error);
    }
  }

  // Obtener una imagen del caché
  public async getImage(url: string): Promise<string | null> {
    if (!this.cache.has(url)) {
      await this.preCache(url);
    }
    
    const blob = this.cache.get(url);
    if (!blob) return null;
    
    // Actualizar timestamp de último acceso
    const meta = this.metadata.get(url);
    if (meta) {
      meta.lastAccessed = Date.now();
    }
    
    return URL.createObjectURL(blob);
  }

  // Eliminar entradas antiguas para hacer espacio
  private evictOldEntries(requiredSpace: number): void {
    // Convertir a array y ordenar por último acceso
    const entries = Array.from(this.metadata.values())
      .sort((a, b) => a.lastAccessed - b.lastAccessed);
    
    let freedSpace = 0;
    
    for (const entry of entries) {
      if (freedSpace >= requiredSpace) break;
      
      this.cache.delete(entry.url);
      this.metadata.delete(entry.url);
      
      freedSpace += entry.size;
      this.totalSize -= entry.size;
    }
  }

  // Guardar metadatos en localStorage
  private saveToStorage(): void {
    try {
      // Solo guardamos los metadatos, no los blobs
      const metadataArray = Array.from(this.metadata.entries());
      localStorage.setItem('imageCache_metadata', JSON.stringify(metadataArray));
    } catch (error) {
      console.error('Error al guardar caché en localStorage:', error);
    }
  }

  // Cargar desde localStorage
  private loadFromStorage(): void {
    try {
      const storedMetadata = localStorage.getItem('imageCache_metadata');
      if (!storedMetadata) return;
      
      const metadataArray = JSON.parse(storedMetadata) as [string, CacheMetadata][];
      
      // Restaurar metadatos
      for (const [url, meta] of metadataArray) {
        this.metadata.set(url, meta);
      }
      
      // Intentar cargar las imágenes de nuevo
      for (const url of this.metadata.keys()) {
        this.preCache(url).catch(console.error);
      }
    } catch (error) {
      console.error('Error al cargar caché desde localStorage:', error);
    }
  }

  // Precachear múltiples imágenes
  public async preCacheMultiple(urls: string[]): Promise<void> {
    const promises = urls.map(url => this.preCache(url));
    await Promise.all(promises);
  }

  // Limpiar el caché
  public clearCache(): void {
    this.cache.clear();
    this.metadata.clear();
    this.totalSize = 0;
    localStorage.removeItem('imageCache_metadata');
  }
}
