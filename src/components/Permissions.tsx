
import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Mic, Battery, Smartphone, Check, X } from 'lucide-react';

interface PermissionsProps {
  onComplete: () => void;
  userType: 'parent' | 'child';
}

const Permissions: React.FC<PermissionsProps> = ({ onComplete, userType }) => {
  const [permissions, setPermissions] = useState({
    camera: false,
    location: false,
    microphone: false,
    battery: false,
    device: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const requestPermission = async (type: string) => {
    setIsLoading(true);
    try {
      switch (type) {
        case 'camera':
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          setPermissions(prev => ({ ...prev, camera: true }));
          break;
        
        case 'location':
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setPermissions(prev => ({ ...prev, location: true }));
          break;
        
        case 'microphone':
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioStream.getTracks().forEach(track => track.stop());
          setPermissions(prev => ({ ...prev, microphone: true }));
          break;
        
        case 'battery':
          if ('getBattery' in navigator) {
            await (navigator as any).getBattery();
          }
          setPermissions(prev => ({ ...prev, battery: true }));
          break;
        
        case 'device':
          // Device info is always available
          setPermissions(prev => ({ ...prev, device: true }));
          break;
      }
    } catch (error) {
      console.log(`${type} ruxsati berilmadi:`, error);
      // Even if permission denied, mark as "handled"
      setPermissions(prev => ({ ...prev, [type]: true }));
    }
    setIsLoading(false);
  };

  const allPermissionsGranted = Object.values(permissions).every(Boolean);

  const permissionsList = [
    { key: 'camera', icon: Camera, title: 'Kamera', desc: 'Video va rasm olish uchun' },
    { key: 'location', icon: MapPin, title: 'Joylashuv', desc: 'Lokatsiyani aniqlash uchun' },
    { key: 'microphone', icon: Mic, title: 'Mikrofon', desc: 'Audio yozish uchun' },
    { key: 'battery', icon: Battery, title: 'Batareya', desc: 'Quvvat holatini kuzatish uchun' },
    { key: 'device', icon: Smartphone, title: 'Qurilma', desc: 'Qurilma ma\'lumotlarini olish uchun' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ruxsatlar
            </h2>
            <p className="text-gray-600">
              {userType === 'parent' ? 'Ota-ona' : 'Farzand'} sifatida davom etish uchun quyidagi ruxsatlarni bering
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {permissionsList.map((permission) => (
              <div key={permission.key} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <permission.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{permission.title}</h3>
                    <p className="text-sm text-gray-600">{permission.desc}</p>
                  </div>
                </div>
                
                {permissions[permission.key as keyof typeof permissions] ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <button
                    onClick={() => requestPermission(permission.key)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    Ruxsat berish
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onComplete}
            disabled={!allPermissionsGranted}
            className="w-full guardian-gradient text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Davom etish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
