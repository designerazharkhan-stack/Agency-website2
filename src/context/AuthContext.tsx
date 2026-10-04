import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminUser } from '../types';
import { loginAdmin, logoutAdmin, subscribeToAuthChanges } from '../services/auth';
import { isFirebaseConfigured } from '../services/firebase';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  isFirebase: boolean;
  login: (email: string, pass: string) => Promise<AdminUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const loggedUser = await loginAdmin(email, pass);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = async () => {
    await logoutAdmin();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isFirebase: isFirebaseConfigured, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
