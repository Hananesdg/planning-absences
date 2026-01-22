import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { planningEvents } from "../data/planningMock";
import "../styles/planning.css";

export default function Planning() {
  return (
    <div className="planning-container">
      <div className="planning-header">
        <h1>Planning</h1>

        <div className="planning-actions">
          <button className="btn-primary">➕ Événement imposé</button>
          <button className="btn-secondary">🧩 Proposer une tâche</button>
        </div>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={planningEvents.map((event) => ({
            ...event,
            backgroundColor:
              event.type === "mandatory" ? "#1e3a8a" : "#f59e0b",
            borderColor:
              event.type === "mandatory" ? "#1e3a8a" : "#f59e0b",
          }))}
          height="auto"
        />
      </div>
    </div>
  );
}
