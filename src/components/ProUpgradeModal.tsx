
import React from 'react';
import { Crown, Check, X } from 'lucide-react';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const ProUpgradeModal: React.FC<ProUpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  const handleUpgrade = async () => {
    // Simulate payment process
    console.log('To\'lov jarayoni boshlandi...');
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('To\'lov muvaffaqiyatli amalga oshirildi!');
    onUpgrade();
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

        <div className="mb-6">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">1,000,000$</div>
              <div className="text-sm text-gray-600">bir martalik to'lov</div>
            </div>
          </div>

          <div className="space-y-3">
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
            onClick={handleUpgrade}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Sotib olish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProUpgradeModal;
