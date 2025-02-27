import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    envDir:'./'
  },
  integrations: [react()],
  output: 'static', // Cambiado a 'server' para soportar API endpoints
  site: process.env.PUBLIC_SITE_URL,
  
});