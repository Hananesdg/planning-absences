import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div>
        <Link to={user.role === "manager" ? "/manager" : "/employee"}>
          Dashboard
        </Link>

        <Link to="/planning">Planning</Link>
        <Link to="/absences">Absences</Link>
        <Link to="/users">Employées</Link>
      </div>

      <button onClick={logout}>Déconnexion</button>
    </nav>
  );
}
