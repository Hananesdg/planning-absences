import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#1e3a8a", "#3b82f6", "#f59e0b", "#ef4444"];

export function DonutChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BarChartMeetings({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <Tooltip />
        <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
