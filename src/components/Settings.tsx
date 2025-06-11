
import React from 'react';
import { X, User, Phone, Crown, Users, Trash2, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { user, children, removeChild, logout } = useAuth();
  const { toast } = useToast();

  if (!isOpen) return null;

  const proExpiryDate = user?.proExpiryDate ? new Date(user.proExpiryDate) : null;
  const daysLeft = proExpiryDate ? Math.ceil((proExpiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

  const handleRemoveChild = async (childId: string, childName: string) => {
    if (window.confirm(`${childName}ni ro'yxatdan o'chirishni xohlaysizmi?`)) {
      try {
        removeChild(childId);
        toast({
          title: "Muvaffaqiyat",
          description: `${childName} ro'yxatdan o'chirildi`,
        });
      } catch (error) {
        toast({
          title: "Xatolik",
          description: "Farzandni o'chirishda xatolik yuz berdi",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Sozlamalar</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{user?.name}</h4>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{user?.phone}</span>
              </div>
            </div>
          </div>

          {/* Registration Date */}
          <div className="mb-3 text-sm text-gray-600">
            <strong>Ro'yxatdan o'tgan:</strong> {user?.createdAt ? formatDate(user.createdAt) : 'Noma\'lum'}
          </div>

          {/* Pro Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Pro Status</span>
            </div>
            <div className="text-right">
              {user?.isPro ? (
                <div>
                  <span className="text-sm font-medium text-green-600">Faol</span>
                  {daysLeft > 0 && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{daysLeft} kun qoldi</span>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-500">Faol emas</span>
              )}
            </div>
          </div>
        </div>

        {/* Children List */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-900">Farzandlar ro'yxati</h4>
            <span className="text-sm text-gray-500">
              ({user?.childrenCount || 0}/{user?.maxChildren || 1})
            </span>
          </div>

          <div className="space-y-3">
            {children.map((child) => (
              <div key={child.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{child.name}</p>
                  <p className="text-sm text-gray-500">Qo'shilgan: {child.addedDate}</p>
                </div>
                <button
                  onClick={() => handleRemoveChild(child.id, child.name)}
                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}

            {children.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Hech qanday farzand qo'shilmagan</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            if (window.confirm('Hisobdan chiqishni xohlaysizmi?')) {
              logout();
              onClose();
            }
          }}
          className="w-full py-3 px-4 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors"
        >
          Hisobdan chiqish
        </button>
      </div>
    </div>
  );
};

export default Settings;
