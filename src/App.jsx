import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardManager from "./pages/DashboardManager";
import DashboardEmployee from "./pages/DashboardEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Planning from "./pages/Planning";
import UsersManager from "./pages/UsersManager";


export default function App() {
  const { user } = useAuth();

  return (
    <>
      {/* Navbar visible uniquement si connecté */}
      {user && <Navbar />}

      <Routes>
        {/* Route LOGIN */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === "MANAGER" ? "/manager" : "/employee"} />
            ) : (
              <Login />
            )
          }
        />

        {/* DASHBOARD MANAGER */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute role="MANAGER">
              <DashboardManager />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD EMPLOYEE */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <DashboardEmployee />
            </ProtectedRoute>
          }
        />

        {/* PLANNING (connecté seulement) */}
        <Route
          path="/planning"
          element={
            <ProtectedRoute>
              <Planning />
            </ProtectedRoute>
          }
        />

        {/* ABSENCES */}
        <Route
          path="/absences"
          element={
            <ProtectedRoute>
              <div>Absences</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute role="MANAGER">
              <UsersManager />
            </ProtectedRoute>
          }
        />


        {/* FALLBACK INTELLIGENT */}
        <Route
          path="*"
          element={
            <Navigate
              to={user ? (user.role === "MANAGER" ? "/manager" : "/employee") : "/"}
            />
          }
        />
      </Routes>
    </>
  );
}
