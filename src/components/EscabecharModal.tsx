import { useState } from 'react';
import { 
  X, 
  ChevronLeft,
  Clock,
  Lightbulb,
  Calculator,
  AlertCircle,
  Fish,
  Drumstick,
  Carrot
} from 'lucide-react';
import { escabeches } from '../data/escabechar';

interface EscabecharModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  'Pescados y Mariscos': <Fish className="w-5 h-5 text-blue-600" />,
  'Aves y Carnes': <Drumstick className="w-5 h-5 text-amber-600" />,
  'Vegetales': <Carrot className="w-5 h-5 text-green-600" />
};

const EscabecharModal: React.FC<EscabecharModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [oilAmount, setOilAmount] = useState<string>('');

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedCategory(null);
    setSelectedRecipe(null);
    setOilAmount('');
  };

  const resetToCategory = () => {
    setSelectedRecipe(null);
    setOilAmount('');
  };

  const calculateIngredients = () => {
    if (!selectedCategory || !selectedRecipe || !oilAmount) return null;

    const recipe = escabeches[selectedCategory].recipes.find(r => r.name === selectedRecipe);
    if (!recipe) return null;

    const oil = parseFloat(oilAmount);
    if (isNaN(oil) || oil <= 0) return null;

    // Calcular vinagre
    const vinegarMatch = recipe.vinegarRatio.match(/(\d+)-?(\d+)?/);
    let vinegarMin = 0, vinegarMax = 0;
    if (vinegarMatch) {
      vinegarMin = (oil * parseInt(vinegarMatch[1])) / 100;
      vinegarMax = vinegarMatch[2] ? (oil * parseInt(vinegarMatch[2])) / 100 : vinegarMin;
    }

    // Calcular ingredientes
    const calculatedIngredients = recipe.ingredients.map(ing => {
      let amount = '';
      let unit = '';
      
      // Extraer cantidad y unidad
      if (ing.amount.includes('g por litro')) {
        const match = ing.amount.match(/(\d+)g\s*por litro/);
        if (match) {
          const gramsPerLiter = parseInt(match[1]);
          const calculated = (oil * gramsPerLiter) / 1000;
          amount = calculated.toFixed(0);
          unit = 'g';
        }
      } else if (ing.amount.includes('dientes por litro')) {
        const match = ing.amount.match(/(\d+)-?(\d+)?\s*dientes por litro/);
        if (match) {
          const min = parseInt(match[1]);
          const max = match[2] ? parseInt(match[2]) : min;
          const calculatedMin = Math.round((oil * min) / 1000);
          const calculatedMax = Math.round((oil * max) / 1000);
          amount = calculatedMin === calculatedMax ? `${calculatedMin}` : `${calculatedMin}-${calculatedMax}`;
          unit = calculatedMin === 1 && calculatedMax === 1 ? 'diente' : 'dientes';
        }
      } else if (ing.amount.includes('ml por litro')) {
        const match = ing.amount.match(/(\d+)ml\s*por litro/);
        if (match) {
          const mlPerLiter = parseInt(match[1]);
          const calculated = (oil * mlPerLiter) / 1000;
          amount = calculated.toFixed(0);
          unit = 'ml';
        }
      } else if (ing.amount.includes('por litro de aceite')) {
        const match = ing.amount.match(/(\d+)\s*por litro/);
        if (match) {
          const perLiter = parseInt(match[1]);
          const calculated = Math.round((oil * perLiter) / 1000);
          amount = `${calculated}`;
          unit = '';
        }
      }

      return {
        name: ing.name,
        amount: amount ? `${amount}${unit}` : ing.amount,
        optional: ing.optional
      };
    });

    return {
      vinegar: {
        min: vinegarMin.toFixed(0),
        max: vinegarMax.toFixed(0)
      },
      ingredients: calculatedIngredients
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
                className="flex items-center gap-2 text-sm text-yellow-700 hover:text-yellow-900 transition-colors"
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
            Escabechar
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de categoría */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.keys(escabeches).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 hover:border-yellow-300 text-sm font-medium text-yellow-900 cursor-pointer transition-all"
                >
                  {categoryIcons[category]}
                  <span className="text-left flex-1">{escabeches[category].name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Lista de recetas de la categoría */}
          {selectedCategory && !selectedRecipe && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-yellow-700 hover:text-yellow-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a categorías
              </button>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  {escabeches[selectedCategory].description}
                </p>
              </div>

              {escabeches[selectedCategory].generalTips.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Consejos generales</h4>
                      <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        {escabeches[selectedCategory].generalTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {escabeches[selectedCategory].recipes.map((recipe, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRecipe(recipe.name)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-yellow-300 text-left cursor-pointer transition-all"
                  >
                    <h3 className="text-md font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{recipe.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Marinado: {recipe.marinadeTime}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Detalle de la receta con calculadora */}
          {selectedCategory && selectedRecipe && (
            <>
              <button onClick={resetToCategory} className="flex items-center gap-1 text-sm text-yellow-700 hover:text-yellow-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a recetas de {escabeches[selectedCategory].name}
              </button>

              {(() => {
                const recipe = escabeches[selectedCategory].recipes.find(r => r.name === selectedRecipe);
                if (!recipe) return null;

                return (
                  <div className="space-y-6">
                    {/* Información básica */}
                    <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-lg border border-yellow-200 space-y-4 shadow-sm">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{recipe.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                      </div>

                      {/* Tipos de aceite */}
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Aceites recomendados:</p>
                        <div className="flex flex-wrap gap-2">
                          {recipe.oilType.map((oil, idx) => (
                            <span key={idx} className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                              {oil}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tiempos */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {recipe.cookingTime && (
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-600 mb-1">Cocción</p>
                            <p className="text-sm font-semibold text-gray-800">{recipe.cookingTime}</p>
                          </div>
                        )}
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">Marinado</p>
                          <p className="text-sm font-semibold text-gray-800">{recipe.marinadeTime}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">Conservación</p>
                          <p className="text-sm font-semibold text-gray-800">{recipe.storage}</p>
                        </div>
                      </div>
                    </div>

                    {/* CALCULADORA */}
                    <div className="bg-white border-2 border-yellow-300 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Calculator className="text-yellow-600" size={20} />
                        Calculadora de proporciones
                      </h3>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cantidad de aceite (ml)
                        </label>
                        <input
                          type="number"
                          value={oilAmount}
                          onChange={(e) => setOilAmount(e.target.value)}
                          placeholder="1000"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Introduce la cantidad de aceite que vas a usar
                        </p>
                      </div>

                      {calculations && (
                        <div className="space-y-4">
                          {/* Vinagre */}
                          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-lg p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertCircle className="text-yellow-600" size={20} />
                              <span className="font-semibold text-yellow-900">Vinagre necesario</span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-800">
                              {calculations.vinegar.min === calculations.vinegar.max 
                                ? `${calculations.vinegar.min}ml`
                                : `${calculations.vinegar.min}-${calculations.vinegar.max}ml`}
                            </div>
                            <div className="text-xs text-yellow-700 mt-1">
                              ({recipe.vinegarRatio} del aceite)
                            </div>
                          </div>

                          {/* Ingredientes calculados */}
                          <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                            <h4 className="font-semibold text-gray-700 mb-3">Ingredientes principales</h4>
                            <div className="space-y-2">
                              {calculations.ingredients.map((ing, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                  <span className="text-sm text-gray-700">
                                    {ing.name}
                                    {ing.optional && <span className="text-xs text-gray-500 ml-1">(opcional)</span>}
                                  </span>
                                  <span className="text-sm font-semibold text-gray-800">{ing.amount}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Especias */}
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h4 className="font-semibold text-amber-900 mb-2">Especias y aromáticos</h4>
                            <div className="flex flex-wrap gap-2">
                              {recipe.spices.map((spice, idx) => (
                                <span key={idx} className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                                  {spice}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-amber-700 mt-2">
                              *Al gusto, según preferencia personal
                            </p>
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
                            <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
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
                            <span key={idx} className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full">
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

export default EscabecharModal;