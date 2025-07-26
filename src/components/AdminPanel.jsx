import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const AdminPanel = () => {
  const auth = useAuth();

  // Si aún no hay contexto, muestra cargando (o nada)
  if (!auth) {
    return <p className="text-white">Cargando autenticacion...</p>;
  }

  const { user } = auth;

  useEffect(() => {
    if (user) {
      console.log("Usuario autenticado:", user.email);
    } else {
      console.log("No autenticado");
    }
  }, [user]);

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold">Panel de administración</h1>
      <p>Bienvenido, {user?.email}</p>
    </div>
  );
};

export default AdminPanel;
