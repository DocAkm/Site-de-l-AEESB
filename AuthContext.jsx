import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { fetchUserProfileCallback } from '@/lib/authUtils'; 
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  updateUserProfile, 
  sendPasswordResetEmailUser, 
  updateUserPassword 
} from '@/lib/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const { toast } = useToast();

  const processUserSession = useCallback(async (currentSession) => {
    if (currentSession?.user) {
      const profile = await fetchUserProfileCallback(currentSession.user, toast);
      setUser(profile);
    } else {
      setUser(null);
    }
    setSession(currentSession);
  }, [toast]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (mounted) {
          await processUserSession(initialSession);
        }
      } catch (error) {
        if (mounted) {
          console.error("AuthContext: Error getting initial session:", error);
          setUser(null);
          setSession(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (mounted) {
          // setLoading(true); // Consider if loading state is needed for every auth change
          await processUserSession(newSession);
          // setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [processUserSession]);


  const handleAuthAction = async (action, ...params) => {
    setLoading(true);
    let result;
    try {
      result = await action(...params, toast);
      // onAuthStateChange should handle profile updates for login/register/logout.
      // For updateUserProfile, we might need an explicit re-fetch if the user object in context needs immediate update.
      if (action === updateUserProfile && result?.success && session?.user) {
         // AuthContext's onAuthStateChange should ideally catch user updates from Supabase
         // but if 'user' object in Supabase auth schema isn't changing, profile needs manual refresh.
         const refreshedProfile = await fetchUserProfileCallback(session.user, toast);
         setUser(refreshedProfile);
      }
    } catch (error) {
      console.error("AuthContext: Error in handleAuthAction for", action.name, error);
      if (!error.customToastShown) {
         toast({ title: "Erreur d'Authentification", description: error.message || "Une erreur inattendue est survenue.", variant: "destructive" });
      }
      result = { success: false, error: error.message || "Une erreur inattendue est survenue." };
    } finally {
      setLoading(false); 
    }
    return result;
  };

  const login = (email, password) => handleAuthAction(loginUser, email, password);
  const register = (userData) => handleAuthAction(registerUser, userData);
  const logout = () => handleAuthAction(logoutUser); // logoutUser in authService.js will call supabase.auth.signOut()
  
  const updateUser = (updatedData) => {
    if (!session?.user) {
      toast({ title: "Action Impossible", description: "Utilisateur non connecté.", variant: "destructive" });
      return Promise.resolve({ success: false, error: "Utilisateur non connecté" });
    }
    // Pass the current user object from session and the data to be updated
    return handleAuthAction(updateUserProfile, session.user, updatedData); 
  };

  const sendPasswordResetEmail = (email) => handleAuthAction(sendPasswordResetEmailUser, email);
  const updatePassword = (newPassword) => handleAuthAction(updateUserPassword, newPassword);

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout, register, updateUser, sendPasswordResetEmail, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};