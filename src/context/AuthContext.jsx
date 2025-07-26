import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading general
  const [isLoading, setIsLoading] = useState(false); // loading al hacer login

  // Cargar sesión al inicio
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Sesión al cargar:", session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.subscription?.unsubscribe();
  }, []);
  

  const login = async (email, password) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);
    return !error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null); // importante para que reaccione inmediatamente
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
