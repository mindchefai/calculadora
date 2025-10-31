import { useState, useEffect } from 'react';
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
  ChevronLeft,
  Loader2
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

const categoryIcons: Record<string, JSX.Element> = {
  bovino: <Heart className="w-5 h-5 text-red-600" />,
  ternera: <Heart className="w-5 h-5 text-pink-600" />,
  cerdo: <Heart className="w-5 h-5 text-rose-600" />,
  ovino: <Heart className="w-5 h-5 text-orange-600" />,
  cordero: <Heart className="w-5 h-5 text-amber-600" />,
  aves: <Feather className="w-5 h-5 text-yellow-600" />,
  pescados: <Fish className="w-5 h-5 text-blue-600" />,
  cefalopodos: <Shell className="w-5 h-5 text-purple-600" />,
  moluscos: <Shell className="w-5 h-5 text-indigo-600" />,
  crustaceos: <Shell className="w-5 h-5 text-cyan-600" />,
  verduras: <Salad className="w-5 h-5 text-green-600" />,
  fruta: <Apple className="w-5 h-5 text-lime-600" />,
  huevos: <Egg className="w-5 h-5 text-yellow-500" />,
  'legumbres y cereales': <Wheat className="w-5 h-5 text-amber-700" />,
  legumbres: <Wheat className="w-5 h-5 text-amber-700" />,
  cereales: <Wheat className="w-5 h-5 text-yellow-700" />
};

const SousVideModal: React.FC<SousVideModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
  const [sousVideData, setSousVideData] = useState<SousVideItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/sous_vide.json');
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo sous_vide.json');
        }
        
        const jsonData = await response.json();
        setSousVideData(jsonData.sousvide_cooking_data || []);
        setError(null);
      } catch (err) {
        console.error('Error cargando datos sous vide:', err);
        setError('Error al cargar los datos. Por favor, recarga la página.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categorias = Array.from(new Set(sousVideData.map(item => item.categoria)));

  const productosAgrupadosPorNombre = (cat: string) =>
    Array.from(new Set(sousVideData.filter(i => i.categoria === cat).map(p => p.producto)));

  const variantesPorNombre = (producto: string) =>
    sousVideData.filter(i => i.producto === producto && i.categoria === selectedCategory);

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
          
          {/* Estado de carga */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
              <p className="text-gray-600">Cargando datos...</p>
            </div>
          )}

          {/* Estado de error */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Vista de categorías */}
          {!isLoading && !error && !selectedCategory && (
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
          {!isLoading && !error && selectedCategory && !selectedProductName && (
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
          {!isLoading && !error && selectedProductName && (
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