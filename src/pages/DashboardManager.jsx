import { useAuth } from "../context/AuthContext";


import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { DonutChart, BarChartMeetings } from "../components/Charts";
import {
  eventsData,
  meetingsData,
  tasksData,
} from "../data/dashboardData";

import "../styles/dashboard.css";

const COLORS = ["#1e3a8a", "#3b82f6", "#f59e0b", "#ef4444", "#22c55e"];

export default function DashboardManager() {
  // ✅ HOOKS ICI, PAS AILLEURS
  const [kpiData, setKpiData] = useState({
    employees: 0,
    absentsToday: 0,
    unjustifiedAbsences: 0,
    eventsWeek: 0,
    meetingHours: 0,
  });

  useEffect(() => {
  console.log("window.db =", window.db);

  if (!window.db || !window.db.getDashboardKpis) {
    console.error("❌ window.db non disponible");
    return;
  }

  window.db.getDashboardKpis().then(setKpiData);
}, []);

const { user } = useAuth();
console.log("DashboardManager user =", user);

  return (
    <div className="dashboard-container">
      <h1>Dashboard Manager</h1>

      {/* ================= KPI ================= */}
      <div className="kpi-grid">
        <Kpi title="Employés" value={kpiData.employees} />
        <Kpi title="Absents aujourd’hui" value={kpiData.absentsToday} />
        <Kpi
          title="Absences non justifiées"
          value={kpiData.unjustifiedAbsences}
        />
        <Kpi title="Événements semaine" value={kpiData.eventsWeek} />
        <Kpi title="Heures de réunions" value={`${kpiData.meetingHours}h`} />
      </div>

      {/* ========= CHARTS ========= */}
      <div className="charts-row">
        <div className="chart-card">
          <h3> Événements</h3>
          <DonutChart data={eventsData} />
        </div>

        <div className="chart-card">
          <h3> Réunions (heures)</h3>
          <BarChartMeetings data={meetingsData} />
        </div>

        <div className="chart-card">
          <h3> Tâches & missions</h3>
          <DonutChart data={tasksData} />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Kpi({ title, value }) {
  return (
    <div className="kpi-card">
      <strong>{value}</strong>
      <span>{title}</span>
    </div>
  );
}
