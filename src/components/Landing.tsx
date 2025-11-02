// src/components/Landing.tsx
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Loader2, Sparkles, KeyRound } from 'lucide-react';
import Calculadora from './Calculadora';
import AccessCodeModal from './AccessCodeModal';
import Confetti from './Confetti';
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
    question: "¿Cuál es tu rol actual?",
    type: 'select',
    options: ['Jefe de cocina', 'Propietario de restaurante', 'Estudiante', 'Aficionado', 'Creador de contenido', 'Otro'],
    required: true
  },
  {
    id: 2,
    question: "¿Qué aspectos de la gestión del restaurante te han resultado más difíciles o estresantes?",
    type: 'multiselect',
    options: ['Personal', 'Escandallos', 'Control de costes', 'Inventario', 'Proveedores', 'Planificación de menús'],
    required: true
  },
  {
    id: 3,
    question: "Si piensas en tus tareas del día a día, ¿cuáles te llevan más tiempo?",
    type: 'multiselect',
    options: ['Compras', 'Control de inventario', 'Atención al cliente', 'Cocinar (producción y servicio)', 'Administración (facturas, albaranes)', 'Diseño de cartas y propuesta gastronómica'],
    required: true
  },
  {
    id: 4,
    question: "Aproximadamente, ¿cuántas horas trabajas a la semana?",
    type: 'select',
    options: ['30-40h', '40-50h', '50-60h', 'Más de 60h'],
    required: true
  },
  {
    id: 5,
    question: "¿Con qué frecuencia revisas o recalculas los costes de los platos o menús?",
    type: 'select',
    options: ['Semanalmente', 'Mensualmente', 'Cada pocos meses', 'Anualmente', 'Nunca o casi nunca'],
    required: true
  },
  {
    id: 6,
    question: "¿Dirías que conoces con precisión el margen de beneficio de tus platos actuales?",
    type: 'select',
    options: ['Sí, los tengo controlados', 'Tengo una idea general, pero no exacta', 'No lo sé con certeza'],
    required: true
  },
  {
    id: 7,
    question: "¿Dónde sueles guardar la información sobre las recetas y sus ingredientes (gramajes, escandallos, etc.)?",
    type: 'multiselect',
    options: ['Papel (libretas, fichas)', 'Hojas de cálculo (Excel o Google Sheets)', 'Software de gestión', 'Lo tengo en la memoria'],
    required: true
  },
  {
    id: 8,
    question: "¿Qué te resulta más complicado a la hora de hacer el seguimiento de los costes de tus platos o del menú?",
    type: 'multiselect',
    options: ['Actualizar precios', 'Subir albaranes', 'Encontrar tiempo para hacerlo', 'No es complicado'],
    required: true
  },
  {
    id: 9,
    question: "¿Cuál es el ticket medio aproximado por persona en tu negocio?",
    type: 'select',
    options: ['15-25€', '25-35€', '35-50€', '50-75€', '75-100€', 'Más de 100€'],
    required: true
  },
  {
    id: 10,
    question: "Nombre y apellidos",
    type: 'text',
    placeholder: 'Tu nombre completo',
    required: true
  },
{
  id: 11,
  question: "Dirección de email (te enviaremos aquí el código de acceso)",
  type: 'text',
  placeholder: 'Introduce un email válido para recibir el código',
  required: true
},
];

const ACCESS_CODE = '0610';

// ====================================
// FUNCIÓN PARA ENVIAR EMAIL
// ====================================
const sendAccessCodeEmail = async (nombre: string, email: string): Promise<boolean> => {
  try {
    const serviceId = "service_d08335y";
    const templateId = "template_sqr99cg";
    const publicKey = "Jy0CvGCqn1XBxXu6X";

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: email,
          to_name: nombre,
          access_code: ACCESS_CODE
        }
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error enviando email:', error);
    return false;
  }
};

// ====================================
// COMPONENTE PRINCIPAL
// ====================================
const Landing = () => {
  const [viewMode, setViewMode] = useState<'initial' | 'quiz' | 'complete'>('initial');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];
  const hasAccess = localStorage.getItem('mindchefAccess') === 'true';

  // Manejar cambios en respuestas
 // Manejar cambios en respuestas
