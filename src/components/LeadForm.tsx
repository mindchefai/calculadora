import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface LeadFormProps {
  onSuccess: () => void;
}

interface FormData {
  nombre: string;
  email: string;
  rol: string;
}

const LeadForm = ({ onSuccess }: LeadFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    rol: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setErrorMessage('Por favor, introduce tu nombre');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Por favor, introduce un email válido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
      const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
      const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

      if (!apiKey || !baseId || !tableName) {
        throw new Error('Faltan variables de entorno de Airtable');
      }

      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableName}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              Nombre: formData.nombre,
              Email: formData.email,
              Rol: formData.rol || 'No especificado'
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      localStorage.setItem('mindchefAccess', 'true');
      setStatus('success');
      
      setTimeout(() => {
        onSuccess();
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-2">
            Rol (opcional)
          </label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecciona tu rol</option>
            <option value="Chef">Chef</option>
            <option value="Restaurante">Restaurante</option>
            <option value="Aficionado">Aficionado</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
          {status === 'loading' ? 'Enviando...' : 'Acceder gratis a la calculadora'}
        </button>

        {status === 'success' && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded-xl">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">¡Gracias! Redirigiendo a la calculadora...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-2 text-red-700 bg-red-50 p-4 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Al enviar tus datos aceptas nuestra política de privacidad. 
          <br />
          Tus datos están seguros. Solo te enviaremos información útil sobre MindChef.
        </p>
      </div>
    </div>
  );
};

export default LeadForm;