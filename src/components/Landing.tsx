// src/components/Landing.tsx
import { useState } from 'react';
import { Check, Loader2, Sparkles, KeyRound } from 'lucide-react';
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
  {
    id: 1,
    question: "¿Cuál es tu rol actual?",
    type: 'select',
    options: ['Jefe de cocina', 'Propietario de restaurante', 'Estudiante', 'Aficionado', 'Creador de contenido', 'Otro'],
    required: true
  },
  {
    id: 2,
    question: "Nombre del negocio",
    type: 'text',
    placeholder: 'Nombre de tu restaurante o negocio',
    required: false
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
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasAccess = localStorage.getItem('mindchefAccess') === 'true';

  // Manejar cambios en respuestas
  const handleAnswer = (questionId: number, value: string | string[]) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  // Validar todas las respuestas requeridas
  const isFormValid = () => {
    // Validar nombre (id 10)
    const nombre = answers[10];
    if (!nombre || (typeof nombre === 'string' && nombre.trim() === '')) return false;
    
    // Validar email (id 11)
    const email = answers[11];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) return false;
    
    // Validar rol (id 1)
    const rol = answers[1];
    if (!rol || (typeof rol === 'string' && rol.trim() === '')) return false;
    
    return true;
  };

  // Enviar formulario
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const nombre = answers[10] as string;
      const email = answers[11] as string;
      setUserEmail(email);

      const webhookURL = 'https://hook.eu2.make.com/5j28vyiv2xwkfx4c66l3xpv73gs9gbu8';
      
      const leadData = {
        "Nombre completo": answers[10] as string,
        "Email": answers[11] as string,
        "Rol": answers[1] as string,
        "Aspectos gestion": answers[2] as string || '',
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

  // Formulario unificado
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
          <div className="max-w-3xl mx-auto text-center space-y-4">
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
                MindChef
              </a>
            </div>
            <p className="text-gray-300 text-lg">
              Completa el formulario para acceder a la calculadora
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-3xl">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12">
              
              <div className="space-y-8">
                {QUESTIONS.map((question) => (
                  <div key={question.id} className="space-y-3">
                    <label className="block text-lg font-semibold text-[#203c42]">
                      {question.question}
                      {!question.required && (
                        <span className="text-sm text-gray-500 font-normal ml-2">(Opcional)</span>
                      )}
                    </label>

                    {question.type === 'text' && (
                      <div className="space-y-2">
                        <input
                          type={question.id === 11 ? 'email' : 'text'}
                          value={(answers[question.id] as string) || ''}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          placeholder={question.placeholder}
                          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-[#e5b45f] focus:ring-4 focus:ring-[#e5b45f]/20 transition-all outline-none"
                        />
                        {question.id === 11 && answers[11] && (
                          <div className="ml-2">
                            {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((answers[11] as string).trim()) && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <span>⚠️</span> Por favor, introduce un email válido
                              </p>
                            )}
                            <p className="text-sm text-[#e5b45f] flex items-center gap-1 mt-1">
                              <span>📧</span> Asegúrate de introducir un email real. Allí recibirás tu código de acceso.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {question.type === 'select' && (
                      <div className="space-y-3">
                        {question.options?.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAnswer(question.id, option)}
                            className={`w-full px-6 py-4 text-left rounded-2xl border-2 transition-all ${
                              answers[question.id] === option
                                ? 'border-[#e5b45f] bg-[#e5b45f]/10 text-[#203c42] font-medium shadow-lg'
                                : 'border-gray-200 hover:border-[#e5b45f]/50 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {answers[question.id] === option && (
                                <Check className="w-5 h-5 text-[#e5b45f]" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Botón de envío */}
              <div className="mt-10">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-[#2c413d] to-[#203c42] text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#2c413d]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Acceder a la calculadora
                      <Sparkles className="w-6 h-6" />
                    </>
                  )}
                </button>
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