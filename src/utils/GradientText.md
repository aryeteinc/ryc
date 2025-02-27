# GradientText Component

Un componente React para crear texto con efectos de gradiente, altamente personalizable y fácil de usar. Utiliza Tailwind CSS para los estilos.

## 🚀 Instalación

El componente requiere Tailwind CSS en tu proyecto. Si aún no lo tienes instalado:

```bash
npm install tailwindcss
# o
yarn add tailwindcss
```

## 💻 Uso Básico

```tsx
import GradientText from './components/GradientText';

function MyComponent() {
  return (
    <GradientText from="from-blue-600" to="to-indigo-500">
      Texto con Gradiente
    </GradientText>
  );
}
```

## ⚙️ Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| children | React.ReactNode | - | El texto o contenido a mostrar |
| from | string | 'from-blue-500' | Color inicial del gradiente |
| to | string | 'to-indigo-500' | Color final del gradiente |
| direction | 'left' \| 'right' \| 'top' \| 'bottom' \| 'diagonal' | 'right' | Dirección del gradiente |
| className | string | '' | Clases CSS adicionales |

## 🎨 Ejemplos

### Diferentes Direcciones

```tsx
// Gradiente de izquierda a derecha (default)
<GradientText from="from-blue-500" to="to-indigo-500">
  Gradiente Horizontal
</GradientText>

// Gradiente diagonal
<GradientText 
  from="from-purple-600" 
  to="to-pink-500" 
  direction="diagonal"
>
  Gradiente Diagonal
</GradientText>

// Gradiente vertical
<GradientText 
  from="from-green-400" 
  to="to-blue-500" 
  direction="bottom"
>
  Gradiente Vertical
</GradientText>
```

### Combinaciones de Colores Populares

```tsx
// Sunset
<GradientText from="from-orange-500" to="to-pink-500">
  Atardecer
</GradientText>

// Ocean
<GradientText from="from-cyan-500" to="to-blue-500">
  Océano
</GradientText>

// Forest
<GradientText from="from-green-500" to="to-emerald-700">
  Bosque
</GradientText>
```

### Con Estilos Adicionales

```tsx
<GradientText 
  from="from-purple-600" 
  to="to-pink-500"
  className="text-4xl font-bold hover:opacity-80 transition-opacity"
>
  Texto Grande y Bold
</GradientText>
```

## 🎯 Uso Avanzado

### Con Tailwind CSS Personalizado

```tsx
// Ejemplo con configuración personalizada de Tailwind
<GradientText 
  from="from-[#FF0080]" 
  to="to-[#7928CA]"
  className="text-8xl font-black"
>
  Texto Personalizado
</GradientText>
```

### Animación al Hover

```tsx
<GradientText 
  from="from-blue-500" 
  to="to-indigo-500"
  className="transition-all duration-300 hover:from-indigo-500 hover:to-blue-500"
>
  Gradiente Interactivo
</GradientText>
```

## 🔍 TypeScript

El componente incluye tipos TypeScript completos:

```tsx
interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'diagonal';
}
```

## ⚠️ Consideraciones

- Los colores deben seguir el formato de Tailwind CSS (`from-{color}-{intensity}`)
- El componente utiliza `bg-clip-text` y `text-transparent`, asegúrate de que tu configuración de Tailwind incluya estas utilidades
- Para mejor soporte de navegadores, considera agregar prefijos CSS cuando sea necesario

## 🤝 Contribuir

Las sugerencias y contribuciones son siempre bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.