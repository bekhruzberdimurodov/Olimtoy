
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, UserPlus } from 'lucide-react';

interface ParentChildSetupProps {
  onBack: () => void;
  onComplete: (childName: string, childKey: string) => void;
}

const ParentChildSetup: React.FC<ParentChildSetupProps> = ({ onBack, onComplete }) => {
  const [childName, setChildName] = useState('');
  const [childKey, setChildKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim() || !childKey.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onComplete(childName.trim(), childKey.trim());
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
          <h1 className="text-2xl font-bold text-gray-900">Farzand qo'shish</h1>
        </div>

        <div className="glass-card rounded-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-guardian-gradient rounded-2xl flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Birinchi farzandingizni qo'shing
            </h2>
            <p className="text-gray-600">
              Farzand ismi va ulanish kalitini kiriting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-2">
                Farzand ismi
              </label>
              <input
                type="text"
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white/50"
                placeholder="Farzand ismini kiriting"
                required
              />
            </div>

            <div>
              <label htmlFor="childKey" className="block text-sm font-medium text-gray-700 mb-2">
                Ulanish kaliti
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="childKey"
                  value={childKey}
                  onChange={(e) => setChildKey(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white/50 text-center font-mono tracking-widest"
                  placeholder="XXXXXX"
                  maxLength={6}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Farzand qurilmasida bu kalitni kiritish kerak bo'ladi
              </p>
            </div>

            <button
              type="submit"
              disabled={!childName.trim() || !childKey.trim() || isLoading}
              className="w-full guardian-gradient text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Farzand qo'shish
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParentChildSetup;
