import { useState } from 'react';
import { 
  X, 
  Cuboid, 
  ChevronLeft,
  Calculator,
  AlertCircle
} from 'lucide-react';

interface GelificantesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Dosage {
  texture: string;
  amount: string;
}

interface IngredientInfo {
  origin: string;
  hydrationTemp: string;
  gelTemp: string;
  ph: string;
  characteristics: string[];
  applications: string[];
  dosages: Dosage[];
  maxDosage?: string;
  instructions: string[];
}

const gelificantes: Record<string, IngredientInfo> = {
  'Agar Agar': {
    origin: 'Algas rojas',
    hydrationTemp: '80°C',
    gelTemp: '35-40°C',
    ph: '7-8',
    characteristics: [
      'No se disuelve en grasa',
      'Tolera ácidos, alcoholes, sal y azúcar',
      'Gelifica en frío y caliente',
      'Previene sinéresis con 0,1-0,2% garrofín'
    ],
    applications: [
      'Espumas calientes',
      'Caviar duro',
      'Film',
      'Ganache',
      'Geles',
      'Gelatinas frías',
      'Gelatinas calientes',
      'Rellenos',
      'Salsas/puré'
    ],
    dosages: [
      { texture: 'Salsa', amount: '2g/L' },
      { texture: 'Geles blandos', amount: '+2g/L' },
      { texture: 'Geles medios', amount: '3-5g/L' },
      { texture: 'Geles duros', amount: '5-10g/L' }
    ],
    maxDosage: '30g/L',
    instructions: [
      'Mezclar todos los ingredientes en frío',
      'Calentar la mezcla hasta la ebullición',
      'Verter la mezcla en el molde deseado',
      'Mantener en nevera hasta que gelifique'
    ]
  },
  'Carragenato Kappa': {
    origin: 'Algas rojas (E-407)',
    hydrationTemp: '80°C durante 5 min',
    gelTemp: '30-60°C',
    ph: '4-10',
    characteristics: [
      'No aguanta congelación',
      'Se dispersa en frío',
      'Gelifica en presencia de calcio',
      'Geles transparentes'
    ],
    applications: [
      'Gelatinas en frío',
      'Espumas en frío',
      'Film/Velos',
      'Recubrimientos',
      'Espumas y emulsionantes'
    ],
    dosages: [
      { texture: 'Textura salsa', amount: '5g/L' },
      { texture: 'Crema espesa', amount: '5-6g/L' },
      { texture: 'Geles firmes', amount: '6-9g/L' },
      { texture: 'Geles duros', amount: '10g/L' }
    ],
    instructions: [
      'Mezclar ingredientes',
      'Llevar la mezcla a ebullición',
      'Disponer en moldes',
      'Dejar enfriar'
    ]
  },
  'Carragenato Iota': {
    origin: 'Algas rojas (E-407)',
    hydrationTemp: '80°C',
    gelTemp: '40-70°C',
    ph: '4-10',
    characteristics: [
      'Solamente gelificable en presencia de calcio',
      'Se puede congelar',
      'Geles fluidos',
      'Efecto suspensor'
    ],
    applications: [
      'Salsas',
      'Gelatinas frías',
      'Espumas y emulsiones',
      'Pudding, flan, cuajada, panacota'
    ],
    dosages: [
      { texture: 'Líquido suspensor', amount: '2g/L' },
      { texture: 'Crema espesa', amount: '3-6g/L' },
      { texture: 'Textura flan', amount: '6g/L' },
      { texture: 'Gel blando', amount: '6-10g/L' }
    ],
    instructions: [
      'Mezclar los ingredientes, utilizando túrmix',
      'Llevar la mezcla a la ebullición',
      'Disponer en los moldes',
      'Dejar enfriar'
    ]
  },
  'Alginato': {
    origin: 'Algas pardas (E-401)',
    hydrationTemp: 'Gelifica en frío',
    gelTemp: 'Actúa en presencia de calcio',
    ph: 'Precipita a pH inferior a 3,65',
    characteristics: [
      'Sin calcio actúa de espesante',
      'Esferificaciones inversas y directas',
      'Gelificante y espesante'
    ],
    applications: [
      'Film',
      'Esferas carbonatadas',
      'Esferificaciones'
    ],
    dosages: [
      { texture: 'Estabilizante helados', amount: '1-5g/L' },
      { texture: 'Baño alginato directo', amount: '6-7g/L' },
      { texture: 'Baño inverso', amount: '6-7g/L + 2g/L xantana' }
    ],
    instructions: [
      'Hacer el baño alginato y solución con calcio',
      'Mezclar con ayuda de túrmix',
      'Eliminar el aire con vacío',
      'Lavar el resultado en baño de agua'
    ]
  },
  'Pectina HM': {
    origin: 'Frutas y vegetales',
    hydrationTemp: '80°C durante 5 min',
    gelTemp: '40-85°C',
    ph: '2,8-3,4 + 50% de azúcar para gelificar',
    characteristics: [
      'No se disuelve en grasa',
      'Se disuelve en frío',
      'Necesita azúcar para gelificar'
    ],
    applications: [
      'Salsas y gelatinas',
      'Pâte de fruit',
      'Espumas y emulsiones',
      'Compotas',
      'Sorbetes',
      'Helados',
      'Mermeladas'
    ],
    dosages: [
      { texture: 'Sorbetes', amount: '6g/L' },
      { texture: 'Gel general', amount: '10-30g/L + 50% azúcar + 5-10g/L ácido cítrico' }
    ],
    maxDosage: '60g/L',
    instructions: [
      'Hervir el agua con el 25% de azúcar. Enfriar solución',
      'Añadir la pectina mezclada con el 25% de azúcar y el resto de ingredientes',
      'Triturar con túrmix. Llevar a ebullición. Hervir 5 min',
      'Pasar a un molde y dejar enfriar'
    ]
  },
  'Pectina LM': {
    origin: 'Frutas y vegetales con proceso químico',
    hydrationTemp: '80°C',
    gelTemp: 'Gelifica con iones de calcio',
    ph: '2,5-6,5',
    characteristics: [
      'No se disuelve en grasa',
      'Gelifica alcoholes a bajas concentraciones',
      'Su gelificación no depende del azúcar',
      'Disolver en frío'
    ],
    applications: [
      'Salsas/purés',
      'Gelatinas',
      'Pâte de fruit',
      'Espumas y emulsiones',
      'Láminas deshidratadas',
      'Sorbetes',
      'Helados',
      'Pegado de fruta'
    ],
    dosages: [
      { texture: 'Textura salsa espesa', amount: '10g/L' },
      { texture: 'Gelatina suave', amount: '10-20g/L' },
      { texture: 'Gelatina firme', amount: '20g/L' }
    ],
    instructions: [
      'Mezclar todos los ingredientes y triturar con túrmix',
      'Llevar la mezcla a la ebullición',
      'Pasar a un molde y dejar enfriar'
    ]
  },
  'Gelatina Animal': {
    origin: 'Colágeno animal',
    hydrationTemp: 'Hidratar con agua y hielo previamente',
    gelTemp: 'Se derrite a partir de 35°C',
    ph: '4-10',
    characteristics: [
      'Alcohol por debajo del 40%',
      'No llevar a la ebullición'
    ],
    applications: [
      'Salsas/purés',
      'Gelatinas frías',
      'Mousse',
      'Ganache/geles fluidos',
      'Espumas y emulsiones',
      'Nubes/helados/sorbetes'
    ],
    dosages: [
      { texture: 'Geles concentrados', amount: '6-8g/L' },
      { texture: 'Geles blandos', amount: '10g/L' },
      { texture: 'Geles medios', amount: '17-24g/L' },
      { texture: 'Geles duros', amount: '+24g/L' },
      { texture: 'Espumas', amount: '5-15g/L' }
    ],
    instructions: [
      'Llevar parte del líquido a ebullición',
      'Apartar el líquido del fuego',
      'Añadir la gelatina en polvo o las hojas hidratadas',
      'Pasar a un molde y dejar enfriar'
    ]
  }
};

