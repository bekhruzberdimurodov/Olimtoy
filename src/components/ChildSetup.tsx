
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Smartphone } from 'lucide-react';

interface ChildSetupProps {
  onBack: () => void;
  onComplete: () => void;
  childKey: string;
}

const ChildSetup: React.FC<ChildSetupProps> = ({ onBack, onComplete, childKey }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(childKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 8000); // Auto complete after 8 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8 animate-fade-in">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/80 hover:bg-white transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Farzand qurilmasi</h1>
        </div>

        <div className="glass-card rounded-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ulanish kaliti yaratildi
            </h2>
            <p className="text-gray-600">
              Bu kalitni ota-ona qurilmasida kiriting
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Ulanish kaliti:</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-3xl font-bold text-green-700 tracking-widest font-mono">
                  {childKey}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-green-200 hover:bg-green-300 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-700" />
                  ) : (
                    <Copy className="w-4 h-4 text-green-700" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="text-gray-700">Ota-ona "Farzand qo'shish" tugmasini bosadi</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="text-gray-700">Yuqoridagi kalitni kiritadi</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p className="text-gray-700">Ulanish avtomatik ta'minlanadi</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          >
            Tayyor
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Bu sahifa 8 soniyadan keyin avtomatik yopiladi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildSetup;
