// LoginForm.jsx

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    console.log("Login success?", success); // 👀 ¿Esto da true o false?

    if (success) {
      window.location.href = "/admin"; // ✅ Redirección tradicional
    } else {
      setErrorMsg("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-brown-800 mb-2">Iniciar Sesión</h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Ingresa tus credenciales para acceder al panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="text-sm text-red-600 bg-red-100 p-2 rounded">{errorMsg}</div>
          )}

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brown-400"
              placeholder="admin@muebleriapiero.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brown-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-md font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md text-sm text-brown-800">
          <p className="font-bold mb-1">Credenciales de Demo:</p>
          <p><strong>Admin:</strong> antony167273@gmail.com / rexxarroar25</p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
