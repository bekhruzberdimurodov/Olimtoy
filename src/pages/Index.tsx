
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import OnboardingScreen from '@/components/OnboardingScreen';
import ParentAuth from '@/components/ParentAuth';
import SMSVerification from '@/components/SMSVerification';
import ParentChildSetup from '@/components/ParentChildSetup';
import ChildSetup from '@/components/ChildSetup';
import ParentDashboard from '@/components/ParentDashboard';
import ChildDashboard from '@/components/ChildDashboard';

type AppState = 'onboarding' | 'parent-auth' | 'sms-verification' | 'parent-child-setup' | 'child-setup' | 'parent-dashboard' | 'child-dashboard';

const Index = () => {
  const { user, isLoading, loginParent, setupChild, logout } = useAuth();
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [parentInfo, setParentInfo] = useState({ name: '', phone: '' });
  const [childKey, setChildKey] = useState('');

  // If user exists, show appropriate dashboard
  if (!isLoading && user) {
    if (user.type === 'parent') {
      return <ParentDashboard user={user} onLogout={logout} />;
    } else {
      const savedChildKey = localStorage.getItem('child_key') || '';
      return <ChildDashboard childKey={savedChildKey} onBack={logout} />;
    }
  }

  const handleRoleSelect = (role: 'parent' | 'child') => {
    if (role === 'parent') {
      setAppState('parent-auth');
    } else {
      setAppState('child-setup');
    }
  };

  const handleParentAuth = (name: string, phone: string) => {
    setParentInfo({ name, phone });
    setAppState('sms-verification');
  };

  const handleSMSVerification = () => {
    // After SMS verification, go to parent-child setup
    setAppState('parent-child-setup');
  };

  const handleParentChildSetup = (childName: string, childKey: string) => {
    // Create parent user and add child
    const parentUser = loginParent(parentInfo.name, parentInfo.phone);
    
    // Store child info
    const childInfo = {
      name: childName,
      key: childKey,
      parentId: parentUser.id
    };
    
    localStorage.setItem('child_info', JSON.stringify(childInfo));
    localStorage.setItem('child_key', childKey);
    
    console.log('Parent va farzand muvaffaqiyatli qo\'shildi');
  };

  const handleChildSetup = () => {
    const result = setupChild();
    setChildKey(result.key);
  };

  const handleBack = () => {
    setAppState('onboarding');
    setParentInfo({ name: '', phone: '' });
    setChildKey('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  switch (appState) {
    case 'onboarding':
      return <OnboardingScreen onSelectRole={handleRoleSelect} />;
    
    case 'parent-auth':
      return <ParentAuth onBack={handleBack} onSuccess={handleParentAuth} />;
    
    case 'sms-verification':
      return (
        <SMSVerification 
          onBack={() => setAppState('parent-auth')} 
          onSuccess={handleSMSVerification}
          phoneNumber={parentInfo.phone}
        />
      );
    
    case 'parent-child-setup':
      return (
        <ParentChildSetup 
          onBack={() => setAppState('sms-verification')} 
          onComplete={handleParentChildSetup}
        />
      );
    
    case 'child-setup':
      return (
        <ChildSetup 
          onBack={handleBack} 
          onComplete={handleChildSetup}
          childKey={childKey || Math.random().toString(36).substr(2, 6).toUpperCase()}
        />
      );
    
    default:
      return <OnboardingScreen onSelectRole={handleRoleSelect} />;
  }
};

export default Index;