const handleAnswer = (value: string | string[]) => {
  setAnswers({
    ...answers,
    [currentQuestion.id]: value
  });
  
  // Auto-avanzar si es selección única y hay más preguntas
  if (currentQuestion.type === 'select' && currentStep < QUESTIONS.length - 1) {
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 300); // Pequeño delay para que vean el check
  }
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
  
  // 👉 Validación específica para email (ID 11)
  if (currentQuestion.id === 11) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return answer && typeof answer === 'string' && emailRegex.test(answer.trim());
  }
  
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
    const nombre = answers[10] as string;
    const email = answers[11] as string;
    setUserEmail(email);

    const webhookURL = 'https://hook.eu2.make.com/fiuleawp6xk3qcavynmepytctywbmdyg';
    
    const leadData = {
      "Nombre completo": answers[10] as string,
      "Email": answers[11] as string,
      "Rol": answers[1] as string,
      "Aspectos gestion": Array.isArray(answers[2]) ? answers[2].join(', ') : '',
      "Time consuming": Array.isArray(answers[3]) ? answers[3].join(', ') : '',
      "Horas semanales": answers[4] as string,
      "Frecuencia revision": answers[5] as string,
      "Margen controlado": answers[6] as string,
      "Ubicacion recetas": Array.isArray(answers[7]) ? answers[7].join(', ') : '',
      "Tareas complicadas": Array.isArray(answers[8]) ? answers[8].join(', ') : '',
      "Ticket medio": answers[9] as string,
    };

    // 🔍 DEBUG: Ver qué enviamos
    console.log('📤 URL:', webhookURL);
    console.log('📦 Datos:', leadData);

    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData)
    });

    // 🔍 DEBUG: Ver la respuesta
    console.log('📥 Status:', response.status);
    console.log('📥 OK?:', response.ok);
    const responseText = await response.text();
    console.log('📥 Respuesta completa:', responseText);

    if (!response.ok) {
      throw new Error('Error al guardar los datos');
    }

    // Enviar email con código de acceso
    const emailSent = await sendAccessCodeEmail(nombre, email);
    
    if (!emailSent) {
      console.warn('No se pudo enviar el email, pero el usuario puede continuar');
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setViewMode('complete');
      setShowConfetti(true);
      setTimeout(() => {
        setShowAccessModal(true);
      }, 1500);
    }, 1500);

  } catch (error) {
    console.error('Error:', error);
    setIsSubmitting(false);
    alert('Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.');
  }
};

  const handleLogout = () => {
    localStorage.removeItem('mindchefAccess');
    localStorage.removeItem('mindchefUserEmail');
    setShowCalculator(false);
    setViewMode('initial');
    setCurrentStep(0);
    setAnswers({});
  };

  const handleAccessSuccess = () => {
    setShowAccessModal(false);
    setShowCalculator(true);
  };

  // Si ya tiene acceso, mostrar calculadora
  if (hasAccess || showCalculator) {
    return <Calculadora onLogout={handleLogout} />;
  }

  // Pantalla inicial
  if (viewMode === 'initial') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#203c42] via-[#2c413d] to-[#203c42] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#e5b45f] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e5b45f] rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-8 max-w-3xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img 
                  src="/MindChef_white.png" 
                  alt="MindChef Logo" 
                  className="h-20 md:h-24 w-auto"
                />
                  <a 
                    href="https://www.mindchefai.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl md:text-5xl font-bold text-white hover:text-[#e5b45f] transition-colors"
                  >
                    MindChef <span className="text-[#e5b45f]"></span>
                  </a>
              </div>

              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                Descubre tu camino hacia la excelencia culinaria
              </p>

              <p className="text-gray-300 text-lg">
                Accede a nuestra calculadora de técnicas culinarias profesionales
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <button
                  onClick={() => setViewMode('quiz')}
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#e5b45f] to-[#d4a04a] text-white font-semibold text-lg hover:shadow-2xl hover:shadow-[#e5b45f]/40 transition-all transform hover:scale-105"
                >
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Comenzar ahora
                </button>

                <button
                  onClick={() => setShowAccessModal(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-semibold text-lg hover:bg-white/20 hover:border-white/40 transition-all"
                >
                  <KeyRound className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Ya tengo acceso
                </button>
              </div>
            </div>

            <div className="absolute bottom-8 text-center">
              <p className="text-sm text-gray-400">
                Desarrollado por <span className="font-medium text-[#e5b45f]">MindChef</span>
              </p>
            </div>
          </div>
        </div>

        <AccessCodeModal 
          isOpen={showAccessModal}
          onClose={() => setShowAccessModal(false)}
          onSuccess={handleAccessSuccess}
        />
      </>
    );
  }

  // Pantalla de completado
if (viewMode === 'complete') {
  return (
    <>
      {showConfetti && <Confetti duration={4000} />}
      <div className="min-h-screen bg-gradient-to-br from-[#203c42] via-[#2c413d] to-[#203c42] flex items-center justify-center p-4">
          <div className="text-center space-y-6 animate-fadeIn">
            <div className="inline-block p-6 bg-gradient-to-br from-[#e5b45f] to-[#d4a04a] rounded-full animate-bounce">
              <Check className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              ¡Perfecto!
            </h2>
            <p className="text-xl text-[#e5b45f]">
              Revisa tu email para obtener el código de acceso
            </p>
            <p className="text-gray-300 text-sm">
              Te hemos enviado un email a <strong>{userEmail}</strong>
            </p>
            <p className="text-gray-400 text-xs mt-4">
              (Revisa también tu carpeta de spam)
            </p>
          </div>
        </div>

        <AccessCodeModal 
          isOpen={showAccessModal}
          onClose={() => setShowAccessModal(false)}
          onSuccess={handleAccessSuccess}
          userEmail={userEmail}
        />
      </>
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
  <div className="space-y-2">
    <input
      type={currentQuestion.id === 11 ? 'email' : 'text'}
      value={(answers[currentQuestion.id] as string) || ''}
      onChange={(e) => handleAnswer(e.target.value)}
      placeholder={currentQuestion.placeholder}
      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-[#e5b45f] focus:ring-4 focus:ring-[#e5b45f]/20 transition-all outline-none"
    />
    {currentQuestion.id === 11 && (
      <div className="ml-2 space-y-1">
        {answers[currentQuestion.id] && !isCurrentAnswerValid() && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span>⚠️</span> Por favor, introduce un email válido
          </p>
        )}
        <p className="text-sm text-[#e5b45f] flex items-center gap-1">
          <span>📧</span> Asegúrate de introducir un email real. Allí recibirás tu código de acceso.
        </p>
      </div>
    )}
  </div>
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