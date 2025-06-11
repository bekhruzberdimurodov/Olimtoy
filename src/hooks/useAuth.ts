
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
  proExpiryDate?: Date;
  proTrialDays?: number;
}

export interface Child {
  id: string;
  name: string;
  key: string;
  addedDate: string;
  parentId: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('olimtoy_user');
    const savedChildren = localStorage.getItem('olimtoy_children');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure backward compatibility and set default values
      setUser({
        ...parsedUser,
        isPro: parsedUser.isPro || false,
        childrenCount: parsedUser.childrenCount || 0,
        maxChildren: parsedUser.isPro ? 10 : 1,
        proExpiryDate: parsedUser.proExpiryDate ? new Date(parsedUser.proExpiryDate) : null,
        proTrialDays: parsedUser.proTrialDays || 7
      });
    }

    if (savedChildren) {
      setChildren(JSON.parse(savedChildren));
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
      maxChildren: 1,
      proTrialDays: 7
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

  const addChild = (childKey: string, childName?: string) => {
    if (!user || user.type !== 'parent') {
      throw new Error('Only parents can add children');
    }

    const newChild: Child = {
      id: Math.random().toString(36).substr(2, 9),
      name: childName || `Farzand-${childKey}`,
      key: childKey,
      addedDate: new Date().toISOString().split('T')[0],
      parentId: user.id
    };

    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
    localStorage.setItem('olimtoy_children', JSON.stringify(updatedChildren));

    const updatedUser = {
      ...user,
      childrenCount: (user.childrenCount || 0) + 1
    };

    setUser(updatedUser);
    localStorage.setItem('olimtoy_user', JSON.stringify(updatedUser));
    console.log('Child added with key:', childKey);
    return updatedUser;
  };

  const removeChild = (childId: string) => {
    if (!user || user.type !== 'parent') {
      throw new Error('Only parents can remove children');
    }

    const updatedChildren = children.filter(child => child.id !== childId);
    setChildren(updatedChildren);
    localStorage.setItem('olimtoy_children', JSON.stringify(updatedChildren));

    const updatedUser = {
      ...user,
      childrenCount: Math.max((user.childrenCount || 0) - 1, 0)
    };

    setUser(updatedUser);
    localStorage.setItem('olimtoy_user', JSON.stringify(updatedUser));
    console.log('Child removed:', childId);
    return updatedUser;
  };

  const activateProWithCode = (code: string) => {
    if (!user || user.type !== 'parent') {
      throw new Error('Only parents can activate Pro');
    }

    if (code !== 'bbu2025') {
      throw new Error('Kod noto\'g\'ri');
    }

    const proExpiryDate = new Date();
    proExpiryDate.setDate(proExpiryDate.getDate() + 30); // 30 days

    const updatedUser = {
      ...user,
      isPro: true,
      maxChildren: 10,
      proExpiryDate
    };

    // Update both state and localStorage immediately
    setUser(updatedUser);
    localStorage.setItem('olimtoy_user', JSON.stringify(updatedUser));
    console.log('Pro activated with code:', updatedUser);
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
    setChildren([]);
    localStorage.removeItem('olimtoy_user');
    localStorage.removeItem('olimtoy_children');
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
    children,
    loginParent,
    setupChild,
    addChild,
    removeChild,
    activateProWithCode,
    upgradeToPro,
    logout,
    canAddMoreChildren,
    needsProForMoreChildren
  };
};
