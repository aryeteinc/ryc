/**
 * Utilidades para procesar datos de archivos Markdown
 */

// Define aquí las interfaces según tus necesidades
export interface GalleryImage {
  url: string;
  alt?: string;
}

export interface ProjectData {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  author?: string;
  images?: GalleryImage[];
  tags?: string[];
  // Otros campos que puedas necesitar
}

/**
 * Función auxiliar para verificar si un valor existe y no está vacío
 */
export function hasValue(value: any): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

/**
 * Procesa el contenido de un archivo Markdown
 * Nota: Necesitarás instalar la biblioteca 'gray-matter' si usas esta función
 * npm install gray-matter
 */
export function parseMarkdownData(markdownContent: string): ProjectData {
  try {
    // Si usas gray-matter para frontmatter:
    // import matter from 'gray-matter';
    // const { data } = matter(markdownContent);
    
    // Simulación de extracción de datos (reemplaza esto con tu lógica real)
    const data = extractDataFromMarkdown(markdownContent);
    
    // Inicializa el objeto de datos del proyecto
    const projectData: ProjectData = {};
    
    // Solo asigna propiedades que existen y no están vacías
    if (hasValue(data.title)) projectData.title = data.title;
    if (hasValue(data.description)) projectData.description = data.description;
    if (hasValue(data.date)) projectData.date = data.date;
    if (hasValue(data.location)) projectData.location = data.location;
    if (hasValue(data.author)) projectData.author = data.author;
    
    // Procesa tags si existen y son un array no vacío
    if (hasValue(data.tags)) {
      projectData.tags = data.tags;
    }
    
    // Procesa las imágenes si existen y son un array no vacío
    if (hasValue(data.images)) {
      projectData.images = data.images.map(img => {
        // Si la imagen es un string simple, conviértela a objeto
        if (typeof img === 'string') {
          return { url: img };
        }
        // Si es un objeto, asegúrate de que tenga la estructura correcta
        else if (typeof img === 'object' && img !== null) {
          return {
            url: img.url || img.src || '',
            alt: hasValue(img.alt) ? img.alt : ''
          };
        }
        return null;
      }).filter(Boolean) as GalleryImage[]; // Filtra valores nulos
    }
    
    return projectData;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return {}; // Devuelve un objeto vacío en caso de error
  }
}

// Función auxiliar para extraer datos (reemplázala con tu implementación real)
function extractDataFromMarkdown(content: string): any {
  // Esta es una implementación de ejemplo - deberás adaptarla según tus necesidades
  // o reemplazarla con una biblioteca como 'gray-matter'
  
  // Ejemplo simple para extraer frontmatter entre --- 
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontMatterRegex);
  
  if (!match || !match[1]) {
    return {}; // No hay frontmatter
  }
  
  // Parseo simple de las líneas clave-valor
  const frontMatter = match[1];
  const result: Record<string, any> = {};
  
  // Divide por líneas y procesa cada una
  frontMatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Quita comillas si están presentes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Intenta detectar arrays y objetos
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Si falla, mantener como cadena
        }
      }
      
      result[key] = value;
    }
  });
  
  return result;
}