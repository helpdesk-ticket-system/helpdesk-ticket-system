import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminStats = ({ tickets }) => {
  const data = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map(
    (status) => ({
      name: status.replace("_", " "),
      count: tickets.filter((t) => t.status === status).length,
    })
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
      <h3 className="font-semibold mb-4">Ticket Status Overview</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminStats;
