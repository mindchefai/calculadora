import { useState, useEffect } from 'react';
import { Cuboid, Wind, Cloud, Grid, Flame, Thermometer, Droplet, Sun, PillBottle, X, Snail } from 'lucide-react';
import SousVideModal from './SousVideModal';
import GelificantesModal from './GelificantesModal';
import AirearModal from './AirearModal';
import EspumarModal from './EspumarModal';
import TexturizarModal from './TexturizantesModal';
import NixtamalizarModal from './NixtamalizarModal';
import EsferificarModal from './EsferificarModal';
import DeshidratarModal from './DeshidratarModal';
import EncurtirModal from './EncurtirModal';
import EscabecharModal from './EscabecharModal';

interface CalculadoraProps {
  onLogout?: () => void;
}

const techniques = [
  { name: 'Gelificar', icon: <Cuboid className="w-6 h-6 text-amber-500" /> },
  { name: 'Airear', icon: <Wind className="w-6 h-6 text-blue-500" /> },
  { name: 'Espumar', icon: <Cloud className="w-6 h-6 text-rose-500" /> },
  { name: 'Texturizar', icon: <Grid className="w-6 h-6 text-violet-500" /> },
  { name: 'Esferificar', icon: <Droplet className="w-6 h-6 text-teal-500" /> },
  { name: 'Nixtamalizar', icon: <Flame className="w-6 h-6 text-lime-600" /> },
  { name: 'Deshidratar', icon: <Sun className="w-6 h-6 text-orange-500" /> },
  { name: 'Cocinar a baja temperatura', icon: <Snail className="w-6 h-6 text-cyan-600" /> },
    { name: 'Encurtir', icon: <PillBottle className="w-6 h-6 text-pink-600" /> },
      { name: 'Escabechar', icon: <Thermometer className="w-6 h-6 text-yellow-700" /> }
];

const Calculadora: React.FC<CalculadoraProps> = ({ onLogout }) => {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTechnique(null);
  }, []);

  const handleSelectTechnique = (technique: string) => {
    setSelectedTechnique(technique);
  };

  const handleCloseTechnique = () => {
    setSelectedTechnique(null);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('mindchefAccess');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#203c42] via-[#2c413d] to-[#203c42] relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#e5b45f] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e5b45f] rounded-full blur-3xl"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="pt-8 pb-4 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex flex-col items-center space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="/MindChef_white.png" 
                    alt="MindChef Logo" 
                    className="h-12 md:h-16 w-auto"
                  />
                  <a 
                    href="https://www.mindchefai.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl md:text-4xl font-bold text-white hover:text-[#e5b45f] transition-colors"
                  >
                    MindChef
                  </a>
                </div>
                <p className="text-gray-300 text-sm">
                  Calculadora de Técnicas Culinarias
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="absolute top-8 right-4 text-sm text-gray-300 hover:text-white underline transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-4xl">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12">
              
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#203c42] mb-2">
                  Técnicas Culinarias
                </h2>
                <p className="text-gray-600">
                  Selecciona una técnica para comenzar
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techniques.map(({ name, icon }) => (
                  <button
                    key={name}
                    onClick={() => handleSelectTechnique(name)}
                    className="flex items-center gap-3 p-6 border-2 border-gray-200 rounded-xl shadow-sm 
                              hover:bg-gradient-to-br hover:from-gray-50 hover:to-white 
                              hover:border-[#e5b45f] hover:shadow-lg 
                              transition-all duration-200 cursor-pointer group"
                  >
                    <div className="group-hover:scale-110 transition-transform">
                      {icon}
                    </div>
                    <span className="text-lg font-medium text-gray-700 group-hover:text-[#203c42]">
                      {name}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 text-center">
          <p className="text-sm text-gray-400">
            Desarrollado por <span className="font-medium text-[#e5b45f]">MindChef</span>
          </p>
        </div>
      </div>

      {/* Modales de técnicas */}
      {selectedTechnique === 'Cocinar a baja temperatura' && (
        <SousVideModal isOpen onClose={handleCloseTechnique} />
      )}

      {selectedTechnique === 'Gelificar' && (
        <GelificantesModal isOpen onClose={handleCloseTechnique} />
      )}

      {selectedTechnique === 'Airear' && (
        <AirearModal isOpen onClose={handleCloseTechnique} />
      )}

      {selectedTechnique === 'Espumar' && (
        <EspumarModal isOpen onClose={handleCloseTechnique} />
      )}

      {selectedTechnique === 'Texturizar' && (
        <TexturizarModal isOpen onClose={handleCloseTechnique} />
      )}

      {selectedTechnique === 'Nixtamalizar' && (
        <NixtamalizarModal isOpen onClose={handleCloseTechnique} />
      )}

      {selectedTechnique === 'Esferificar' && (
        <EsferificarModal isOpen onClose={handleCloseTechnique} />
      )}

      {selectedTechnique === 'Deshidratar' && (
        <DeshidratarModal isOpen onClose={handleCloseTechnique} />
      )}
            {selectedTechnique === 'Encurtir' && (
        <EncurtirModal isOpen onClose={handleCloseTechnique} />
      )}
                  {selectedTechnique === 'Escabechar' && (
        <EscabecharModal isOpen onClose={handleCloseTechnique} />
      )}

      {/* Placeholder para otras técnicas */}
      {selectedTechnique && 
       selectedTechnique !== 'Cocinar a baja temperatura' && 
       selectedTechnique !== 'Gelificar' &&
       selectedTechnique !== 'Airear' &&
       selectedTechnique !== 'Espumar' && 
       selectedTechnique !== 'Texturizar' &&
       selectedTechnique !== 'Nixtamalizar' &&
       selectedTechnique !== 'Esferificar' &&
       selectedTechnique !== 'Deshidratar' && 
       selectedTechnique !== 'Encurtir' &&
      selectedTechnique !== 'Escabechar' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button
              onClick={handleCloseTechnique}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-[#203c42]">
                {selectedTechnique}
              </h2>
              <p className="text-gray-600">
                Esta técnica estará disponible próximamente.
              </p>
              <button
                onClick={handleCloseTechnique}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#e5b45f] to-[#d4a04a] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Volver al menú
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculadora;