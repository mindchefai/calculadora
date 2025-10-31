// src/components/SousVideModal.tsx

import { useState } from 'react';
import { 
  X, 
  Thermometer, 
  Clock, 
  Heart, 
  Feather, 
  Fish, 
  Shell, 
  Salad,
  Apple, 
  Egg, 
  Wheat,
  ChevronLeft
} from 'lucide-react';

interface SousVideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SousVideItem {
  id: number;
  categoria: string;
  producto: string;
  medida: string | null;
  temperatura_coccion: number | null;
  temperatura_corazon: number | null;
  tiempo_coccion: string | null;
  observaciones: string | null;
}

// Datos de ejemplo - reemplaza con tu JSON real
const SOUS_VIDE_DATA: SousVideItem[] = [
  {
    id: 1,
    categoria: "aves",
    producto: "Pechuga de pollo",
    medida: "150-200g",
    temperatura_coccion: 65,
    temperatura_corazon: 63,
    tiempo_coccion: "1-2 horas",
    observaciones: "Jugosa y tierna"
  },
  {
    id: 2,
    categoria: "pescados",
    producto: "Salmón",
    medida: "180g",
    temperatura_coccion: 50,
    temperatura_corazon: 48,
    tiempo_coccion: "30-45 min",
    observaciones: "Textura mantecosa"
  },
  {
    id: 3,
    categoria: "verduras",
    producto: "Espárragos",
    medida: null,
    temperatura_coccion: 85,
    temperatura_corazon: null,
    tiempo_coccion: "15-20 min",
    observaciones: "Crujientes al dente"
  }
];

const fallbackIcon = (label: string) => (
  <div className="w-5 h-5 rounded-full bg-cyan-100 text-[10px] font-bold text-cyan-800 flex items-center justify-center uppercase">
    {label.slice(0, 2)}
  </div>
);

const categoryIcons: Record<string, JSX.Element> = {
  bovino: fallbackIcon("BO"),
  ternera: fallbackIcon("TE"),
  cerdo: fallbackIcon("CE"),
  ovino: fallbackIcon("OV"),
  cordero: fallbackIcon("CO"),
  aves: <Feather className="w-5 h-5 text-cyan-600" />,
  pescados: <Fish className="w-5 h-5 text-cyan-600" />,
  cefalopodos: <Shell className="w-5 h-5 text-cyan-600" />,
  moluscos: <Shell className="w-5 h-5 text-cyan-600" />,
  verduras: <Salad className="w-5 h-5 text-cyan-600" />,
  fruta: <Apple className="w-5 h-5 text-cyan-600" />,
  huevos: <Egg className="w-5 h-5 text-cyan-600" />,
  'legumbres y cereales': <Wheat className="w-5 h-5 text-cyan-600" />
};

const SousVideModal: React.FC<SousVideModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null);

  if (!isOpen) return null;

  const categorias = Array.from(new Set(SOUS_VIDE_DATA.map(item => item.categoria)));

  const productosAgrupadosPorNombre = (cat: string) =>
    Array.from(new Set(SOUS_VIDE_DATA.filter(i => i.categoria === cat).map(p => p.producto)));

  const variantesPorNombre = (producto: string) =>
    SOUS_VIDE_DATA.filter(i => i.producto === producto && i.categoria === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-cyan-700 hover:text-cyan-900 transition-colors"
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
            Cocinar a baja temperatura (Sous Vide)
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Vista de categorías */}
          {!selectedCategory && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categorias.map((cat, idx) => {
                const formatted = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className="flex items-center gap-2 p-4 bg-cyan-50 border border-cyan-200 rounded-lg hover:bg-cyan-100 hover:border-cyan-300 text-sm font-medium text-cyan-900 cursor-pointer transition-all"
                  >
                    {categoryIcons[cat.toLowerCase()] ?? '🍽️'}
                    {formatted}
                  </button>
                );
              })}
            </div>
          )}

          {/* Vista de productos */}
          {selectedCategory && !selectedProductName && (
            <>
              <button 
                onClick={() => setSelectedCategory(null)} 
                className="flex items-center gap-1 text-sm text-cyan-700 hover:text-cyan-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Volver a categorías
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productosAgrupadosPorNombre(selectedCategory).map((productName, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedProductName(productName)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-cyan-300 text-left cursor-pointer transition-all"
                  >
                    <h3 className="text-md font-semibold text-gray-800">{productName}</h3>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Vista de detalles del producto */}
          {selectedProductName && (
            <>
              <button
                onClick={() => setSelectedProductName(null)}
                className="flex items-center gap-1 text-sm text-cyan-700 hover:text-cyan-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Volver a productos de {selectedCategory}
              </button>

              <div className="space-y-6">
                {variantesPorNombre(selectedProductName).map(variant => (
                  <div
                    key={variant.id}
                    className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-lg border border-cyan-200 space-y-4 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {variant.producto}
                      {variant.medida && (
                        <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold ml-2 px-2 py-1 rounded-full">
                          {variant.medida}
                        </span>
                      )}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {variant.tiempo_coccion && (
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                            <Clock className="w-4 h-4 text-cyan-600" />
                            Tiempo de cocción:
                          </p>
                          <p className="text-lg font-semibold text-gray-800">{variant.tiempo_coccion}</p>
                        </div>
                      )}

                      {typeof variant.temperatura_coccion === 'number' && (
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                            <Thermometer className="w-4 h-4 text-cyan-600" />
                            Temperatura de cocción:
                          </p>
                          <div className="h-6 w-full bg-cyan-100 rounded-full relative overflow-hidden mt-1">
                            <div
                              className="absolute left-0 top-0 h-full bg-cyan-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(variant.temperatura_coccion, 100)}%` }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-800 z-10">
                                {variant.temperatura_coccion}°C
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {variant.temperatura_corazon && (
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                            <Heart className="w-4 h-4 text-cyan-600" />
                            Temperatura al corazón:
                          </p>
                          <p className="text-lg font-semibold text-gray-800">{variant.temperatura_corazon}°C</p>
                        </div>
                      )}
                    </div>

                    {variant.observaciones && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Observaciones:</p>
                        <p className="text-sm text-gray-700">{variant.observaciones}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SousVideModal;