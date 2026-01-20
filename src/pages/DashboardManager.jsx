import { useAuth } from "../context/AuthContext";

export default function DashboardManager() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1 className="dashboard-title">Dashboard Responsable</h1>
      <p>Bienvenue {user?.name}</p>

      <ul className="dashboard-list">
        <li>📅 Gérer le planning</li>
        <li>📝 Affecter des tâches</li>
        <li>🏖️ Valider / refuser les absences</li>
        <li>⚠️ Suivre les absences non justifiées</li>
      </ul>
    </div>
  );
}
