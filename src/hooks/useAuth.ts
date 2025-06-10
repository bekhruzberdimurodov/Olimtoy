
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  phone: string;
  type: 'parent' | 'child';
  createdAt: Date;
  isPro?: boolean;
  childrenCount?: number;
  maxChildren?: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('olimtoy_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure backward compatibility and set default values
      setUser({
        ...parsedUser,
        isPro: parsedUser.isPro || false,
        childrenCount: parsedUser.childrenCount || 0,
        maxChildren: parsedUser.isPro ? 10 : 1
      });
    }
    setIsLoading(false);
  }, []);

  const loginParent = (name: string, phone: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      type: 'parent',
      createdAt: new Date(),
      isPro: false,
      childrenCount: 0,
      maxChildren: 1
    };
    
    setUser(newUser);
    localStorage.setItem('olimtoy_user', JSON.stringify(newUser));
    console.log('Parent logged in:', newUser);
    return newUser;
  };

  const setupChild = () => {
    const childKey = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // If current user is a parent, add the child to their account
    if (user && user.type === 'parent') {
      const updatedUser = {
        ...user,
        childrenCount: (user.childrenCount || 0) + 1
      };
      setUser(updatedUser);
      localStorage.setItem('olimtoy_user', JSON.stringify(updatedUser));
      localStorage.setItem('child_key', childKey);
      console.log('Child setup completed for parent with key:', childKey);
      return { user: updatedUser, key: childKey };
    } else {
      // Legacy behavior - create child user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Child-${childKey}`,
        phone: '',
        type: 'child',
        createdAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('olimtoy_user', JSON.stringify(newUser));
      localStorage.setItem('child_key', childKey);
      console.log('Child setup completed with key:', childKey);
      return { user: newUser, key: childKey };
    }
  };

  const addChild = (childKey: string) => {
    if (!user || user.type !== 'parent') {
      throw new Error('Only parents can add children');
    }

    const updatedUser = {
      ...user,
      childrenCount: (user.childrenCount || 0) + 1
    };

    setUser(updatedUser);
    localStorage.setItem('olimtoy_user', JSON.stringify(updatedUser));
    console.log('Child added with key:', childKey);
    return updatedUser;
  };

  const upgradeToPro = () => {
    if (!user || user.type !== 'parent') {
      throw new Error('Only parents can upgrade to Pro');
    }

    const updatedUser = {
      ...user,
      isPro: true,
      maxChildren: 10
    };

    setUser(updatedUser);
    localStorage.setItem('olimtoy_user', JSON.stringify(updatedUser));
    console.log('User upgraded to Pro:', updatedUser);
    return updatedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('olimtoy_user');
    localStorage.removeItem('child_key');
    console.log('User logged out');
  };

  const canAddMoreChildren = () => {
    if (!user || user.type !== 'parent') return false;
    return (user.childrenCount || 0) < (user.maxChildren || 1);
  };

  const needsProForMoreChildren = () => {
    if (!user || user.type !== 'parent') return false;
    return !user.isPro && (user.childrenCount || 0) >= 1;
  };

  return {
    user,
    isLoading,
    loginParent,
    setupChild,
    addChild,
    upgradeToPro,
    logout,
    canAddMoreChildren,
    needsProForMoreChildren
  };
};
