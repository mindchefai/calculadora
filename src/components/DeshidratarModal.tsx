import { useState } from 'react';
import { 
  X, 
  ChevronLeft,
  Clock,
  Thermometer,
  Lightbulb,
  AlertTriangle,
  Ruler,
  Apple,
  Leaf,
  Flower2,
  Beef,
  Sprout
} from 'lucide-react';
import { deshidratacion } from '../data/deshidratar';

interface DeshidratarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  'Frutas': <Apple className="w-5 h-5 text-orange-600" />,
  'Verduras y Hortalizas': <Sprout className="w-5 h-5 text-green-600" />,
  'Hierbas y Especias': <Leaf className="w-5 h-5 text-emerald-600" />,
  'Carnes y Pescados': <Beef className="w-5 h-5 text-red-600" />,
  'Flores Comestibles': <Flower2 className="w-5 h-5 text-pink-600" />
};

const DeshidratarModal: React.FC<DeshidratarModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedCategory(null);
    setSelectedItem(null);
  };

  const resetToCategory = () => {
    setSelectedItem(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-orange-700 hover:text-orange-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Menú principal
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#203c42] mt-4 text-center">
            Deshidratar
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de categoría */}
          {!selectedCategory && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.keys(deshidratacion).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:border-orange-300 text-sm font-medium text-orange-900 cursor-pointer transition-all"
                >
                  {categoryIcons[category]}
                  {deshidratacion[category].name}
                </button>
              ))}
            </div>
          )}

          {/* Lista de items de la categoría */}
          {selectedCategory && !selectedItem && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-orange-700 hover:text-orange-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a categorías
              </button>

              {deshidratacion[selectedCategory].generalTips.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Consejos generales</h4>
                      <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        {deshidratacion[selectedCategory].generalTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deshidratacion[selectedCategory].items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedItem(item.name)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-orange-300 text-left cursor-pointer transition-all"
                  >
                    <h3 className="text-md font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>{item.temperature}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Detalle del item */}
          {selectedCategory && selectedItem && (
            <>
              <button onClick={resetToCategory} className="flex items-center gap-1 text-sm text-orange-700 hover:text-orange-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a productos de {selectedCategory}
              </button>

              {(() => {
                const item = deshidratacion[selectedCategory].items.find(i => i.name === selectedItem);
                if (!item) return null;

                const showWarning = selectedCategory === 'Carnes y Pescados' || selectedCategory === 'Flores Comestibles';

                return (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-200 space-y-4 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      
                      {/* Advertencia de seguridad si aplica */}
                      {showWarning && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-900 mb-1">⚠️ Importante - Seguridad Alimentaria</p>
                              <p className="text-sm text-red-800">
                                {selectedCategory === 'Carnes y Pescados' 
                                  ? 'Las carnes y pescados deben alcanzar temperaturas seguras (mínimo 60-70°C) y mantenerse refrigeradas. Usa solo productos frescos de alta calidad.'
                                  : 'Solo usar flores comestibles certificadas. NUNCA uses flores de floristerías ya que contienen pesticidas y químicos no aptos para consumo.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Parámetros principales */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                            <Thermometer className="w-4 h-4 text-orange-600" />
                            Temperatura:
                          </p>
                          <p className="text-lg font-semibold text-gray-800">{item.temperature}</p>
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                            <Clock className="w-4 h-4 text-orange-600" />
                            Tiempo:
                          </p>
                          <p className="text-lg font-semibold text-gray-800">{item.time}</p>
                        </div>

                        {item.thickness && (
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                              <Ruler className="w-4 h-4 text-orange-600" />
                              Grosor:
                            </p>
                            <p className="text-lg font-semibold text-gray-800">{item.thickness}</p>
                          </div>
                        )}
                      </div>

                      {/* Preparación paso a paso */}
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Preparación:</p>
                        <ol className="space-y-2">
                          {item.preparation.map((step, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-gray-700 pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Consejos específicos */}
                      {item.tips.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Consejos:</p>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {item.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Usos */}
                      {item.uses.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Usos y aplicaciones:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.uses.map((use, idx) => (
                              <span key={idx} className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeshidratarModal;