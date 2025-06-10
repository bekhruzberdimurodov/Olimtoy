
import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  Camera, 
  Battery, 
  Clock, 
  Mic, 
  Smartphone, 
  Plus,
  Settings,
  LogOut,
  Users,
  Crown,
  Lock,
  CameraOff
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ProUpgradeModal from './ProUpgradeModal';
import Map from './Map';

interface ParentDashboardProps {
  user: {
    name: string;
    phone: string;
    isPro?: boolean;
    childrenCount?: number;
    maxChildren?: number;
  };
  onLogout: () => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ user, onLogout }) => {
  const { addChild, upgradeToPro, canAddMoreChildren, needsProForMoreChildren } = useAuth();
  const [activeChild, setActiveChild] = useState(0);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [childKey, setChildKey] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock children data
  const children = [
    {
      id: 1,
      name: "Bexruz",
      isOnline: true,
      battery: 42,
      location: "Uzbekistan",
      coordinates: { lat: 41.2995, lng: 69.2401 },
      screenTime: "2s 45d",
      device: "iPhone 27 Pro Max",
      lastSeen: "Hozir"
    },
      {
      id: 2,
      name: "Azizjaan",
      isOnline: true,
      battery: 88,
      location: "Uzbekistan",
      coordinates: { lat: 41.2995, lng: 69.2401 },
      screenTime: "2s 45d",
      device: "iPhone 7 mini",
      lastSeen: "Hozir"
    }
  ];

  const handleAddChild = () => {
    if (!canAddMoreChildren()) {
      if (needsProForMoreChildren()) {
        setShowProModal(true);
      }
      return;
    }

    if (childKey.length === 6) {
      addChild(childKey);
      console.log('Adding child with key:', childKey);
      setShowAddChild(false);
      setChildKey('');
    }
  };

  const handleAddChildClick = () => {
    if (needsProForMoreChildren()) {
      setShowProModal(true);
    } else {
      setShowAddChild(true);
    }
  };

  const handleCameraToggle = async () => {
    if (isCameraOn) {
      // Turn off camera
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
      setIsCameraOn(false);
      console.log('Camera turned off');
    } else {
      // Turn on camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' },
          audio: false 
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
        console.log('Camera turned on');
      } catch (error) {
        console.error('Camera access denied:', error);
      }
    }
  };

  const handleUpgrade = () => {
    upgradeToPro();
    setShowProModal(false);
    console.log('Upgraded to Pro automatically');
  };

  const currentChild = children[activeChild];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 guardian-gradient rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900">Olimtoy platformasi</h1>
                {user.isPro && (
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    <span>Pro</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {user.name} • {user.childrenCount || 0}/{user.maxChildren || 1} farzand
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!user.isPro && (
              <button 
                onClick={() => setShowProModal(true)}
                className="flex items-center space-x-2 py-2 px-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Pro</span>
              </button>
            )}
            <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={onLogout}
              className="p-2 rounded-xl bg-red-100 hover:bg-red-200 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Children Tabs */}
        <div className="flex items-center space-x-4 mb-6 overflow-x-auto">
          {children.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setActiveChild(index)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeChild === index
                  ? 'guardian-gradient text-white shadow-lg'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${child.isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
              <span>{child.name}</span>
            </button>
          ))}
          
          <button
            onClick={handleAddChildClick}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
              needsProForMoreChildren() 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:shadow-lg' 
                : 'bg-white/60 text-gray-700 hover:bg-white/80'
            }`}
          >
            {needsProForMoreChildren() ? <Crown className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>Farzand qo'shish</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Location Card with Map */}
          <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Joylashuv</h3>
                <p className="text-sm text-gray-600">{currentChild.location}</p>
              </div>
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <Map 
                location={currentChild.coordinates}
                childName={currentChild.name}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Oxirgi yangilanish: {currentChild.lastSeen}</p>
          </div>

          {/* Camera Card - Free */}
          <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Kamera</h3>
            </div>
            <div className="bg-gray-200 rounded-xl h-72 flex items-center justify-center mb-3 overflow-hidden">
              {isCameraOn ? (
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <CameraOff className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <button 
              onClick={handleCameraToggle}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                isCameraOn 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {isCameraOn ? 'Kamerani o\'chirish' : 'Kamerani yoqish'}
            </button>
          </div>

          {/* Battery Card */}
          <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Battery className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Batareya</h3>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${currentChild.battery}%` }}
                />
              </div>
              <span className="text-lg font-semibold text-gray-900">{currentChild.battery}%</span>
            </div>
          </div>

          {/* Screen Time Card */}
          <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Ekran vaqti</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{currentChild.screenTime}</p>
            <p className="text-sm text-gray-500">Bugungi kun</p>
          </div>

          {/* Microphone Card - Still Pro */}
          <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in relative" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Mic className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Mikrofon</h3>
              {!user.isPro && (
                <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs">
                  <Crown className="w-3 h-3" />
                  <span>Pro</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => !user.isPro ? setShowProModal(true) : console.log('Listening started')}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
                user.isPro 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:shadow-lg'
              }`}
            >
              {user.isPro ? 'Tinglashni boshlash' : 'Pro kerak'}
            </button>
          </div>

          {/* Device Info Card */}
          <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Qurilma</h3>
            </div>
            <p className="text-gray-900 font-medium mb-1">{currentChild.device}</p>
            <p className="text-sm text-gray-500">Android 12</p>
            <div className="flex items-center space-x-2 mt-3">
              <div className={`w-2 h-2 rounded-full ${currentChild.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-sm text-gray-600">
                {currentChild.isOnline ? 'Onlayn' : 'Oflayn'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Child Modal */}
      {showAddChild && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Farzand qo'shish</h3>
            <p className="text-gray-600 mb-6">
              Farzand qurilmasidan olingan 6 belgili kalitni kiriting
            </p>
            
            <input
              type="text"
              value={childKey}
              onChange={(e) => setChildKey(e.target.value.toUpperCase())}
              placeholder="XXXXXX"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors mb-6"
            />
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddChild(false)}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddChild}
                disabled={childKey.length !== 6}
                className="flex-1 py-3 px-4 guardian-gradient text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pro Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default ParentDashboard;
