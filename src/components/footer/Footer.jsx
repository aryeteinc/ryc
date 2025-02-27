import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

// Componente personalizado para el ícono de X (antes Twitter)
const XIcon = ({ className = "", size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 4l16 16" />
    <path d="M4 20L20 4" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 1999;
  
  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Columna 1: Información de la empresa */}
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white text-center sm:text-left mb-4 sm:mb-6">
              Rodriguez y Carvajal SAS
            </h3>
            <div className="flex items-start space-x-3 justify-center sm:justify-start">
              <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-body capitalize">Fundada en 1999</p>
                <p className="text-sm text-gray-400 capitalize">{yearsOfExperience} años de experiencia</p>
              </div>
            </div>
          </div>

          {/* Columna 2: Ubicación y contacto */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-white text-center sm:text-left mb-4 sm:mb-6 capitalize">
              Contacto
            </h3>
            <div className="flex items-start space-x-3 justify-center sm:justify-start">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="font-body capitalize">
                Calle 26 N 16 A -95
                <br className="hidden sm:block" />
                Oficina 201
                <br />
                Barrio Santa Fe
              </p>
            </div>
            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <a 
                href="tel:+573234633005" 
                className="font-body hover:text-white transition-colors duration-300"
              >
                323 4633005
              </a>
            </div>
          </div>

          {/* Columna 3: Correos electrónicos */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-white text-center sm:text-left mb-4 sm:mb-6 capitalize">
              Correo Electrónico
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a 
                  href="mailto:administracion@rodriguezycarvajal.com" 
                  className="font-body text-center sm:text-left hover:text-white transition-colors duration-300 break-all sm:break-normal"
                >
                  administracion@rodriguezycarvajal.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a 
                  href="mailto:gerencia@rodriguezycarvajal.com"
                  className="font-body text-center sm:text-left hover:text-white transition-colors duration-300 break-all sm:break-normal"
                >
                  gerencia@rodriguezycarvajal.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="mt-8 sm:mt-12 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Facebook className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <XIcon className="w-6 h-6" />
            <span className="sr-only">X (antes Twitter)</span>
          </a>
        </div>

        {/* Línea divisoria responsiva */}
        <div className="my-8 sm:my-12 border-t border-gray-800" />

        {/* Copyright con tamaño de texto responsivo */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-400 capitalize">
            © {currentYear} Rodriguez y Carvajal SAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;