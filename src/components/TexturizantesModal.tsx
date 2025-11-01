import { useState } from 'react';
import { 
  X, 
  Grid, 
  ChevronLeft,
  Calculator,
  AlertCircle
} from 'lucide-react';
import { texturizantes, Dosage } from '../data/texturizantes';

interface TexturizarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TexturizarModal: React.FC<TexturizarModalProps> = ({ isOpen, onClose }) => {
  const [selectedTexturizer, setSelectedTexturizer] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const [liquidAmount, setLiquidAmount] = useState<string>('');
  const [customDosageValue, setCustomDosageValue] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedTexturizer(null);
    setSelectedTexture(null);
    setLiquidAmount('');
    setCustomDosageValue(null);
  };

  const resetToIngredient = () => {
    setSelectedTexture(null);
    setLiquidAmount('');
    setCustomDosageValue(null);
  };

  const getDosageRange = (amount: string): [number, number] | null => {
    const cleanAmount = amount.replace(/[≈~]/g, '').trim();
    const match = cleanAmount.match(/(\d+(?:\.\d+)?)\s*[-–to]+\s*(\d+(?:\.\d+)?)/);
    if (match) {
      const min = parseFloat(match[1]);
      const max = parseFloat(match[2]);
      return [min, max];
    }
    return null;
  };

  const getDosageUnit = (amount: string): 'percent' | 'g_per_l' => {
    return amount.includes('%') ? 'percent' : 'g_per_l';
  };

  const calculateDosage = () => {
    if (!selectedTexturizer || !selectedTexture || !liquidAmount) return null;

    const ingredient = texturizantes[selectedTexturizer];
    const dosage = ingredient.dosages.find((d: Dosage) => d.texture.toLowerCase() === selectedTexture.toLowerCase());
    if (!dosage) return null;

    const unitType = getDosageUnit(dosage.amount);
    const amount = parseFloat(liquidAmount);
    const dosageValue = customDosageValue ? parseFloat(customDosageValue) : parseFloat(dosage.amount);

    if (isNaN(amount) || isNaN(dosageValue)) return null;

    const calculated =
      unitType === 'percent'
        ? (amount * dosageValue) / 100
        : (amount * dosageValue) / 1000;

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
                className="flex items-center gap-2 text-sm text-violet-700 hover:text-violet-900 transition-colors"
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
            Texturizar
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de texturizante */}
          {!selectedTexturizer && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(texturizantes).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedTexturizer(name)}
                  className="flex items-center gap-3 p-4 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 hover:border-violet-300 text-sm font-medium text-violet-900 cursor-pointer transition-all"
                >
                  <Grid className="w-5 h-5 text-violet-600" />
                  {name}
                </button>
              ))}
            </div>
          )}

          {/* Detalle del texturizante */}
          {selectedTexturizer && !selectedTexture && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-violet-700 hover:text-violet-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a ingredientes
              </button>

              <div className="bg-gradient-to-br from-violet-50 to-white p-6 rounded-lg border border-violet-200 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{selectedTexturizer}</h3>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Origen</h4>
                  <p className="text-sm text-gray-600">{texturizantes[selectedTexturizer].origin}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Hidratación</h4>
                    <p className="text-sm text-gray-600">{texturizantes[selectedTexturizer].hydrationTemp}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Gelificación</h4>
                    <p className="text-sm text-gray-600">{texturizantes[selectedTexturizer].gelTemp}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Características</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {texturizantes[selectedTexturizer].characteristics.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Aplicaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {texturizantes[selectedTexturizer].applications.map((app, idx) => (
                      <span key={idx} className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-xs font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Dosificaciones</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {texturizantes[selectedTexturizer].dosages.map((d, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTexture(d.texture)}
                        className="text-left p-4 border-2 border-gray-200 rounded-lg hover:bg-violet-50 hover:border-violet-300 bg-white cursor-pointer transition-all"
                      >
                        <p className="text-sm font-semibold text-gray-800">{d.texture}</p>
                        <p className="text-sm text-violet-700 font-medium">{d.amount}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Instrucciones</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                    {texturizantes[selectedTexturizer].instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}

          {/* Calculadora de dosis */}
          {selectedTexturizer && selectedTexture && (
            <>
              <button onClick={resetToIngredient} className="flex items-center gap-1 text-sm text-violet-700 hover:text-violet-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a texturas de {selectedTexturizer}
              </button>

              <div className="bg-white border-2 border-violet-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="text-violet-500" size={20} />
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
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Textura seleccionada</label>
                    <input
                      disabled
                      value={selectedTexture}
                      className="w-full p-3 border-2 bg-gray-50 border-gray-300 rounded-lg text-sm text-gray-700"
                    />
                  </div>
                </div>

                {/* Slider para rangos */}
                {(() => {
                  const dosage = texturizantes[selectedTexturizer!].dosages.find(d => d.texture === selectedTexture);
                  const range = dosage ? getDosageRange(dosage.amount) : null;
                  const unitType = dosage ? getDosageUnit(dosage.amount) : 'g_per_l';

                  if (range && range[0] !== range[1]) {
                    const [min, max] = range;
                    return (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selecciona dosis: <strong className="text-violet-600">{customDosageValue ?? min} {unitType === 'percent' ? '%' : 'g/L'}</strong>
                        </label>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          step="0.1"
                          value={customDosageValue ?? min}
                          onChange={(e) => setCustomDosageValue(e.target.value)}
                          className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{min}{unitType === 'percent' ? '%' : 'g/L'}</span>
                          <span>{max}{unitType === 'percent' ? '%' : 'g/L'}</span>
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
                      de <strong>{selectedTexturizer}</strong>
                    </div>
                    <div className="text-sm text-green-600 mt-2 pt-2 border-t border-green-200">
                      Para {liquidAmount}ml con textura de <strong>{selectedTexture}</strong> ({calculation.originalDosage})
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

export default TexturizarModal;