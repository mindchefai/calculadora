import { useState } from 'react';
import { 
  X, 
  Cloud, 
  ChevronLeft,
  Calculator,
  AlertCircle
} from 'lucide-react';
import { espumators, EspumatorDosage } from '../data/espumators';

interface EspumarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EspumarModal: React.FC<EspumarModalProps> = ({ isOpen, onClose }) => {
  const [selectedEspumator, setSelectedEspumator] = useState<string | null>(null);
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [liquidAmount, setLiquidAmount] = useState<string>('');
  const [customDosageValue, setCustomDosageValue] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedEspumator(null);
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
    const match = amount.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/);
    if (match) {
      return [parseFloat(match[1]), parseFloat(match[2])];
    }
    const single = amount.match(/(\d+(?:\.\d+)?)/);
    if (single) {
      const val = parseFloat(single[1]);
      return [val, val];
    }
    return null;
  };

  const calculateDosage = () => {
    if (!selectedEspumator || !selectedContext || !liquidAmount) return null;

    const ingredient = espumators[selectedEspumator];
    const dosage = ingredient.dosages.find(
      (d: EspumatorDosage) => d.context.toLowerCase() === selectedContext.toLowerCase()
    );

    if (!dosage) return null;

    const amount = parseFloat(liquidAmount);
    const valueToUse = customDosageValue ? parseFloat(customDosageValue) : parseFloat(dosage.amount);

    if (isNaN(valueToUse) || isNaN(amount)) return null;

    const calculatedAmount = (amount * valueToUse) / 1000;

    return {
      amount: calculatedAmount.toFixed(2),
      unit: 'g',
      originalDosage: dosage.amount
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
                className="flex items-center gap-2 text-sm text-rose-700 hover:text-rose-900 transition-colors"
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
            Espumar
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de espumante */}
          {!selectedEspumator && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(espumators).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedEspumator(name)}
                  className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 hover:border-rose-300 text-sm font-medium text-rose-900 cursor-pointer transition-all"
                >
                  <Cloud className="w-5 h-5 text-rose-600" />
                  {name}
                </button>
              ))}
            </div>
          )}

          {/* Detalle del espumante */}
          {selectedEspumator && !selectedContext && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-rose-700 hover:text-rose-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a ingredientes
              </button>

              <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-lg border border-rose-200 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{selectedEspumator}</h3>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Base</h4>
                  <p className="text-sm text-gray-600">{espumators[selectedEspumator].base}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Características</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {espumators[selectedEspumator].characteristics.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Aplicaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {espumators[selectedEspumator].applications.map((app, idx) => (
                      <span key={idx} className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Dosificaciones</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {espumators[selectedEspumator].dosages.map((d, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedContext(d.context)}
                        className="text-left p-4 border-2 border-gray-200 rounded-lg hover:bg-rose-50 hover:border-rose-300 bg-white cursor-pointer transition-all"
                      >
                        <p className="text-sm font-semibold text-gray-800">{d.context}</p>
                        <p className="text-sm text-rose-700 font-medium">{d.amount}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Instrucciones</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                    {espumators[selectedEspumator].instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}

          {/* Calculadora de dosis */}
          {selectedEspumator && selectedContext && (
            <>
              <button onClick={resetToIngredient} className="flex items-center gap-1 text-sm text-rose-700 hover:text-rose-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a contextos de {selectedEspumator}
              </button>

              <div className="bg-white border-2 border-rose-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="text-rose-500" size={20} />
                  Calculadora de dosis
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad de líquido (ml)</label>
                    <input
                      type="number"
                      value={liquidAmount}
                      onChange={(e) => setLiquidAmount(e.target.value)}
                      placeholder="1000"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
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
                  const dosage = espumators[selectedEspumator!].dosages.find(d => d.context === selectedContext);
                  const range = dosage ? getDosageRange(dosage.amount) : null;

                  if (range && range[0] !== range[1]) {
                    const [min, max] = range;
                    return (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selecciona dosis en g/L: <strong className="text-rose-600">{customDosageValue ?? min}</strong>
                        </label>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          step="0.1"
                          value={customDosageValue ?? min}
                          onChange={(e) => setCustomDosageValue(e.target.value)}
                          className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{min}g/L</span>
                          <span>{max}g/L</span>
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
                      de <strong>{selectedEspumator}</strong>
                    </div>
                    <div className="text-sm text-green-600 mt-2 pt-2 border-t border-green-200">
                      Para {liquidAmount}ml en contexto de <strong>{selectedContext}</strong> ({calculation.originalDosage})
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

export default EspumarModal;