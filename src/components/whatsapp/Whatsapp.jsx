import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const WhatsAppButton = ({ phoneNumber = "1234567890" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Form Panel */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg w-72 overflow-hidden transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-[#25D366] p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="text-white" size={24} />
              <span className="text-white font-medium">Enviar mensaje</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-[#128C7E] p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none resize-none mb-3 h-32"
            />
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span>Enviar</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#128C7E] w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="text-white" size={32} />
      </button>
    </div>
  );
};

export default WhatsAppButton;