
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface SMSVerificationProps {
  onBack: () => void;
  onSuccess: () => void;
  phoneNumber: string;
}

const SMSVerification: React.FC<SMSVerificationProps> = ({ onBack, onSuccess, phoneNumber }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (value: string) => {
    setCode(value);
    setError('');
    
    // Auto-submit when 6 digits are entered
    if (value.length === 6) {
      handleVerify(value);
    }
  };

  const handleVerify = async (verificationCode = code) => {
    if (verificationCode.length !== 6) return;

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (verificationCode === '123456') {
      onSuccess();
    } else {
      setError('Noto\'g\'ri kod kiritildi. Iltimos, qaytadan urinib ko\'ring.');
      setCode('');
    }

    setIsLoading(false);
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCode('');
    setError('');
    console.log('SMS qayta yuborildi');
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
          <h1 className="text-2xl font-bold text-gray-900">SMS tasdiqlash</h1>
        </div>

        <div className="glass-card rounded-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-guardian-gradient rounded-2xl flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Tasdiqlash kodini kiriting | Hozircha kod 123456
            </h2>
            <p className="text-gray-600">
              {phoneNumber} raqamiga yuborilgan 6 xonali kodni kiriting
            </p>
          </div>

          <div className="mb-6 flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              className="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            onClick={() => handleVerify()}
            disabled={code.length !== 6 || isLoading}
            className="w-full guardian-gradient text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mb-4"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Tasdiqlash
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>

          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-gray-500 text-sm">
                Qayta yuborish {timeLeft} soniyadan keyin mumkin
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
              >
                Kodni qayta yuborish
              </button>
            )}
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default SMSVerification;
