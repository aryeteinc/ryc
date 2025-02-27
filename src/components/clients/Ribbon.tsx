import React, { useRef, useEffect, useState } from 'react';

type CompanyType = 'logo' | 'text';

export interface Company {
  type: CompanyType;
  content: string;
  name: string;
}

interface TickerItemProps {
  item: Company;
  maxHeight?: number;
  isMobile: boolean;
}

interface CompanyTickerProps {
  companies?: Company[];
  speed?: number;
  containerWidth?: string;
  spacing?: number;
  itemHeight?: number;
}

const TickerItem: React.FC<TickerItemProps> = ({ item, maxHeight, isMobile }) => {
  // Aseguramos tamaños mínimos significativos para ambas vistas
  const baseHeight = isMobile ? 64 : 80; // 4rem/5rem
  const imageStyle = {
    height: `${baseHeight}px`,
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'contain' as const,
  };

  if (item.type === 'logo') {
    return (
      <img
        src={item.content}
        alt={item.name}
        className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
        style={imageStyle}
      />
    );
  }

  return (
    <span className={`${isMobile ? 'text-xl' : 'text-lg'} font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300`}>
      {item.content}
    </span>
  );
};

const CompanyTicker: React.FC<CompanyTickerProps> = ({ 
  companies = [],
  speed = 40,
  containerWidth = '100%',
  spacing = 32,
  itemHeight = 80
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [containerPixelWidth, setContainerPixelWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const safeCompanies = Array.isArray(companies) ? companies : [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (containerRef.current) {
        setContainerPixelWidth(containerRef.current.offsetWidth);
      }
    };

    // Inicial y en cada resize
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (safeCompanies.length === 0) {
    return (
      <div className="w-full min-h-[120px] flex items-center justify-center">
        <span className="text-gray-500">No hay compañías para mostrar</span>
      </div>
    );
  }

  // Aseguramos una altura mínima responsiva
  const containerHeight = isMobile ? Math.max(itemHeight, 100) : Math.max(itemHeight, 120);
  
  return (
    <div className="w-full bg-white">
      <div className="mx-auto" style={{ maxWidth: containerWidth }}>
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          style={{ height: `${containerHeight}px` }}
        >
          {/* Gradientes */}
          <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <style>
              {`
                @keyframes ticker {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }

                .ticker-container {
                  display: flex;
                  width: max-content;
                  animation: ticker ${speed}s linear infinite;
                }

                .ticker-container:hover {
                  animation-play-state: paused;
                }

                .company-group {
                  display: flex;
                  align-items: center;
                  padding: 0 ${spacing/2}px;
                }
              `}
            </style>

            <div className="w-full overflow-hidden">
              <div className="ticker-container">
                {/* Primera repetición */}
                <div className="company-group">
                  {safeCompanies.map((company, index) => (
                    <div 
                      key={`g1-${index}`} 
                      className={`flex items-center justify-center ${isMobile ? 'px-4' : 'px-8'}`}
                    >
                      <TickerItem 
                        item={company}
                        isMobile={isMobile}
                      />
                    </div>
                  ))}
                </div>
                {/* Segunda repetición para animación continua */}
                <div className="company-group">
                  {safeCompanies.map((company, index) => (
                    <div 
                      key={`g2-${index}`}
                      className={`flex items-center justify-center ${isMobile ? 'px-4' : 'px-8'}`}
                    >
                      <TickerItem 
                        item={company}
                        isMobile={isMobile}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTicker;