import { defineCollection, z } from 'astro:content';

const lineas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    servicios: z.array(z.string()).optional()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    linea: z.string(),
    client: z.string(),
    fechaInicio: z.date(),
    fechaFinalizacion: z.date().optional(),
    image: z.string(),
    ubicacion: z.string(),
    superficie: z.string().optional(),
    duracion: z.string().optional(),
    presupuesto: z.string().optional(),
    // alcance: z.array(z.string()).optional(),
    //alcance: z.union([z.array(z.string()),z.null()]).optional(),
    //tecnicas: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    status: z.enum(['completado', 'en-proceso', 'planificacion']).default('completado'),
    
    // Galerías separadas de antes y después
    galeriaBefore: z.array(z.object({
      url: z.string(),
      alt: z.string().optional()
    })).optional(),

    galeriaAfter: z.array(z.object({
      url: z.string(),
      alt: z.string().optional()
    })).optional(),
    
    // Videos del proyecto
    videos: z.array(z.object({
      url: z.string(),
      title: z.string(),
      thumbnail: z.string().optional(),
      type: z.enum(['youtube', 'vimeo', 'local']).default('local')
    })).optional(),

    // Equipo del proyecto
    equipo: z.array(z.object({
      nombre: z.string(),
      cargo: z.string()
    })).optional(),

    // Métricas del proyecto
    metricas: z.array(z.object({
      titulo: z.string(),
      valor: z.string()
    })).optional()
  })
});

export const collections = {
  'lineas': lineas,
  'projects': projects
};