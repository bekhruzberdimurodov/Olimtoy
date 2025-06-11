
import React, { useState } from 'react';
import { Crown, Check, X, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const ProUpgradeModal: React.FC<ProUpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const [step, setStep] = useState<'info' | 'code'>('info');
  const [proCode, setProCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { activateProWithCode } = useAuth();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleContactTelegram = () => {
    setStep('code');
  };

  const handleActivateCode = async () => {
    if (!proCode.trim()) {
      toast({
        title: "Xatolik",
        description: "Iltimos, Pro kodini kiriting",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await activateProWithCode(proCode);
      toast({
        title: "Muvaffaqiyat!",
        description: "Pro obuna muvaffaqiyatli faollashtirildi!",
      });
      onUpgrade();
      onClose();
      setStep('info');
      setProCode('');
      // Force a small delay to ensure state is updated
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      toast({
        title: "Xatolik",
        description: error instanceof Error ? error.message : "Kod noto'g'ri",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    setStep('info');
    setProCode('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Olimtoy Pro</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {step === 'info' ? (
          <>
            <div className="mb-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">10,000 so'm</div>
                  <div className="text-sm text-gray-600">oylik obuna</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">10 tagacha farzand qo'shish</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Mikrofon boshqaruvi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Barcha premium xususiyatlar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">7 kun bepul sinov muddati</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 mb-4">
                <p className="text-sm text-blue-800 text-center">
                  Pro obuna uchun <strong>@berdimurodovuz</strong> bilan Telegram orqali bog'laning. 
                  To'lovni amalga oshirgach sizga maxsus kod beriladi. Ushbu kodni quyida kiriting.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Keyinroq
              </button>
              <button
                onClick={handleContactTelegram}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kod kiriting</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Pro kodini kiriting</h4>
              <p className="text-sm text-gray-600 mb-4">
                Telegram orqali olingan Pro kodini quyida kiriting:
              </p>

              <input
                type="text"
                value={proCode}
                onChange={(e) => setProCode(e.target.value)}
                placeholder="Pro kodini kiriting"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors mb-4"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Orqaga
              </button>
              <button
                onClick={handleActivateCode}
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? 'Faollashtirilmoqda...' : 'Faollashtirish'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProUpgradeModal;
