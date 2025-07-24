// src/pages/admin/LoginPage.jsx

import LoginForm from "../../components/LoginForm";
import { AuthProvider } from "../../context/AuthContext";

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
