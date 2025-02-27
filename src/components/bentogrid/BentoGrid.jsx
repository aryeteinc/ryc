import React from 'react';
import { Drill, TowerControl, DraftingCompass } from 'lucide-react';
import DisenoArquitectonico from '../../assets/images/diseno-arquitectonico.jpg';
import ReparacionesLocativas from '../../assets/images/reparaciones-locativas.jpg';
import ProyectosMetalmecanicos from '../../assets/images/proyectos-metalmecanicos.jpg';

import FadeIn from '../../utils/FadeIn';

// Array de items por defecto
const defaultItems = [
  {
    title: "Diseño Arquitectonico",
    description: "Poseemos la capacidad técnica y humana para diseñar, construir, mantener y operar obras de pequeñas y grandes magnitudes, junto con todos los servicios especializados del área.",
    icon: DraftingCompass,
    bgImage: DisenoArquitectonico.src,
    textColor: "text-white",
    descriptionColor: "text-gray-200",
    iconColor: "text-white",
    //href: "#",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Reparaciones Locativas",
    description: "Basados en una gestión administrativa certificada,ofrecemos soluciones integrales de mantenimiento y reparaciones tanto para pequeñas o grandes superficies. Suministramos el recurso humano, las herramientas y la maquinaria apta para la realización de un excelente trabajo.",
    icon: Drill,
    bgImage: ReparacionesLocativas.src,
    textColor: "text-white",
    descriptionColor: "text-gray-200",
    iconColor: "text-white",
    //href: "#",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Proyectos Metalmecanicos",
    description: "En la industria del gas, petróleo y sus derivados poseemos la capacidad técnica y humana para diseñar, construir, realizar montajes y mantenimientos de plantas industriales, además de facilidades de producción ( tanques , separadores, calentadores, líneas de flujo), líneas de recolección, refinerías y plantas de gas.",
    icon: TowerControl,
    bgImage: ProyectosMetalmecanicos.src,
    textColor: "text-white",
    descriptionColor: "text-gray-200",
    iconColor: "text-white",
    //href: "#",
    bgColor: "bg-rose-100",
  }
];

// Función para generar clases de grid irregulares
const getGridClasses = (index, totalItems) => {
  // Patrones de grid predefinidos para diferentes números de items
  const patterns = {
    3: [
      "col-span-4 md:col-span-5 md:row-span-3",
      "col-span-4 md:col-span-3 md:col-start-6 md:row-span-5",
      "col-span-4 md:col-span-5 md:row-span-2",
    ],
    4: [
      "col-span-4 md:col-span-4 md:row-span-4",
      "col-span-4 md:col-span-4 md:row-span-3",
      "col-span-4 md:col-span-5 md:row-span-3",
      "col-span-4 md:col-span-3 md:row-span-4",
    ],
    5: [
      "col-span-4 md:col-span-3 md:row-span-3",
      "col-span-4 md:col-span-5 md:row-span-2",
      "col-span-4 md:col-span-4 md:row-span-4",
      "col-span-4 md:col-span-4 md:row-span-3",
      "col-span-4 md:col-span-4 md:row-span-3",
    ],
  };

  // Si tenemos un patrón predefinido, lo usamos
  if (patterns[totalItems]) {
    return patterns[totalItems][index];
  }

  // Para números mayores, generamos un patrón dinámico
  const spans = [
    [3, 4],
    [5, 3],
    [4, 3],
    [3, 3],
    [5, 2],
    [4, 4],
  ];

  const pattern = spans[index % spans.length];
  return `col-span-4 md:col-span-${pattern[0]} md:row-span-${pattern[1]}`;
};

const BentoItem = ({ 
  title, 
  description, 
  icon: Icon, 
  bgImage, 
  bgColor,
  textColor,
  descriptionColor,
  iconColor,
  href,
  className 
}) => {
  const ItemWrapper = href ? 'a' : 'div';
  
  return (
    <ItemWrapper 
      href={href}
      className={`relative overflow-hidden rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg hover:scale-[1.02] group min-h-[250px] ${className}`}
    >
      {/* Background con overlay */}
      <div className="absolute inset-0">
        {bgImage ? (
          <>
            <img 
              src={bgImage} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          </>
        ) : (
          <>
            <div className={`w-full h-full ${bgColor}`} />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <Icon className={`w-12 h-12 ${iconColor} mb-3`} />
        <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
        <p className={`text-center md:text-left mt-2 ${descriptionColor}`}>{description}</p>
      </div>
    </ItemWrapper>
  );
};

const BentoGrid = ({ items = defaultItems }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      
      <div className="space-y-2 my-4">
      
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-7xl text-lime-400">
            Lineas de Trabajo
          </h2>
          
        <div className="w-12 h-1 bg-lime-400 rounded"></div>
        
      </div>
      
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 auto-rows-auto">
        {items.map((item, index) => (
          <BentoItem 
            key={item.title}
            {...item}
            className={getGridClasses(index, items.length)}
          />
        ))}
      </div>
      
    </div>
  );
};

export default BentoGrid;