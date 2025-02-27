# CompanyTicker Component

Un componente React/Astro para mostrar un carrusel animado horizontal de logos o textos de empresas. Incluye efectos de hover, gradientes suaves y es completamente responsivo.

![CompanyTicker Demo](demo-placeholder.gif)

## Características

- 🔄 Animación suave y continua
- 📱 Totalmente responsivo (móvil y desktop)
- 🖼️ Soporte para logos y texto
- ⚡ Compatible con Astro
- 🎨 Efecto de escala de grises con hover
- 🎯 Pausa en hover
- 🎮 Altamente personalizable

## Instalación

```bash
# Si estás usando npm
npm install company-ticker

# Si estás usando yarn
yarn add company-ticker

# Si estás usando pnpm
pnpm add company-ticker
```

## Uso Básico

```typescript
import CompanyTicker from './components/CompanyTicker';

const companies = [
  {
    type: 'logo',
    content: '/path/to/logo1.png',
    name: 'Company 1'
  },
  {
    type: 'text',
    content: 'Company 2',
    name: 'Company 2'
  }
];

// En tu componente React
return (
  <CompanyTicker 
    companies={companies}
    speed={20}
    containerWidth="80%"
  />
);

// En Astro (.astro)
<div class="w-full">
  <CompanyTicker 
    client:load 
    companies={companies}
    speed={20}
    containerWidth="80%"
    spacing={48}
    itemHeight={80}
  />
</div>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `companies` | `Company[]` | `[]` | Array de objetos company para mostrar |
| `speed` | `number` | `40` | Duración de la animación en segundos |
| `containerWidth` | `string` | `'100%'` | Ancho máximo del contenedor |
| `spacing` | `number` | `32` | Espaciado entre elementos en píxeles |
| `itemHeight` | `number` | `80` | Altura del contenedor en píxeles |

### Interfaz Company

```typescript
interface Company {
  type: 'logo' | 'text';  // Tipo de elemento a mostrar
  content: string;        // URL de la imagen o texto a mostrar
  name: string;          // Nombre de la compañía (usado para alt en imágenes)
}
```

## Ejemplo Avanzado

```typescript
const companies = [
  {
    type: 'logo',
    content: '/logos/company1.png',
    name: 'Company 1'
  },
  {
    type: 'logo',
    content: '/logos/company2.svg',
    name: 'Company 2'
  },
  {
    type: 'text',
    content: 'Company 3',
    name: 'Company 3'
  }
];

<CompanyTicker 
  companies={companies}
  speed={20}                    // Animación más rápida
  containerWidth="80%"          // Contenedor al 80% del ancho
  spacing={48}                  // Más espacio entre elementos
  itemHeight={80}              // Altura personalizada
/>
```

## Configuración con Astro

Para usar el componente en Astro, asegúrate de:

1. Añadir la directiva `client:load` para que el componente se hidrate en el cliente:

```astro
---
// En tu archivo .astro
import CompanyTicker from '../components/CompanyTicker';

const companies = [
  // ... tu array de compañías
];
---

<div class="w-full">
  <CompanyTicker 
    client:load 
    {companies}
    speed={20}
    containerWidth="80%"
    spacing={48}
    itemHeight={80}
  />
</div>
```

## Consideraciones de Rendimiento

- Las imágenes deben estar optimizadas para web
- Recomendado usar formatos modernos como WebP o SVG para los logos
- El número óptimo de compañías es entre 4 y 8 para mejor rendimiento
- Los logos deben tener dimensiones similares para mejor consistencia visual

## Personalización de Estilos

El componente usa Tailwind CSS por defecto. Los estilos principales que puedes personalizar son:

- Gradientes laterales ajustando las clases de color en los divs con clase `bg-gradient-to-r` y `bg-gradient-to-l`
- Efecto de escala de grises modificando la clase `grayscale`
- Espaciado entre elementos ajustando el prop `spacing`
- Altura del contenedor con el prop `itemHeight`

## Resolución de Problemas

### Los logos no se ven en móvil

Asegúrate de que:
- Las imágenes están siendo cargadas correctamente
- Los paths de las imágenes son correctos
- Las imágenes tienen un tamaño mínimo de 64x64 píxeles

### La animación no es suave

Intenta:
- Reducir el número de elementos
- Optimizar las imágenes
- Ajustar la velocidad con el prop `speed`

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

MIT License - ver el archivo [LICENSE.md](LICENSE.md) para más detalles
