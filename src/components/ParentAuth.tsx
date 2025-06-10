
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';

interface ParentAuthProps {
  onBack: () => void;
  onSuccess: (name: string, phone: string) => void;
}

const ParentAuth: React.FC<ParentAuthProps> = ({ onBack, onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phoneNumber: string): boolean => {
    // Remove all spaces and special characters except +
    const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
    
    // Check if starts with +998
    if (!cleanPhone.startsWith('+998')) {
      setPhoneError('Telefon raqam +998 bilan boshlanishi kerak');
      return false;
    }

    // Extract the part after +998
    const afterCode = cleanPhone.substring(4);
    
    // Check if it's exactly 9 digits
    if (afterCode.length !== 9) {
      setPhoneError('Telefon raqam 9 ta raqamdan iborat bo\'lishi kerak');
      return false;
    }

    // Check if starts with valid operator codes
    const validOperators = ['91', '90', '87', '88', '97', '33', '77'];
    const operatorCode = afterCode.substring(0, 2);
    
    if (!validOperators.includes(operatorCode)) {
      setPhoneError('Noto\'g\'ri operator kodi. 91, 90, 87, 88, 97, 33, 77 dan biri bo\'lishi kerak');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    
    if (value.length > 0) {
      validatePhone(value);
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    if (!validatePhone(phone)) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSuccess(name.trim(), phone.trim());
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8 animate-fade-in">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/80 hover:bg-white transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Ota-ona ro'yxati</h1>
        </div>

        <div className="glass-card rounded-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-guardian-gradient rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ma'lumotlaringizni kiriting
            </h2>
            <p className="text-gray-600">
              Xavfsiz ulanish uchun ism va telefon raqamingizni qoldiring
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                To'liq ismingiz
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white/50"
                placeholder="Ismingizni kiriting"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon raqami
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white/50 ${
                  phoneError ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="+998 xx xxx xx xx"
                required
              />
              {phoneError && (
                <p className="text-red-600 text-sm mt-2">{phoneError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !phone.trim() || phoneError !== '' || isLoading}
              className="w-full guardian-gradient text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Keyingi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Ma'lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentAuth;
