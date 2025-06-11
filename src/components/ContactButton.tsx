
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactButton: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowContactForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110"
        title="Biz bilan bog'laning"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <ContactForm 
        isOpen={showContactForm} 
        onClose={() => setShowContactForm(false)} 
      />
    </>
  );
};

export default ContactButton;
