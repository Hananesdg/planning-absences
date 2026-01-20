import { useAuth } from "../context/AuthContext";

export default function DashboardEmployee() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1 className="dashboard-title">Dashboard Salarié</h1>
      <p>Bienvenue {user?.name}</p>

      <ul className="dashboard-list">
        <li>📅 Consulter mon planning</li>
        <li>📨 Accepter / refuser une mission</li>
        <li>🏖️ Faire une demande d’absence</li>
        <li>📎 Joindre un justificatif</li>
      </ul>
    </div>
  );
}
