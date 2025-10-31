import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Loader2, Sparkles } from 'lucide-react';
import Calculadora from './Calculadora';

// ====================================
// TIPOS Y CONFIGURACIÓN
// ====================================
interface Question {
  id: number;
  question: string;
  type: 'text' | 'select' | 'multiselect';
  options?: string[];
  placeholder?: string;
  required: boolean;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "¿Cuál es tu nombre?",
    type: 'text',
    placeholder: 'Tu nombre completo',
    required: true
  },
  {
    id: 2,
    question: "¿Cuál es tu email?",
    type: 'text',
    placeholder: 'tu@email.com',
    required: true
  },
  {
    id: 3,
    question: "¿Cuál es tu rol en la cocina?",
    type: 'select',
    options: ['Chef Profesional', 'Propietario de Restaurante', 'Estudiante de Cocina', 'Cocinero Aficionado', 'Food Blogger', 'Otro'],
    required: true
  },
  {
    id: 4,
    question: "¿Qué tipo de cocina te interesa más?",
    type: 'multiselect',
    options: ['Alta cocina', 'Cocina tradicional', 'Cocina fusión', 'Repostería', 'Cocina molecular', 'Cocina saludable'],
    required: false
  },
  {
    id: 5,
    question: "¿Cuánta experiencia tienes en cocina?",
    type: 'select',
    options: ['Menos de 1 año', '1-3 años', '3-5 años', '5-10 años', 'Más de 10 años'],
    required: true
  },
  {
    id: 6,
    question: "¿Qué técnicas culinarias te gustaría dominar?",
    type: 'multiselect',
    options: ['Sous vide', 'Fermentación', 'Ahumado', 'Confitado', 'Emulsiones', 'Esferificación'],
    required: false
  },
  {
    id: 7,
    question: "¿Trabajas actualmente en un restaurante?",
    type: 'select',
    options: ['Sí, como chef', 'Sí, como propietario', 'Sí, en otro rol', 'No, cocino en casa', 'No, pero planeo abrir uno'],
    required: true
  },
  {
    id: 8,
    question: "¿Qué ingredientes usas con más frecuencia?",
    type: 'multiselect',
    options: ['Carnes', 'Pescados y mariscos', 'Verduras', 'Legumbres', 'Lácteos', 'Cereales'],
    required: false
  },
  {
    id: 9,
    question: "¿Qué te motivó a buscar esta herramienta?",
    type: 'select',
    options: ['Mejorar mis técnicas', 'Optimizar tiempos de cocción', 'Aprender algo nuevo', 'Profesionalizar mi cocina', 'Curiosidad'],
    required: true
  },
  {
    id: 10,
    question: "¿Cómo conociste MindChef?",
    type: 'select',
    options: ['Redes sociales', 'Búsqueda en Google', 'Recomendación de un amigo', 'Blog o artículo', 'Otro'],
    required: false
  }
];

