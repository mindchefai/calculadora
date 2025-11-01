import { useState } from 'react';
import { 
  X, 
  ChevronLeft,
  Clock,
  Lightbulb,
  AlertTriangle,
  PillBottle,
  Package,
  Calculator,
  AlertCircle
} from 'lucide-react';
import { encurtidos } from '../data/encurtir';

interface EncurtirModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  'Encurtidos Rápidos': <PillBottle className="w-5 h-5 text-green-600" />,
  'Fermentados (Lacto-fermentación)': <PillBottle className="w-5 h-5 text-green-600" />,
  'Encurtidos en Conserva': <PillBottle className="w-5 h-5 text-green-600" />,
  'Encurtidos Exóticos': <PillBottle className="w-5 h-5 text-green-600" />
};

const EncurtirModal: React.FC<EncurtirModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [totalVolume, setTotalVolume] = useState<string>('');

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedCategory(null);
    setSelectedRecipe(null);
    setTotalVolume('');
  };

  const resetToCategory = () => {
    setSelectedRecipe(null);
    setTotalVolume('');
  };

  const calculateIngredients = () => {
    if (!selectedCategory || !selectedRecipe || !totalVolume) return null;

    const recipe = encurtidos[selectedCategory].recipes.find(r => r.name === selectedRecipe);
    if (!recipe) return null;

    const volume = parseFloat(totalVolume);
    if (isNaN(volume) || volume <= 0) return null;

    // Extraer sal en g/L
    const saltMatch = recipe.salt.match(/(\d+)g?\s*por litro/);
    const saltPerLiter = saltMatch ? parseInt(saltMatch[1]) : 0;
    const saltAmount = (volume * saltPerLiter) / 1000;

    // Extraer azúcar si existe
    let sugarAmount = null;
    if (recipe.sugar) {
      const sugarMatch = recipe.sugar.match(/(\d+)g?\s*por litro/);
      if (sugarMatch) {
        const sugarPerLiter = parseInt(sugarMatch[1]);
        sugarAmount = (volume * sugarPerLiter) / 1000;
      }
    }

    // Calcular vinagre y agua según el tipo de salmuera
    let vinegar = null;
    let water = null;

    if (recipe.vinegar) {
      // Tiene vinagre - buscar proporción
      const brineType = recipe.brineType.toLowerCase();
      
      if (brineType.includes('50/50')) {
        vinegar = volume * 0.5;
        water = volume * 0.5;
      } else if (brineType.includes('60/40')) {
        vinegar = volume * 0.6;
        water = volume * 0.4;
      } else if (brineType.includes('70/30')) {
        vinegar = volume * 0.7;
        water = volume * 0.3;
      } else {
        // Por defecto 50/50 si no se especifica
        vinegar = volume * 0.5;
        water = volume * 0.5;
      }
    } else {
      // Solo agua (fermentados)
      water = volume;
    }

    return {
      salt: saltAmount.toFixed(1),
      sugar: sugarAmount ? sugarAmount.toFixed(1) : null,
      vinegar: vinegar ? vinegar.toFixed(0) : null,
      water: water ? water.toFixed(0) : null
    };
  };

  const calculations = calculateIngredients();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 transition-colors"
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
            Encurtir
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de categoría */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(encurtidos).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 text-sm font-medium text-green-900 cursor-pointer transition-all"
                >
                  {categoryIcons[category]}
                  <span className="text-left flex-1">{encurtidos[category].name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Lista de recetas de la categoría */}
          {selectedCategory && !selectedRecipe && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-green-700 hover:text-green-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a categorías
              </button>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  {encurtidos[selectedCategory].description}
                </p>
              </div>

              {encurtidos[selectedCategory].generalTips.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Consejos generales</h4>
                      <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        {encurtidos[selectedCategory].generalTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {encurtidos[selectedCategory].recipes.map((recipe, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRecipe(recipe.name)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-green-300 text-left cursor-pointer transition-all"
                  >
                    <h3 className="text-md font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Tipo:</span> {recipe.brineType}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Detalle de la receta con calculadora */}
          {selectedCategory && selectedRecipe && (
            <>
              <button onClick={resetToCategory} className="flex items-center gap-1 text-sm text-green-700 hover:text-green-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a recetas de {encurtidos[selectedCategory].name}
              </button>

              {(() => {
                const recipe = encurtidos[selectedCategory].recipes.find(r => r.name === selectedRecipe);
                if (!recipe) return null;

                const showWarning = selectedCategory === 'Encurtidos en Conserva' || selectedCategory === 'Fermentados (Lacto-fermentación)';

                return (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-200 space-y-4 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800">{recipe.name}</h3>
                      
                      {/* Advertencia de seguridad si aplica */}
                      {showWarning && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-900 mb-1">⚠️ Importante - Seguridad Alimentaria</p>
                              <p className="text-sm text-red-800">
                                {selectedCategory === 'Encurtidos en Conserva' 
                                  ? 'Seguir estrictamente las medidas y tiempos de procesamiento. Usar vinagre de mínimo 5% acidez. Desechar si la tapa está abombada o hay olor extraño.'
                                  : 'Usar solo sal sin yodo. Mantener siempre sumergido en salmuera. Desechar si aparece moho de colores o mal olor anormal.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Información general */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Vegetales:</p>
                          <div className="flex flex-wrap gap-2">
                            {recipe.vegetables.map((veg, idx) => (
                              <span key={idx} className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                                {veg}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Especias:</p>
                          <div className="flex flex-wrap gap-2">
                            {recipe.spices.map((spice, idx) => (
                              <span key={idx} className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                                {spice}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Detalles de la salmuera */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-3">Composición de la salmuera</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tipo:</span>
                            <span className="font-medium text-gray-800">{recipe.brineType}</span>
                          </div>
                          {recipe.vinegar && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vinagre:</span>
                              <span className="font-medium text-gray-800">{recipe.vinegar}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sal:</span>
                            <span className="font-medium text-gray-800">{recipe.salt}</span>
                          </div>
                          {recipe.sugar && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Azúcar:</span>
                              <span className="font-medium text-gray-800">{recipe.sugar}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tiempo y almacenamiento */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                            <Clock className="w-4 h-4 text-green-600" />
                            Tiempo:
                          </p>
                          <p className="text-lg font-semibold text-gray-800">{recipe.time}</p>
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                            <Package className="w-4 h-4 text-green-600" />
                            Almacenamiento:
                          </p>
                          <p className="text-sm font-semibold text-gray-800">{recipe.storage}</p>
                        </div>
                      </div>
                    </div>

                    {/* CALCULADORA */}
                    <div className="bg-white border-2 border-green-300 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Calculator className="text-green-600" size={20} />
                        Calculadora de salmuera
                      </h3>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Volumen total de salmuera (ml)
                        </label>
                        <input
                          type="number"
                          value={totalVolume}
                          onChange={(e) => setTotalVolume(e.target.value)}
                          placeholder="1000"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Introduce el volumen total de salmuera que necesitas
                        </p>
                      </div>

                      {calculations && (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertCircle className="text-green-600" size={20} />
                              <span className="font-semibold text-green-900">Ingredientes necesarios</span>
                            </div>
                            
                            <div className="space-y-3">
                              {calculations.vinegar && (
                                <div className="bg-white p-3 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Vinagre ({recipe.vinegar})</span>
                                    <span className="text-xl font-bold text-green-700">{calculations.vinegar}ml</span>
                                  </div>
                                </div>
                              )}

                              {calculations.water && (
                                <div className="bg-white p-3 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Agua</span>
                                    <span className="text-xl font-bold text-green-700">{calculations.water}ml</span>
                                  </div>
                                </div>
                              )}

                              <div className="bg-white p-3 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-700">Sal</span>
                                  <span className="text-xl font-bold text-green-700">{calculations.salt}g</span>
                                </div>
                              </div>

                              {calculations.sugar && (
                                <div className="bg-white p-3 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Azúcar</span>
                                    <span className="text-xl font-bold text-green-700">{calculations.sugar}g</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-green-200 text-xs text-green-700">
                              Para <strong>{totalVolume}ml</strong> de salmuera total
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preparación paso a paso */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-700 mb-4">Preparación paso a paso</h4>
                      <ol className="space-y-3">
                        {recipe.preparation.map((step, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-700 pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Consejos específicos */}
                    {recipe.tips.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-900 mb-2">Consejos útiles</h4>
                            <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                              {recipe.tips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Usos */}
                    {recipe.uses.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-700 mb-3">Usos y aplicaciones</h4>
                        <div className="flex flex-wrap gap-2">
                          {recipe.uses.map((use, idx) => (
                            <span key={idx} className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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

export default EncurtirModal;