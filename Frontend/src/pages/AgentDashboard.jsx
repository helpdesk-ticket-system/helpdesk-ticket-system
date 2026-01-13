import { useEffect, useState } from "react";
import axios from "../api/axios";
import TicketComments from "../components/TicketComments";
const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const token = localStorage.getItem("access");
    const res = await axios.get("/tickets/agent/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTickets(res.data);
  };
 <TicketComments ticketId={tickets.id} />

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("access");
    await axios.patch(
      `/tickets/agent/${id}/update/`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadTickets();
  };

  return (
    <div className="p-8 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Assigned Tickets</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <h3 className="font-semibold mb-2">{t.title}</h3>
            <p className="text-slate-400 text-sm mb-3">
              {t.description}
            </p>

            <select
              value={t.status}
              onChange={(e) =>
                updateStatus(t.id, e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentDashboard;
