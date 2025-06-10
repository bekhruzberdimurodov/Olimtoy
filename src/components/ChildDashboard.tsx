
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  Sun, 
  Star, 
  ArrowLeft,
  Battery,
  Wifi
} from 'lucide-react';

interface ChildDashboardProps {
  childKey: string;
  onBack: () => void;
}

const ChildDashboard: React.FC<ChildDashboardProps> = ({ childKey, onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [battery, setBattery] = useState(85);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const motivationalMessages = [
    "Bugun ajoyib kun! 😊",
    "Siz juda yaxshi farzandsiz! ⭐",
    "Ota-onangiz sizni sevadi! ❤️",
    "Har doim xavfsizlikda bo'ling! 🛡️",
    "Bugun nimalar o'rganasiz? 📚"
  ];

  const [currentMessage] = useState(
    motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Wifi className="w-4 h-4 text-green-500" />
              <Battery className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">{battery}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Time Display */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {currentTime.toLocaleTimeString('uz-UZ', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="text-lg text-gray-600">
            {currentTime.toLocaleDateString('uz-UZ', { 
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </div>
        </div>

        {/* Connection Status */}
        <div className="glass-card rounded-2xl p-6 mb-6 animate-scale-in">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse-glow">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Himoyalangan</h3>
              <p className="text-sm text-gray-600">Ota-ona bilan bog'langan</p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-sm text-green-700 font-medium">
              Kalit: <span className="font-mono text-lg">{childKey}</span>
            </p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Salom!
            </h3>
            <p className="text-gray-600 text-lg">
              {currentMessage}
            </p>
          </div>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-4 text-center hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Sun className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Kun holati</h4>
            <p className="text-sm text-gray-600">Quyoshli</p>
          </div>

          <div className="glass-card rounded-xl p-4 text-center hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Kayfiyat</h4>
            <p className="text-sm text-gray-600">Yaxshi</p>
          </div>
        </div>

        {/* Safety Reminder */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold mb-2">Eslatma</h3>
          <p className="text-blue-100">
            Har doim xavfsizlik qoidalariga amal qiling va ota-onangiz bilan aloqada bo'ling!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
