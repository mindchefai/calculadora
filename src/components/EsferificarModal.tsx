import { useState } from 'react';
import { 
  X, 
  Droplet, 
  ChevronLeft,
  Calculator,
  Lightbulb,
  Beaker
} from 'lucide-react';
import { esferificaciones } from '../data/esferificar';

interface EsferificarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EsferificarModal: React.FC<EsferificarModalProps> = ({ isOpen, onClose }) => {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [selectedDosage, setSelectedDosage] = useState<number | null>(null);
  const [liquidAmount, setLiquidAmount] = useState<string>('');
  const [bathAmount, setBathAmount] = useState<string>('');

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedTechnique(null);
    setSelectedDosage(null);
    setLiquidAmount('');
    setBathAmount('');
  };

  const resetToTechnique = () => {
    setSelectedDosage(null);
    setLiquidAmount('');
    setBathAmount('');
  };

  const extractDosageValue = (dosageStr: string, ingredientName: string): number | null => {
    // Buscar el patrón "Xg/L de [ingrediente]" o "Xg/L [ingrediente]"
    const pattern = new RegExp(`(\\d+(?:\\.\\d+)?)g/L\\s+(?:de\\s+)?${ingredientName}`, 'i');
    const match = dosageStr.match(pattern);
    if (match) {
      return parseFloat(match[1]);
    }
    return null;
  };

  const calculateDosages = () => {
    if (!selectedTechnique || selectedDosage === null || !liquidAmount) return null;

    const technique = esferificaciones[selectedTechnique];
    const dosage = technique.dosages[selectedDosage];
    if (!dosage) return null;

    const amount = parseFloat(liquidAmount);
    const bathAmt = bathAmount ? parseFloat(bathAmount) : amount;

    if (isNaN(amount)) return null;

    // Extraer el valor principal del líquido base
    const mainValue = dosage.amount.match(/(\d+(?:\.\d+)?)/)?.[1];
    if (!mainValue) return null;

    const mainDosage = parseFloat(mainValue);
    const mainCalculated = (amount * mainDosage) / 1000;

    // Identificar el ingrediente principal del líquido base
    let mainIngredient = 'ingrediente';
    if (dosage.amount.toLowerCase().includes('alginato')) {
      mainIngredient = 'alginato de sodio';
    } else if (dosage.amount.toLowerCase().includes('gluconolactato')) {
      mainIngredient = 'gluconolactato de calcio';
    } else if (dosage.amount.toLowerCase().includes('agar')) {
      mainIngredient = 'agar agar';
    }

    // Procesar el baño si existe
    let bathCalculations = null;
    if (dosage.bathAmount && !isNaN(bathAmt)) {
      const alginatoValue = extractDosageValue(dosage.bathAmount, 'alginato');
      const xantanaValue = extractDosageValue(dosage.bathAmount, 'xantana');
      const calcioValue = extractDosageValue(dosage.bathAmount, 'cloruro de calcio') || 
                         extractDosageValue(dosage.bathAmount, 'calcio');

      bathCalculations = {
        alginato: alginatoValue ? ((bathAmt * alginatoValue) / 1000).toFixed(2) : null,
        xantana: xantanaValue ? ((bathAmt * xantanaValue) / 1000).toFixed(2) : null,
        calcio: calcioValue ? ((bathAmt * calcioValue) / 1000).toFixed(2) : null
      };
    }

    return {
      main: {
        amount: mainCalculated.toFixed(2),
        ingredient: mainIngredient,
        dosage: dosage.amount
      },
      bath: bathCalculations
    };
  };

  const calculations = calculateDosages();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900 transition-colors"
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
            Esferificar
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de técnica */}
          {!selectedTechnique && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(esferificaciones).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedTechnique(name)}
                  className="flex items-center gap-3 p-4 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 hover:border-teal-300 text-sm font-medium text-teal-900 cursor-pointer transition-all"
                >
                  <Droplet className="w-5 h-5 text-teal-600" />
                  <span className="text-left">{esferificaciones[name].name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Detalle de la técnica */}
          {selectedTechnique && selectedDosage === null && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-teal-700 hover:text-teal-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a técnicas
              </button>

              <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-lg border border-teal-200 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {esferificaciones[selectedTechnique].name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {esferificaciones[selectedTechnique].description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Ingredientes necesarios</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {esferificaciones[selectedTechnique].ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Características</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {esferificaciones[selectedTechnique].characteristics.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Aplicaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {esferificaciones[selectedTechnique].applications.map((app, idx) => (
                      <span key={idx} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Dosificaciones</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {esferificaciones[selectedTechnique].dosages.map((d, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedDosage(idx)}
                        className="text-left p-4 border-2 border-gray-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 bg-white cursor-pointer transition-all"
                      >
                        <p className="text-sm font-semibold text-gray-800 mb-1">{d.type}</p>
                        <p className="text-sm text-teal-700 font-medium">
                          {d.amount}
                        </p>
                        {d.bathAmount && (
                          <p className="text-xs text-gray-600 mt-1">
                            Baño: {d.bathAmount}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Instrucciones paso a paso</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                    {esferificaciones[selectedTechnique].instructions.map((step, idx) => (
                      <li key={idx} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Consejos útiles</h4>
                      <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        {esferificaciones[selectedTechnique].tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Calculadora de dosis */}
          {selectedTechnique && selectedDosage !== null && (
            <>
              <button onClick={resetToTechnique} className="flex items-center gap-1 text-sm text-teal-700 hover:text-teal-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a {esferificaciones[selectedTechnique].name}
              </button>

              <div className="bg-white border-2 border-teal-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="text-teal-500" size={20} />
                  Calculadora de dosis
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad de líquido base (ml)
                    </label>
                    <input
                      type="number"
                      value={liquidAmount}
                      onChange={(e) => setLiquidAmount(e.target.value)}
                      placeholder="500"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    />
                  </div>

                  {esferificaciones[selectedTechnique].dosages[selectedDosage].bathAmount && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cantidad de baño (ml)
                      </label>
                      <input
                        type="number"
                        value={bathAmount}
                        onChange={(e) => setBathAmount(e.target.value)}
                        placeholder="1000"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Típicamente 2-3x la cantidad del líquido base
                      </p>
                    </div>
                  )}
                </div>

                {calculations && (
                  <div className="space-y-4">
                    {/* Líquido base */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Droplet className="text-green-600" size={24} />
                        <span className="font-semibold text-green-800 text-lg">Líquido base</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-3xl font-bold text-green-700">
                            {calculations.main.amount} g
                          </div>
                          <div className="text-sm text-green-700 mt-1">
                            de <strong>{calculations.main.ingredient}</strong>
                          </div>
                        </div>
                        <div className="text-sm text-green-600 pt-2 border-t border-green-200">
                          Para <strong>{liquidAmount}ml</strong> de líquido base
                        </div>
                        <div className="text-xs text-green-600 bg-green-100 p-2 rounded mt-2">
                          Dosificación: {calculations.main.dosage}
                        </div>
                      </div>
                    </div>

                    {/* Baño de esferificación */}
                    {calculations.bath && (bathAmount || liquidAmount) && (
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Beaker className="text-blue-600" size={24} />
                          <span className="font-semibold text-blue-800 text-lg">Baño de esferificación</span>
                        </div>
                        <div className="space-y-3">
                          {calculations.bath.alginato && (
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-2xl font-bold text-blue-700">
                                {calculations.bath.alginato} g
                              </div>
                              <div className="text-sm text-blue-700">
                                de <strong>alginato de sodio</strong>
                              </div>
                            </div>
                          )}
                          
                          {calculations.bath.xantana && (
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-2xl font-bold text-blue-700">
                                {calculations.bath.xantana} g
                              </div>
                              <div className="text-sm text-blue-700">
                                de <strong>goma xantana</strong>
                              </div>
                            </div>
                          )}

                          {calculations.bath.calcio && (
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-2xl font-bold text-blue-700">
                                {calculations.bath.calcio} g
                              </div>
                              <div className="text-sm text-blue-700">
                                de <strong>cloruro de calcio</strong>
                              </div>
                            </div>
                          )}

                          <div className="text-sm text-blue-600 pt-2 border-t border-blue-200">
                            Para <strong>{bathAmount || liquidAmount}ml</strong> de baño
                          </div>
                          <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
                            Dosificación: {esferificaciones[selectedTechnique].dosages[selectedDosage].bathAmount}
                          </div>
                        </div>
                      </div>
                    )}
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

export default EsferificarModal;