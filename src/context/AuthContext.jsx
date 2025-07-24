
//Authcontext.jsx
import { createContext, useState, useContext } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null); //Created context for auth


//For use the different states of the app, we need to create a Context Provider
//Is useful to share data between components
//And to avoid prop drilling


//The shared data is:
//login
//logout
//isLoading

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

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
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//This is created by the reason of envolve the components which need to auth
export const useAuth = () => useContext(AuthContext);