// ====================================
// COMPONENTE PRINCIPAL
// ====================================
const Landing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];

  // Verificar si el usuario ya tiene acceso
  const hasAccess = localStorage.getItem('mindchefAccess') === 'true';

  // Manejar cambios en respuestas
  const handleAnswer = (value: string | string[]) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  // Manejar selección múltiple
  const handleMultiSelect = (option: string) => {
    const current = (answers[currentQuestion.id] as string[]) || [];
    const newValue = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    handleAnswer(newValue);
  };

  // Validar respuesta actual
  const isCurrentAnswerValid = () => {
    const answer = answers[currentQuestion.id];
    if (!currentQuestion.required) return true;
    if (Array.isArray(answer)) return answer.length > 0;
    return answer && answer.trim() !== '';
  };

  // Navegar al siguiente paso
  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navegar al paso anterior
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Enviar formulario
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Preparar datos para Airtable
      const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
      const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
      const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Quiz_Leads';

      // Formatear respuestas
      const formattedAnswers: Record<string, string> = {};
      QUESTIONS.forEach(q => {
        const answer = answers[q.id];
        const key = `Q${q.id}_${q.question.substring(0, 30)}`;
        formattedAnswers[key] = Array.isArray(answer) ? answer.join(', ') : answer || '';
      });

      // Enviar a Airtable si hay configuración
      if (apiKey && baseId && tableName) {
        await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              Nombre: answers[1] as string,
              Email: answers[2] as string,
              ...formattedAnswers
            }
          })
        });
      }

      // Guardar acceso
      localStorage.setItem('mindchefAccess', 'true');
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
        setTimeout(() => {
          setShowCalculator(true);
        }, 1500);
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      alert('Hubo un error al enviar tus respuestas. Por favor intenta de nuevo.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mindchefAccess');
    setShowCalculator(false);
    setIsComplete(false);
    setCurrentStep(0);
    setAnswers({});
  };

  // Si ya tiene acceso, mostrar calculadora directamente
  if (hasAccess || showCalculator) {
    return <Calculadora onLogout={handleLogout} />;
  }

  // Pantalla de completado
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#203c42] via-[#2c413d] to-[#203c42] flex items-center justify-center p-4">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="inline-block p-6 bg-gradient-to-br from-[#e5b45f] to-[#d4a04a] rounded-full animate-bounce">
            <Check className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            ¡Perfecto!
          </h2>
          <p className="text-xl text-[#e5b45f]">
            Redirigiendo a tu calculadora...
          </p>
        </div>
      </div>
    );
  }

  // Formulario carrousel
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#203c42] via-[#2c413d] to-[#203c42] relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#e5b45f] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e5b45f] rounded-full blur-3xl"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="pt-8 pb-4 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img 
                src="/MindChef_white.png" 
                alt="MindChef Logo" 
                className="h-12 md:h-16 w-auto"
              />
              <a 
                href="https://www.mindchefai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-bold text-white hover:text-[#e5b45f] transition-colors"
              >
                MindChef <span className="text-[#e5b45f]"></span>
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Descubre tu camino hacia la excelencia culinaria
            </p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="px-4 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">
                Pregunta {currentStep + 1} de {QUESTIONS.length}
              </span>
              <span className="text-sm font-semibold text-[#e5b45f]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-[#e5b45f] to-[#d4a04a] rounded-full transition-all duration-500 ease-out shadow-lg shadow-[#e5b45f]/50"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card de pregunta */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-2xl">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-500 hover:shadow-[#e5b45f]/20">
              
              {/* Pregunta */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#203c42] mb-2">
                  {currentQuestion.question}
                </h2>
                {!currentQuestion.required && (
                  <p className="text-sm text-gray-500">(Opcional)</p>
                )}
              </div>

              {/* Input según tipo */}
              <div className="mb-8">
                {currentQuestion.type === 'text' && (
                  <input
                    type={currentQuestion.id === 2 ? 'email' : 'text'}
                    value={(answers[currentQuestion.id] as string) || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-[#e5b45f] focus:ring-4 focus:ring-[#e5b45f]/20 transition-all outline-none"
                  />
                )}

                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`w-full px-6 py-4 text-left rounded-2xl border-2 transition-all ${
                          answers[currentQuestion.id] === option
                            ? 'border-[#e5b45f] bg-[#e5b45f]/10 text-[#203c42] font-medium shadow-lg'
                            : 'border-gray-200 hover:border-[#e5b45f]/50 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {answers[currentQuestion.id] === option && (
                            <Check className="w-5 h-5 text-[#e5b45f]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'multiselect' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => {
                      const selected = ((answers[currentQuestion.id] as string[]) || []).includes(option);
                      return (
                        <button
                          key={option}
                          onClick={() => handleMultiSelect(option)}
                          className={`w-full px-6 py-4 text-left rounded-2xl border-2 transition-all ${
                            selected
                              ? 'border-[#e5b45f] bg-[#e5b45f]/10 text-[#203c42] font-medium shadow-lg'
                              : 'border-gray-200 hover:border-[#e5b45f]/50 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {selected && (
                              <Check className="w-5 h-5 text-[#e5b45f]" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Puedes seleccionar múltiples opciones
                    </p>
                  </div>
                )}
              </div>

              {/* Botones de navegación */}
              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-[#203c42] hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Atrás
                  </button>
                )}

                {currentStep < QUESTIONS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isCurrentAnswerValid()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#e5b45f] to-[#d4a04a] text-white font-semibold hover:shadow-lg hover:shadow-[#e5b45f]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isCurrentAnswerValid() || isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#2c413d] to-[#203c42] text-white font-semibold hover:shadow-lg hover:shadow-[#2c413d]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Acceder a la calculadora
                        <Sparkles className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 text-center">
          <p className="text-sm text-gray-400">
            Desarrollado por <span className="font-medium text-[#e5b45f]">MindChef</span>
          </p>
          

        </div>
      </div>
    </div>
  );
};

export default Landing;