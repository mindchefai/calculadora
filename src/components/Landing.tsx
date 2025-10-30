import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import LeadForm from './LeadForm';
// import Calculadora from './Calculadora'; // Descomentar cuando tengas el componente

// Placeholder temporal - reemplazar con tu componente real
const Calculadora = () => (
  <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-900">
        🔪 Calculadora de Técnicas Culinarias
      </h2>
      <p className="text-gray-600">
        Aquí iría el componente Calculadora.jsx que ya tienes implementado.
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-left">
        <p className="text-sm text-gray-700">
          <strong>Nota:</strong> Reemplaza este componente con tu Calculadora.jsx real.
        </p>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('mindchefAccess');
          window.location.reload();
        }}
        className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Cerrar sesión (limpiar acceso)
      </button>
    </div>
  </div>
);

const Landing: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem('mindchefAccess');
    setHasAccess(access === 'true');
    setIsLoading(false);
  }, []);

  const handleFormSuccess = () => {
    setHasAccess(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {!hasAccess && (
          <div className="text-center mb-12 space-y-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Descubre la técnica culinaria perfecta para cada ingrediente 🍳
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calcula el método, tiempo y temperatura ideales según técnica y tipo de alimento. 
              Gratis para chefs, restaurantes y amantes de la cocina.
            </p>
          </div>
        )}

        <div className="transition-all duration-500">
          {hasAccess ? (
            <div className="animate-fadeIn">
              <Calculadora />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <LeadForm onSuccess={handleFormSuccess} />
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            Desarrollado por <span className="font-medium text-gray-600">MindChef AI</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;