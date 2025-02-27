import React, { useState, useEffect } from 'react';

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

interface NavbarProps {
  logo?: React.ReactNode | string;
  logoUrl?: string;
  logoAlt?: string;
  logoClassName?: string;
  bgColor?: string;
  links?: NavLink[];
  className?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonStyles?: ButtonStyles;
  containerClassName?: string;
  navLinksClassName?: string;
  mobileMenuClassName?: string;
  buttonHref?: string;
  showButton?: boolean;
}


const Navbar: React.FC<NavbarProps> = ({ 
  logo = 'LOGO',
  logoUrl,
  logoAlt = 'Logo',
  logoClassName = 'font-bold text-xl',
  links = [
    { href: '#link1', label: 'Link 1' },
    { href: '#link2', label: 'Link 2' },
    { href: '#link3', label: 'Link 3' }
  ],
  className = '',
  buttonText = 'Call to action',
  onButtonClick,
  buttonStyles = {
    className: ''
  },
  containerClassName = 'max-w-7xl mx-auto px-6',
  navLinksClassName = 'transition-colors duration-300',
  mobileMenuClassName = '',
  buttonHref = '/#contacto',
  showButton = true,
  bgColor = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClasses = `${navLinksClassName} ${
    isScrolled 
      ? 'text-gray-900 hover:text-gray-600' 
      : `${bgColor ? 'md:text-white hover:text-blue-100 text-gray-900' : 'md:text-white hover:text-blue-100 text-gray-900'}`
  }`;

  // Modificamos el navBackground para manejar el fondo azul en móvil

 
  const navBackground = `
    ${isScrolled 
      ? 'md:bg-white md:shadow-lg bg-white' 
      : `${bgColor ? bgColor   : 'md:bg-transparent bg-blue-600'}`
    }
  `;

  const renderLogo = () => {
    if (logoUrl) {
      return (
        <img 
          src={logoUrl} 
          alt={logoAlt} 
          className={`${logoClassName} z-50 transition-opacity duration-300 ${
            isScrolled ? 'opacity-90' : 'opacity-100'
          }`}
        />
      );
    }
    if (typeof logo === 'string') {
      return (
        <div className={`${logoClassName} z-50 transition-colors duration-300 ${
          isScrolled 
            ? 'text-gray-900' 
            : 'md:text-white text-white'
        }`}>
          {logo}
        </div>
      );
    }
    return logo;
  };

  // Modificamos las clases para el menú móvil
  const mobileMenuTextClasses = isScrolled 
    ? 'text-gray-900 hover:text-gray-600' 
    : 'text-white hover:text-gray-200';

  const mobileMenuBgClasses = isScrolled 
    ? 'bg-white' 
    : 'bg-blue-600';

  return (
    <nav className={`block md:fixed md:top-0 md:left-0 md:right-0 w-full z-50 transition-all duration-300 ${navBackground} ${className}`}>
      <div className={`${containerClassName} ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <a href="/">
              {renderLogo()}
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {links.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className={linkClasses}
              >
                {link.icon && (
                  <span className={`mr-2 transition-colors duration-300 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    {link.icon}
                  </span>
                )}
                {link.label}
              </a>
            ))}

            {showButton && (
              <a 
                href={buttonHref}
                onClick={onButtonClick}
                className={`${
                  isScrolled 
                    ? 'text-blue-500 hover:text-blue-700' 
                    : 'text-white hover:text-blue-100'
                } transition-colors duration-300 ${buttonStyles.className}`}
              >
                {buttonText}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors z-50 ml-auto"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-gray-900' : 'bg-white'
            } ${isOpen ? 'rotate-45 translate-y-2' : 'mb-1.5'}`}
            />
            <span className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-gray-900' : 'bg-white'
            } ${isOpen ? 'opacity-0' : 'mb-1.5'}`}
            />
            <span className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-gray-900' : 'bg-white'
            } ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>

        {/* Mobile Menu Container */}
        <div className="md:hidden">
          <div 
            className={`
              ${mobileMenuBgClasses}
              transition-all duration-300 ease-in-out
              transform
              ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
              ${mobileMenuClassName}
            `}
          >
            <div className="p-6 space-y-4 text-right">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`block transition-all duration-300 ${mobileMenuTextClasses}`}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.label}
                </a>
              ))}
              
              {showButton && (
                <div className="pt-4">
                  <a 
                    href={buttonHref}
                    onClick={() => {
                      onButtonClick?.();
                      setIsOpen(false);
                    }}
                    className={`block transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-blue-500 hover:text-blue-800' 
                        : 'text-white hover:text-blue-100'
                    } ${buttonStyles.className}`}
                  >
                    {buttonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;