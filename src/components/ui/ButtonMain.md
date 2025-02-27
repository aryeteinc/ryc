# Button Component

Un componente de botón altamente personalizable construido con React, TypeScript y Tailwind CSS.

## Características

- 🎨 Personalización completa de colores usando Tailwind
- 📱 Totalmente responsive
- 🔤 Tipado fuerte con TypeScript
- 🎯 Múltiples variantes y tamaños
- ♿ Accesible
- 🔄 Animaciones suaves
- 🔗 Soporte para navegación flexible

## Instalación

```bash
# Si estás usando npm
npm install @components/button

# Si estás usando yarn
yarn add @components/button

# Si estás usando pnpm
pnpm add @components/button
```

## Uso

### Importación

```tsx
import Button from '@/components/ui/Button';
```

### Ejemplos Básicos

```tsx
// Botón básico
<Button>Click me</Button>

// Botón con color personalizado
<Button 
  backgroundColor="blue"
  hoverColor="indigo"
>
  Botón Azul
</Button>

// Botón con tamaño y variante
<Button 
  size="lg"
  variant="secondary"
>
  Botón Grande
</Button>
```

### Navegación

#### Enlace Directo
```tsx
// Navegación interna
<Button href="/contacto">
  Contactar
</Button>

// Enlace externo
<Button 
  href="https://ejemplo.com"
  target="_blank"
>
  Visitar sitio
</Button>
```

#### Navegación Programática en Astro
```astro
<Button
  onClick={() => {
    window.location.href = '/otra-pagina';
  }}
>
  Ir a otra página
</Button>
```

#### Con View Transitions de Astro
```astro
---
import { ViewTransitions } from 'astro:transitions';
---

<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <Button href="/otra-pagina" data-astro-reload>
      Ir a otra página con transición
    </Button>
  </body>
</html>
```

#### Con Manejo de Eventos
```tsx
<Button
  onClick={() => {
    if (validateForm()) {
      window.location.href = '/success';
    } else {
      alert('Por favor completa el formulario');
    }
  }}
>
  Enviar y continuar
</Button>
```

### Personalización Avanzada

```tsx
// Botón con gradiente y personalización completa
<Button 
  backgroundColor="bg-gradient-to-r from-purple-500 to-pink-500"
  hoverColor="hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600"
  textColor="text-white"
  size="lg"
  rounded="lg"
  className="shadow-xl"
>
  Botón Gradiente
</Button>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Contenido del botón |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Estilo predefinido del botón |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `className` | `string` | `''` | Clases CSS adicionales |
| `onClick` | `() => void` | - | Función manejadora del click |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML del botón |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Tipo de borde redondeado |
| `backgroundColor` | `TailwindColor \| string` | - | Color de fondo (usando colores de Tailwind o clases) |
| `hoverColor` | `TailwindColor \| string` | - | Color al hover |
| `textColor` | `string` | - | Color del texto |
| `href` | `string` | - | URL para navegación |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | - | Destino del enlace |
| `navigate` | `() => void` | - | Función de navegación personalizada |

## Colores Disponibles (TailwindColor)

```typescript
type TailwindColor = 
  | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' 
  | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' 
  | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' 
  | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' 
  | 'pink' | 'rose'
```

## Tamaños Disponibles

| Tamaño | Clases |
|--------|---------|
| `sm` | `px-4 py-2 text-sm` |
| `md` | `px-6 py-3 text-base` |
| `lg` | `px-8 py-4 text-lg` |

## Estilos de Bordes Redondeados

| Tipo | Clase |
|------|-------|
| `none` | `rounded-none` |
| `sm` | `rounded` |
| `md` | `rounded-md` |
| `lg` | `rounded-lg` |
| `full` | `rounded-full` |

## Mejores Prácticas

1. **Consistencia**: Mantén una paleta de colores consistente en toda tu aplicación.
2. **Accesibilidad**: Asegúrate de usar colores con suficiente contraste.
3. **Responsive**: Ajusta el tamaño del botón según el viewport.
4. **Estados**: Proporciona feedback visual para los diferentes estados (hover, active, disabled).
5. **Navegación**: Usa el método más apropiado según el contexto:
   - `href` para navegación simple
   - `onClick` para lógica adicional
   - View Transitions para transiciones suaves
   - Navegación programática para casos complejos

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.

## Licencia

MIT