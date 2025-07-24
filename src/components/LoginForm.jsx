// LoginForm.jsx

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function LoginForm(){
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //Evades that recharge of page with form
        const success = await login(email, password);
        if (!success) {
            setErrorMsg("Credenciales incorrectas");
        }
    };

    

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
          <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
    
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
    
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
    
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Ingresar
          </button>
        </form>
      );
}

export default LoginForm;