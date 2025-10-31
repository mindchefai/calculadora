// src/components/AccessCodeModal.tsx
import { useState } from 'react';
import { X, Lock, Check, AlertCircle } from 'lucide-react';
import { verifyAccessCode } from '../services/EmailService';

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userEmail?: string;
}

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  userEmail 
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      if (verifyAccessCode(code)) {
        localStorage.setItem('mindchefAccess', 'true');
        if (userEmail) {
          localStorage.setItem('mindchefUserEmail', userEmail);
        }
        onSuccess();
      } else {
        setError('Código incorrecto. Por favor, verifica tu email.');
        setIsVerifying(false);
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && code.length === 4) {
      handleVerify();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center space-y-6">
          <div className="inline-block p-4 bg-gradient-to-br from-[#e5b45f] to-[#d4a04a] rounded-full">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#203c42] mb-2">
              Introduce tu código
            </h2>
            <p className="text-gray-600">
              {userEmail 
                ? `Hemos enviado un código a ${userEmail}` 
                : 'Introduce el código de acceso que recibiste por email'}
            </p>
          </div>

          <div>
            <input
              type="text"
              maxLength={4}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="0000"
              className="w-full px-6 py-4 text-center text-2xl font-bold tracking-widest border-2 border-gray-200 rounded-xl focus:border-[#e5b45f] focus:ring-4 focus:ring-[#e5b45f]/20 transition-all outline-none"
              autoFocus
            />
            
            {error && (
              <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={code.length !== 4 || isVerifying}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#e5b45f] to-[#d4a04a] text-white font-semibold hover:shadow-lg hover:shadow-[#e5b45f]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isVerifying ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Verificar código
              </>
            )}
          </button>

          <p className="text-xs text-gray-500">
            ¿No recibiste el email? Revisa tu carpeta de spam
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessCodeModal;