import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  kpiData,
  absencesLast7Days,
  absencesByMonth,
  lateArrivals,
} from "../data/dashboardMock";

import { DonutChart, BarChartMeetings } from "../components/Charts";
import {
  eventsData,
  meetingsData,
  tasksData,
} from "../data/dashboardData";

import "../styles/dashboard.css";

const COLORS = ["#1e3a8a", "#3b82f6", "#f59e0b", "#ef4444", "#22c55e"];

export default function DashboardManager() {
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

      {/* ========= CHARTS ÉVÉNEMENTS / RÉUNIONS / TÂCHES ========= */}
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

      {/* ================= CHARTS ABSENCES ================= */}
      <div className="charts-grid">
        <ChartCard
          title="Absences – 7 derniers jours"
          data={absencesLast7Days}
        />
        <ChartCard title="Absences par mois" data={absencesByMonth} />
        <ChartCard title="Retards – semaine" data={lateArrivals} />
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

function ChartCard({ title, data }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
