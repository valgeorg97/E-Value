import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { User, signOut } from 'firebase/auth';
import{ AuthContextProps } from '../interfaces/index';

/**
 * AuthProvider component manages authentication state using Firebase Auth, providing a context for the current user and sign-out functionality.
 * It listens for authentication state changes and provides `user`, `setUser`, and `signout` through its context, making them accessible
 * throughout the application. `useAuth` is a custom hook for easy access to the AuthContext.
 *
 */


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return <AuthContext.Provider value={{ user, setUser, signout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