const GelificantesModal: React.FC<GelificantesModalProps> = ({ isOpen, onClose }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const [liquidAmount, setLiquidAmount] = useState<string>('');
  const [customDosageValue, setCustomDosageValue] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setSelectedIngredient(null);
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
    if (!selectedIngredient || !selectedTexture || !liquidAmount) return null;

    const ingredient = gelificantes[selectedIngredient];
    const dosage = ingredient.dosages.find(d => d.texture.toLowerCase() === selectedTexture.toLowerCase());
    if (!dosage) return null;

    const amount = parseFloat(liquidAmount);
    const valueToUse = customDosageValue ? parseFloat(customDosageValue) : parseFloat(dosage.amount);

    if (isNaN(valueToUse) || isNaN(amount)) return null;

    const calculated = (amount * valueToUse) / 1000;

    return {
      amount: calculated.toFixed(2),
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
                className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 transition-colors"
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
            Gelificar
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selección de ingrediente */}
          {!selectedIngredient && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(gelificantes).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedIngredient(name)}
                  className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 text-sm font-medium text-amber-900 cursor-pointer transition-all"
                >
                  <Cuboid className="w-5 h-5 text-amber-600" />
                  {name}
                </button>
              ))}
            </div>
          )}

          {/* Detalle del ingrediente */}
          {selectedIngredient && !selectedTexture && (
            <>
              <button onClick={resetAll} className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a ingredientes
              </button>

              <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-lg border border-amber-200 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{selectedIngredient}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Origen</h4>
                    <p className="text-sm text-gray-600">{gelificantes[selectedIngredient].origin}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">pH</h4>
                    <p className="text-sm text-gray-600">{gelificantes[selectedIngredient].ph}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Hidratación:</strong> {gelificantes[selectedIngredient].hydrationTemp} |{' '}
                  <strong>Gelificación:</strong> {gelificantes[selectedIngredient].gelTemp}
                </p>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Características</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {gelificantes[selectedIngredient].characteristics.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Aplicaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {gelificantes[selectedIngredient].applications.map((app, idx) => (
                      <span key={idx} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Dosificaciones</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {gelificantes[selectedIngredient].dosages.map((d, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTexture(d.texture)}
                        className="text-left p-4 border-2 border-gray-200 rounded-lg hover:bg-amber-50 hover:border-amber-300 bg-white cursor-pointer transition-all"
                      >
                        <p className="text-sm font-semibold text-gray-800">{d.texture}</p>
                        <p className="text-sm text-amber-700 font-medium">{d.amount}</p>
                      </button>
                    ))}
                  </div>

                  {gelificantes[selectedIngredient].maxDosage && (
                    <div className="text-xs text-red-600 mt-3 bg-red-50 p-2 rounded">
                      <strong>⚠️ Dosificación máxima:</strong> {gelificantes[selectedIngredient].maxDosage}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Instrucciones</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                    {gelificantes[selectedIngredient].instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}

          {/* Calculadora de dosis */}
          {selectedIngredient && selectedTexture && (
            <>
              <button onClick={resetToIngredient} className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Volver a texturas de {selectedIngredient}
              </button>

              <div className="bg-white border-2 border-amber-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="text-amber-500" size={20} />
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
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
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
                  const dosage = gelificantes[selectedIngredient!].dosages.find(d => d.texture === selectedTexture);
                  const range = dosage ? getDosageRange(dosage.amount) : null;

                  if (range && range[0] !== range[1]) {
                    const [min, max] = range;
                    return (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selecciona dosis en g/L: <strong className="text-amber-600">{customDosageValue ?? min}</strong>
                        </label>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          step="0.1"
                          value={customDosageValue ?? min}
                          onChange={(e) => setCustomDosageValue(e.target.value)}
                          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
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
                      de <strong>{selectedIngredient}</strong>
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

export default GelificantesModal;