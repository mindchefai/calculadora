import { useState } from 'react';
import { 
  X, 
  Flame, 
  ChevronLeft,
  Calculator,
  AlertCircle
} from 'lucide-react';
import { nixtamalizadores } from '../data/nixtamalizar';

interface NixtamalizarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NixtamalizarModal: React.FC<NixtamalizarModalProps> = ({ isOpen, onClose }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [liquidAmount, setLiquidAmount] = useState<string>('');
  const [customDosageValue, setCustomDosageValue] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedIngredient(null);
    setSelectedContext(null);
    setLiquidAmount('');
    setCustomDosageValue(null);
  };

  const resetToIngredient = () => {
    setSelectedContext(null);
    setLiquidAmount('');
    setCustomDosageValue(null);
  };

  const getDosageRange = (amount: string): [number, number] | null => {
    const clean = amount.replace(/[≈~]/g, '').trim();
    const match = clean.match(/(\d+(?:\.\d+)?)\s*[-–to]+\s*(\d+(?:\.\d+)?)/);
    if (match) return [parseFloat(match[1]), parseFloat(match[2])];
    const single = clean.match(/(\d+(?:\.\d+)?)/);
    if (single) {
      const val = parseFloat(single[1]);
      return [val, val];
    }
    return null;
  };

  const getDosageUnit = (amount: string): 'percent' | 'g_per_l' | 'g_per_kg' => {
    if (amount.includes('%')) return 'percent';
    if (amount.includes('g/kg')) return 'g_per_kg';
    return 'g_per_l';
  };

  const calculateDosage = () => {
    if (!selectedIngredient || !selectedContext || !liquidAmount) return null;

    const ingredient = nixtamalizadores[selectedIngredient];
    const dosage = ingredient.dosages.find(
      (d) => d.context.toLowerCase() === selectedContext.toLowerCase()
    );

    if (!dosage) return null;

    const unitType = getDosageUnit(dosage.amount);
    const baseValue = customDosageValue ?? dosage.amount.match(/(\d+(?:\.\d+)?)/)?.[1];
    if (!baseValue) return null;

    const amount = parseFloat(liquidAmount);
    const dosageValue = parseFloat(baseValue);

    if (isNaN(amount) || isNaN(dosageValue)) return null;

    let calculated: number;
    if (unitType === 'percent') {
      calculated = (amount * dosageValue) / 100;
    } else if (unitType === 'g_per_kg') {
      calculated = (amount * dosageValue) / 1000;
    } else {
      calculated = (amount * dosageValue) / 1000;
    }

    return {
      amount: calculated.toFixed(2),
      unit: 'g',
      originalDosage: dosage.amount,
      unitType
    };
  };

  const calculation = calculateDosage();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-lime-700 hover:text-lime-900 transition-colors"
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
            Nixtamalizar
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de ingrediente */}
          {!selectedIngredient && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(nixtamalizadores).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedIngredient(name)}
                  className="flex items-center gap-3 p-4 bg-lime-50 border border-lime-200 rounded-lg hover:bg-lime-100 hover:border-lime-300 text-sm font-medium text-lime-900 cursor-pointer transition-all"
                >
                  <Flame className="w-5 h-5 text-lime-600" />
                  {name}
                </button>
              ))}
            </div>
          )}

          {/* Detalle del ingrediente */}
          {selectedIngredient && !selectedContext && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-lime-700 hover:text-lime-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a ingredientes
              </button>

              <div className="bg-gradient-to-br from-lime-50 to-white p-6 rounded-lg border border-lime-200 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{selectedIngredient}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Origen</h4>
                    <p className="text-sm text-gray-600">{nixtamalizadores[selectedIngredient].origin}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">pH</h4>
                    <p className="text-sm text-gray-600">{nixtamalizadores[selectedIngredient].ph}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Características</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {nixtamalizadores[selectedIngredient].characteristics.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Aplicaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {nixtamalizadores[selectedIngredient].applications.map((app, idx) => (
                      <span key={idx} className="bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-xs font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Dosificaciones</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nixtamalizadores[selectedIngredient].dosages.map((d, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedContext(d.context)}
                        className="text-left p-4 border-2 border-gray-200 rounded-lg hover:bg-lime-50 hover:border-lime-300 bg-white cursor-pointer transition-all"
                      >
                        <p className="text-sm font-semibold text-gray-800">{d.context}</p>
                        <p className="text-sm text-lime-700 font-medium">{d.amount}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Instrucciones</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                    {nixtamalizadores[selectedIngredient].instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}

          {/* Calculadora de dosis */}
          {selectedIngredient && selectedContext && (
            <>
              <button onClick={resetToIngredient} className="flex items-center gap-1 text-sm text-lime-700 hover:text-lime-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a contextos de {selectedIngredient}
              </button>

              <div className="bg-white border-2 border-lime-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="text-lime-500" size={20} />
                  Calculadora de dosis
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad {(() => {
                        const dosage = nixtamalizadores[selectedIngredient!].dosages.find(d => d.context === selectedContext);
                        const unit = dosage ? getDosageUnit(dosage.amount) : 'g_per_l';
                        return unit === 'g_per_kg' ? '(g o kg)' : '(ml o L)';
                      })()}
                    </label>
                    <input
                      type="number"
                      value={liquidAmount}
                      onChange={(e) => setLiquidAmount(e.target.value)}
                      placeholder="1000"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contexto seleccionado</label>
                    <input
                      disabled
                      value={selectedContext}
                      className="w-full p-3 border-2 bg-gray-50 border-gray-300 rounded-lg text-sm text-gray-700"
                    />
                  </div>
                </div>

                {/* Slider para rangos */}
                {(() => {
                  const dosage = nixtamalizadores[selectedIngredient!].dosages.find(d => d.context === selectedContext);
                  if (!dosage) return null;

                  const range = getDosageRange(dosage.amount);
                  const unitType = getDosageUnit(dosage.amount);
                  const unitLabel = unitType === 'percent' ? '%' : unitType === 'g_per_kg' ? 'g/kg' : 'g/L';

                  if (range && range[0] !== range[1]) {
                    const [min, max] = range;
                    return (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selecciona dosis: <strong className="text-lime-600">{customDosageValue ?? min} {unitLabel}</strong>
                        </label>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          step="0.1"
                          value={customDosageValue ?? min}
                          onChange={(e) => setCustomDosageValue(e.target.value)}
                          className="w-full h-2 bg-lime-200 rounded-lg appearance-none cursor-pointer accent-lime-500"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{min}{unitLabel}</span>
                          <span>{max}{unitLabel}</span>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })()}

                {calculation && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="text-green-600" size={24} />
                      <span className="font-semibold text-green-800 text-lg">Resultado del cálculo</span>
                    </div>
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {calculation.amount} {calculation.unit}
                    </div>
                    <div className="text-sm text-green-700">
                      de <strong>{selectedIngredient}</strong>
                    </div>
                    <div className="text-sm text-green-600 mt-2 pt-2 border-t border-green-200">
                      Para {liquidAmount}{(() => {
                        const dosage = nixtamalizadores[selectedIngredient!].dosages.find(d => d.context === selectedContext);
                        const unit = dosage ? getDosageUnit(dosage.amount) : 'g_per_l';
                        return unit === 'g_per_kg' ? 'g' : 'ml';
                      })()} en <strong>{selectedContext}</strong> ({calculation.originalDosage})
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NixtamalizarModal;