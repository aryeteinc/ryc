# Rodriguez y Carvajal - Landing Page

Una landing page moderna construida con Astro y componentes React.

## 🚀 Características

- Framework Astro para rendimiento óptimo
- Componentes React para interactividad
- Diseño moderno y responsivo
- Animaciones suaves y gradientes
- TypeScript para type-safety
- Tailwind CSS para estilos
- Integración con shadcn/ui

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Git

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

2. Navega al directorio del proyecto:
```bash
cd TU_REPOSITORIO
```

3. Instala las dependencias:
```bash
npm install
# o
yarn install
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Abre [http://localhost:4321](http://localhost:4321) en tu navegador para ver el resultado.

## 🗂️ Estructura del Proyecto

```
/
├── src/
│   ├── components/    # Componentes React y Astro
│   │   ├── ui/       # Componentes de UI reutilizables
│   │   └── ...     
│   ├── layouts/      # Layouts de Astro
│   ├── pages/        # Páginas de Astro
│   └── utils/        # Utilidades y helpers
├── public/           # Archivos estáticos
└── astro.config.mjs  # Configuración de Astro
```

## ⚙️ Configuración

El proyecto utiliza varias tecnologías que requieren configuración:

1. **Astro**: La configuración principal está en `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()]
});
```

2. **Tailwind CSS**: La configuración se encuentra en `tailwind.config.cjs`
3. **TypeScript**: La configuración está en `tsconfig.json`

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "astro": "^4.x",
    "@astrojs/react": "^3.x",
    "@astrojs/tailwind": "^5.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "tailwindcss": "^3.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x"
  }
}
```

## 🚀 Despliegue

Para construir el proyecto para producción:

```bash
npm run build
# o
yarn build
```

Esto generará una versión optimizada del sitio en el directorio `dist/`.

## 💻 Desarrollo

### Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el sitio para producción
- `npm run preview` - Previsualiza la construcción local
- `npm run astro ...` - Ejecuta comandos CLI de Astro

### Trabajando con Componentes React

Los componentes React se pueden importar y usar en archivos `.astro`:

```astro
---
import HeroMain from '../components/HeroMain';
---

<HeroMain
  title="Rodriguez y Carvajal"
  description="Transformamos el futuro energético..."
/>
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
