
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import OnboardingScreen from '@/components/OnboardingScreen';
import ParentAuth from '@/components/ParentAuth';
import SMSVerification from '@/components/SMSVerification';
import ParentChildSetup from '@/components/ParentChildSetup';
import ChildSetup from '@/components/ChildSetup';
import Permissions from '@/components/Permissions';
import ParentDashboard from '@/components/ParentDashboard';
import ChildDashboard from '@/components/ChildDashboard';
import ContactButton from '@/components/ContactButton';

type AppState = 'onboarding' | 'parent-auth' | 'sms-verification' | 'parent-child-setup' | 'child-setup' | 'permissions' | 'parent-dashboard' | 'child-dashboard';

const Index = () => {
  const { user, isLoading, loginParent, setupChild, logout } = useAuth();
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [parentInfo, setParentInfo] = useState({ name: '', phone: '' });
  const [childKey, setChildKey] = useState('');
  const [userType, setUserType] = useState<'parent' | 'child'>('parent');

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
    setUserType(role);
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
    setAppState('parent-child-setup');
  };

  const handleParentChildSetup = (childName: string, childKey: string) => {
    // Store child info and go to permissions
    const childInfo = {
      name: childName,
      key: childKey
    };
    
    localStorage.setItem('child_info', JSON.stringify(childInfo));
    localStorage.setItem('child_key', childKey);
    setAppState('permissions');
  };

  const handleChildSetup = () => {
    const result = setupChild();
    setChildKey(result.key);
    setAppState('permissions');
  };

  const handlePermissionsComplete = () => {
    if (userType === 'parent') {
      // Create parent user after permissions
      loginParent(parentInfo.name, parentInfo.phone);
    }
    // For child, user is already created in setupChild
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {(() => {
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
          
          case 'permissions':
            return (
              <Permissions
                onComplete={handlePermissionsComplete}
                userType={userType}
              />
            );
          
          default:
            return <OnboardingScreen onSelectRole={handleRoleSelect} />;
        }
      })()}
      
      <ContactButton />
    </div>
  );
};

export default Index;
