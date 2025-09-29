import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  userPoints: number;
  addPoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    // Mock user for development
    const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        user_metadata: {
        name: 'Riya',
        phone: '+91 9876543210',
        pincode: '560001',
        landmark: 'Near City Center',
        role: 'user'
      },
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z'
    } as User;

    setUser(mockUser);
    setUserPoints(150); // Mock points
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in
    const mockUser: User = {
      id: email === 'admin@example.com' ? '2' : '1',
      email,
      user_metadata: {
        name: email === 'admin@example.com' ? 'Admin User' : 'John Doe',
        role: email === 'admin@example.com' ? 'admin' : 'user'
      },
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z'
    } as User;
    
    setUser(mockUser);
    setUserPoints(email === 'admin@example.com' ? 0 : 150);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      user_metadata: userData,
      aud: 'authenticated',
      created_at: new Date().toISOString()
    } as User;
    
    setUser(mockUser);
    setUserPoints(0);
  };

  const signOut = async () => {
    setUser(null);
    setUserPoints(0);
  };

  const addPoints = (points: number) => {
    setUserPoints(prev => prev + points);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    userPoints,
    addPoints
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
