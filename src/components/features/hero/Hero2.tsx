import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a 
    href={href}
    className="text-gray-600 hover:text-gray-900 transition-colors"
  >
    {children}
  </a>
);

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => (
  <nav className={`flex items-center justify-between py-4 ${className}`}>
    <div className="font-bold text-xl">LOGO</div>
    <div className="hidden md:flex items-center gap-8">
      <NavLink href="#link1">Link 1</NavLink>
      <NavLink href="#link2">Link 2</NavLink>
      <NavLink href="#link3">Link 3</NavLink>
      <button className="bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
        Call to action
      </button>
    </div>
  </nav>
);

interface HeroProps {
  className?: string;
  containerClassName?: string;
}

const Hero2: React.FC<HeroProps> = ({
  className = '',
  containerClassName = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        <Navbar />
        
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-16 gap-12">
          {/* Contenido izquierdo */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Your main value proposition
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
              sed do eiusmod tempor incididunt ut.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-gray-100 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
                Call to action
              </button>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">+465 users</span>
                <div className="flex">
                  {"★".repeat(5).split("").map((star, i) => (
                    <span key={i} className="text-yellow-400">{star}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ilustración derecha */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Ilustración de interfaz */}
              <div className="absolute inset-0 bg-gray-100 rounded-lg transform rotate-3"></div>
              <div className="relative bg-white p-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Personaje */}
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                <div className="w-32 h-32 relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full opacity-20"></div>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hook text */}
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Hook them for the scroll
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero2;