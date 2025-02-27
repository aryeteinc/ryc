# Responsive Navbar Component with Scroll Effects

A highly customizable React/TypeScript navigation component with responsive design, smooth animations, and scroll-based effects.

## Features

- 💫 Smooth animations and transitions
- 📱 Fully responsive design (mobile + desktop)
- 🎨 Highly customizable through props
- 🔄 Scroll-based effects and styling
- 🌗 Dynamic color adjustments
- 🎯 TypeScript support
- ⚡ Compatible with React and Astro

## Installation

### Dependencies

First, make sure you have the required dependencies:

```bash
npm install react react-dom tailwindcss
```

### Required Files

Create the following file structure in your project:

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── ScrollNavbarEffect.tsx
│   └── ui/
│       └── ButtonMain.tsx
├── hooks/
│   └── useScrollEffect.ts
```

## Basic Usage

```tsx
import { Navbar } from './components/Navbar';
import { ScrollNavbarEffect } from './components/ScrollNavbarEffect';

function App() {
  return (
    <ScrollNavbarEffect>
      <Navbar 
        logo="My Logo"
        links={[
          { href: '/home', label: 'Home' },
          { href: '/services', label: 'Services' },
          { href: '/contact', label: 'Contact' }
        ]}
      />
    </ScrollNavbarEffect>
  );
}
```

## Component Props

### Navbar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `React.ReactNode \| string` | `'LOGO'` | Logo content (can be text or component) |
| `logoUrl` | `string` | - | URL for logo image |
| `logoAlt` | `string` | `'Logo'` | Alt text for logo image |
| `logoClassName` | `string` | `'font-bold text-xl'` | Classes for logo styling |
| `links` | `NavLink[]` | `[]` | Navigation links array |
| `buttonText` | `string` | `'Call to action'` | CTA button text |
| `onButtonClick` | `() => void` | - | CTA button click handler |
| `buttonStyles` | `ButtonStyles` | default styles | Button styling object |
| `justifyContent` | `'between' \| 'around' \| 'center' \| 'start' \| 'end'` | `'between'` | Navigation items alignment |
| `className` | `string` | `''` | Additional classes for navbar |
| `showButton` | `boolean` | `true` | Show/hide CTA button |

### ScrollNavbarEffect Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `50` | Scroll threshold for effects |
| `scrolledClassName` | `string` | `'bg-transparent backdrop-blur-md shadow-md'` | Classes when scrolled |
| `atTopClassName` | `string` | `'bg-white'` | Classes when at top |

### Interface Definitions

```typescript
interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface ButtonStyles {
  backgroundColor?: string;
  hoverColor?: string;
  textColor?: string;
  className?: string;
}
```

## Advanced Examples

### With Custom Logo Component

```tsx
<Navbar 
  logo={<CustomLogoComponent />}
  justifyContent="center"
  showButton={false}
/>
```

### With Icon Links

```tsx
import { Home, Mail, Info } from 'lucide-react';

<Navbar 
  links={[
    { href: '/home', label: 'Home', icon: <Home size={18} /> },
    { href: '/contact', label: 'Contact', icon: <Mail size={18} /> },
    { href: '/about', label: 'About', icon: <Info size={18} /> }
  ]}
/>
```

### Custom Button Styles

```tsx
<Navbar 
  buttonStyles={{
    backgroundColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    textColor: 'text-white',
    className: 'font-semibold'
  }}
  buttonText="Get Started"
/>
```

### Custom Scroll Effects

```tsx
<ScrollNavbarEffect
  threshold={100}
  scrolledClassName="bg-black/50 backdrop-blur-lg text-white"
  atTopClassName="bg-white text-gray-900"
>
  <Navbar {...props} />
</ScrollNavbarEffect>
```

## Required Component: ButtonMain

The Navbar component requires a `ButtonMain` component. Here's a basic implementation:

```tsx
// src/components/ui/ButtonMain.tsx
import React from 'react';

interface ButtonMainProps {
  href?: string;
  backgroundColor?: string;
  hoverColor?: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonMain: React.FC<ButtonMainProps> = ({
  href,
  backgroundColor = 'bg-blue-500',
  hoverColor = 'hover:bg-blue-600',
  className = '',
  onClick,
  children
}) => {
  const classes = `
    ${backgroundColor}
    ${hoverColor}
    ${className}
    px-4 py-2 rounded-lg text-white transition-colors
  `;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonMain;
```

## Tailwind Configuration

Add these classes to your Tailwind safelist if you're using custom colors or classes:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-transparent',
    'backdrop-blur-sm',
    'backdrop-blur-md',
    'shadow-md',
    // Add any custom classes used in buttonStyles here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Animation Customization

The component uses Tailwind's transition utilities for animations. You can customize the durations and timing functions:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
}
```

## Notes

- The component is built with Tailwind CSS classes. Make sure you have Tailwind CSS properly configured in your project.
- For TypeScript support, ensure you have the necessary TypeScript dependencies installed.
- The component is responsive by default, with a mobile-first approach.
- The scroll effect is optional and can be disabled by not using the `ScrollNavbarEffect` wrapper.
- All styling is customizable through props and Tailwind classes.
