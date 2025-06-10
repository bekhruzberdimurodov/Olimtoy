
import React from 'react';
import { BadgeCheck ,Users, Baby } from 'lucide-react';

interface OnboardingScreenProps {
  onSelectRole: (role: 'parent' | 'child') => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-guardian-gradient rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
            <BadgeCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Olimtoy platformasi
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Farzandingizni xavfsiz va samarali nazorat qiling
          </p>
        </div>

        <div className="space-y-4 animate-slide-up">
          <button
            onClick={() => onSelectRole('parent')}
            className="w-full glass-card rounded-2xl p-6 hover-lift group transition-all duration-300 hover:bg-primary-50"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-guardian-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Ota-ona uchun
                </h3>
                <p className="text-gray-600">
                  Farzandingizni kuzatish va nazorat qilish
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('child')}
            className="w-full glass-card rounded-2xl p-6 hover-lift group transition-all duration-300 hover:bg-green-50"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Farzand uchun
                </h3>
                <p className="text-gray-600">
                  Xavfsizlik uchun ulanish
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-gray-500">
            Xavfsiz va ishonchli nazorat tizimi
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
