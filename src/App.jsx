import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardManager from "./pages/DashboardManager";
import DashboardEmployee from "./pages/DashboardEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      {/* NAVBAR visible UNIQUEMENT si connecté */}
      {user && <Navbar />}

      <Routes>
        {/* Login toujours accessible */}
        <Route path="/" element={<Login />} />

        <Route
          path="/manager"
          element={
            <ProtectedRoute role="manager">
              <DashboardManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <DashboardEmployee />
            </ProtectedRoute>
          }
        />

        {/* Routes futures */}
        <Route path="/planning" element={<ProtectedRoute><div>Planning</div></ProtectedRoute>} />
        <Route path="/absences" element={<ProtectedRoute><div>Absences</div></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
