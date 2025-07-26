import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Loading from "./Loading"; // opcional, si tienes un spinner

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  // Previene error si el contexto aún no está montado
  if (!auth) {
    return <p className="text-white">Cargando autenticacion desde protected route...</p>;
  }

  const { user, loading } = auth;
  console.log("Auth status:", { user, loading });

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/admin/login"; // Redirección manual
    }
  }, [user, loading]);


  if (loading) return <Loading />;

  return user ? children : null;
};

export default ProtectedRoute;
