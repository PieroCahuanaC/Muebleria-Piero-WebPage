// src/pages/admin/AdminPage.jsx
import ProtectedRoute from "../../components/ProtectedRoute";
import AdminPanel from "../../components/AdminPanel";
import { AuthProvider } from "../../context/AuthContext";

export default function AdminPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    </AuthProvider>
  );
}
