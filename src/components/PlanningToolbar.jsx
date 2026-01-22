export default function PlanningToolbar({ onAddEvent, onAddTask }) {
  return (
    <div className="planning-toolbar">
      <button className="btn primary" onClick={onAddEvent}>
        ➕ Imposer un événement
      </button>

      <button className="btn secondary" onClick={onAddTask}>
        🧩 Proposer une tâche
      </button>
    </div>
  );
}
