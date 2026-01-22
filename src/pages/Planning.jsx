import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { planningEvents } from "../data/planningMock";
import "../styles/planning.css";

export default function Planning() {
  const [events, setEvents] = useState(planningEvents);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    priority: "normal",
  });

  const COLORS = {
    urgent: "#dc2626",
    important: "#f59e0b",
    normal: "#1e3a8a",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    if (!form.title || !form.start || !form.end) return;

    setEvents((prev) => [
      ...prev,
      {
        title: form.title,
        start: form.start,
        end: form.end,
        backgroundColor: COLORS[form.priority],
        borderColor: COLORS[form.priority],
      },
    ]);

    setShowForm(false);
    setForm({ title: "", start: "", end: "", priority: "normal" });
  };

  return (
    <div className="planning-header">
  <h1>Planning</h1>

  <div className="planning-actions">
    <button
      className="btn-primary"
      onClick={() => setShowForm(true)}
    >
      ➕ Événement imposé
    </button>

    <button className="btn-secondary">
      🧩 Proposer une tâche
    </button>
  </div>
</div>


      {/* MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Imposer un événement</h3>

            <input
              name="title"
              placeholder="Titre"
              value={form.title}
              onChange={handleChange}
            />

            <input
              type="datetime-local"
              name="start"
              value={form.start}
              onChange={handleChange}
            />

            <input
              type="datetime-local"
              name="end"
              value={form.end}
              onChange={handleChange}
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="normal">Normal</option>
            </select>

            <div className="form-actions">
              <button className="btn-primary" onClick={handleAddEvent}>
                Enregistrer
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALENDAR */}
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          height="auto"
        />
      </div>
    </div>
  );
}
