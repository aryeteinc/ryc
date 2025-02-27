import React from 'react';
import Button from '../ui/ButtonMain';
import AnimatedCounter from '../../utils/AnimatedCounter';
import GradientText, { AnimationStyles } from '@/utils/GradientText';
import { ChevronDown } from 'lucide-react';
import FadeIn from '@/utils/FadeIn';

interface HeroMainProps {
  className?: string;
  containerClassName?: string;
  title?: string;
  slogan?:string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  userCount?: number;
  rating?: number;
  hookText?: string;
  height?: 'screen' | 'auto' | 'half' | string;
  withHookText?: boolean;
  image?: string;
  gridImages?: string[];
  userImage?: string;
}

interface UserIconProps {
  image?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ image }) => (
  <div className="absolute -right-4 sm:-right-6 md:-right-8 top-1/2 transform -translate-y-1/2">
    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative">
      <div className="absolute inset-0 bg-gray-100 rounded-full opacity-20"></div>
      {image ? (
        <img 
          src={image} 
          alt={image ? "User icon" : "Default user icon"}
          loading="lazy"
          decoding="async"
          className="w-full h-full relative rounded-full object-cover"
        />
      ) : (
        <svg 
          viewBox="0 0 24 24" 
          className="w-full h-full relative"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
        </svg>
      )}
    </div>
  </div>
);

const ScrollChevrons = () => (
  <div className="flex flex-col items-center mt-2">
    <div className="relative">
      <ChevronDown className="w-6 h-6 text-blue-100 animate-bounce-custom" />
      <ChevronDown className="w-6 h-6 text-blue-100 absolute top-0 opacity-50 animate-bounce-custom-delayed" />
    </div>
  </div>
);

const DefaultIllustration = ({ gridImages, userImage }: { gridImages: string[], userImage?: string }) => (
  <>
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {gridImages[i] ? (
            <img 
              src={gridImages[i]}
              alt={`Grid image ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-lg"></div>
          )}
        </div>
      ))}
    </div>
    <UserIcon image={userImage} />
  </>
);

const HeroMain: React.FC<HeroMainProps> = ({
  className = '',
  containerClassName = '',
  title = 'Your main value proposition',
  description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  slogan = 'Nuestro slogan',
  buttonText = 'Call to action',
  onButtonClick,
  userCount = 465,
  rating = 5,
  hookText = 'Descubre más abajo',
  height = 'screen',
  withHookText = true,
  image,
  gridImages = [],
  userImage
}) => {
  const getHeightClass = (height: string): string => {
    switch (height) {
      case 'screen':
        return 'h-[100vh] md:h-screen';
      case 'auto':
        return 'min-h-[100vh] md:min-h-screen';
      case 'half':
        return 'h-[50vh]';
      default:
        return height.startsWith('h-') ? height : 'h-[100vh] md:h-screen';
    }
  };

  return (
    <main className={`block md:relative bg-gradient-to-br from-blue-800 via-blue-600 to-blue-200 pt-24 ${getHeightClass(height)} ${className}`}>
      <style type="text/css">
        {`
          @keyframes bounceCustom {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
          .animate-bounce-custom {
            animation: bounceCustom 1.5s ease-in-out infinite;
          }
          .animate-bounce-custom-delayed {
            animation: bounceCustom 1.5s ease-in-out infinite 0.2s;
          }
        `}
      </style>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col ${containerClassName}`}>
        <div className="flex-grow flex items-center justify-center">
        <FadeIn client:visible delay={200}> 
          <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
            {/* Contenido de texto */}
            <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left max-w-xl md:max-w-none"> 
                      
              <div className="space-y-0">
                <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-lg mx-auto md:mx-0 mb-0">
                  {slogan}
                </p>
               
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-bold text-blue-100 tracking-tight -mt-1">
                  <AnimationStyles />
                  <GradientText
                    animated={true} 
                    animationDuration="normal"
                    from="from-blue-500"
                    to="to-lime-500"
                    direction="right"
                    className="leading-[1.1] font-display"
                  >
                    {title}
                  </GradientText>
                </h1>
              </div>              
              <p className="text-sm sm:text-base md:text-xl text-blue-100 max-w-lg mx-auto md:mx-0 font-body">
                {description}
              </p>           
              
              <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  {/* <span className="text-blue-100">+</span> */}
                  {/* <AnimatedCounter class="text-lg sm:text-xl font-bold text-blue-50" value={userCount} /> */}
                  <span className="text-blue-100">Así lo dicen Todos Nuestros Clientes Satisfechos</span>
                  <div className="flex ml-2">
                    {Array.from({ length: rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>

                <Button 
                  href='/#contacto'
                  backgroundColor="bg-gradient-to-r from-blue-500 to-indigo-500"
                  hoverColor="hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600"
                  onClick={onButtonClick}
                  className="w-full sm:w-auto justify-center text-sm sm:text-base px-6 sm:px-8"
                >
                  {buttonText}
                </Button>
              </div>
              
            </div>

            {/* Imagen/Ilustración */}
            
            <div className="flex-1 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="relative w-full aspect-square md:aspect-auto">
                <div className="absolute inset-0 bg-gray-100 rounded-xl transform rotate-3"></div>
                <div className="relative bg-white p-3 sm:p-4 rounded-xl shadow-lg">
                  {image ? (
                    <img 
                      src={image} 
                      alt="Hero section image" 
                      loading="eager"
                      fetchpriority="high"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <DefaultIllustration gridImages={gridImages} userImage={userImage} />
                  )}
                </div>
              </div>
            </div>
            
          </div>
          </FadeIn>
        </div>

        {/* Hook Text con Chevrones Animados */}
        {withHookText && (
          <div className="pb-8 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-blue-100">
                {hookText}
              </h2>
              <ScrollChevrons />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HeroMain;