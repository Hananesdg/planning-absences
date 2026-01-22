import { useState } from "react";

const STATUS_COLORS = {
  URGENT: "#ef4444",
  IMPORTANT: "#f59e0b",
  NORMAL: "#3b82f6",
};

export default function EventFormModal({ type, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    status: "NORMAL",
    target: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      type,
      color: STATUS_COLORS[form.status],
      id: Date.now(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>{type === "EVENT" ? "Imposer un événement" : "Proposer une tâche"}</h3>

        <input name="title" placeholder="Titre" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange} />

        <input type="datetime-local" name="start" onChange={handleChange} />
        <input type="datetime-local" name="end" onChange={handleChange} />

        <select name="status" onChange={handleChange}>
          <option value="URGENT">Urgent</option>
          <option value="IMPORTANT">Important</option>
          <option value="NORMAL">Normal</option>
        </select>

        <input
          name="target"
          placeholder="Service ou salarié concerné"
          onChange={handleChange}
        />

        <input type="file" />

        <div className="modal-actions">
          <button className="btn primary" onClick={handleSubmit}>
            Enregistrer
          </button>
          <button className="btn outline" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
