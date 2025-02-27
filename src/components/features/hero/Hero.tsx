import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  onClick,
  type = 'button',
  disabled = false
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-blue-600 
        hover:bg-blue-700 
        text-white 
        font-semibold 
        py-3 
        px-8 
        rounded-lg 
        shadow-lg 
        transform 
        transition-all 
        duration-300 
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

interface HeroContentProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
  title = "Diseña Tu Futuro Digital",
  description = "Transformamos tus ideas en experiencias digitales extraordinarias. Nuestro equipo de expertos te ayudará a construir la presencia en línea que tu negocio merece.",
  buttonText = "Comienza Ahora"
}) => {
  return (
    <div className="flex-1 space-y-6 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
        {description}
      </p>
      <Button>
        {buttonText}
      </Button>
    </div>
  );
};

interface HeroImageProps {
  imgSrc?: string;
  imgAlt?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({
  imgSrc = "/api/placeholder/600/400",
  imgAlt = "Hero Image"
}) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl opacity-30 blur-xl"></div>
        <img
          src={imgSrc}
          alt={imgAlt}
          className="relative rounded-xl shadow-2xl w-full object-cover"
        />
      </div>
    </div>
  );
};

interface HeroProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imgSrc?: string;
  imgAlt?: string;
  className?: string;
  containerClassName?: string;
  height?: 'screen' | 'auto' | 'half' | string;
  backgroundClassName?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  buttonText,
  imgSrc,
  imgAlt,
  className = '',
  containerClassName = '',
  height = 'screen',
  backgroundClassName = 'bg-gray-50'
}) => {
  // Función para manejar la altura
  const getHeightClass = (height: string): string => {
    switch (height) {
      case 'screen':
        return 'min-h-screen';
      case 'auto':
        return 'min-h-0';
      case 'half':
        return 'min-h-[50vh]';
      default:
        return height.startsWith('h-') ? height : 'min-h-screen';
    }
  };

  return (
    <div className={`${getHeightClass(height)} ${backgroundClassName} ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full ${containerClassName}`}>
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-16 gap-8 h-full">
          <HeroContent 
            title={title}
            description={description}
            buttonText={buttonText}
          />
          <HeroImage 
            imgSrc={imgSrc}
            imgAlt={imgAlt}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;