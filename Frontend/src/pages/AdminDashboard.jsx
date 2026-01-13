import { useEffect, useState } from "react";
import api from "../api/axios";
import { fetchAgents } from "../api/users";
import AdminStats from "../components/AdminStats";
import TicketComments from "../components/TicketComments";

const statusColors = {
  OPEN: "bg-yellow-500/10 text-yellow-400",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400",
  RESOLVED: "bg-green-500/10 text-green-400",
  CLOSED: "bg-gray-500/10 text-gray-400",
};

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [ticketsRes, agentsRes] = await Promise.all([
      api.get("/tickets/admin-tickets/"),
      fetchAgents(),
    ]);

    setTickets(ticketsRes.data);
    setAgents(agentsRes);
  };

  const assignAgent = async (ticketId, agentId) => {
    if (!agentId) return;

    await api.put(`/tickets/admin-tickets/${ticketId}/assign/`, {
      assigned_to: agentId,
    });

    loadData();
  };

  const deleteTicket = async (ticketId) => {
    await api.delete(`/tickets/admin-tickets/${ticketId}/delete/`);
    loadData();
  };

  const filteredTickets =
    filter === "ALL"
      ? tickets
      : tickets.filter((t) => t.status === filter);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h2 className="text-xl font-bold mb-6">
          Admin <span className="text-blue-500">Panel</span>
        </h2>

        <div className="space-y-2 text-sm">
          {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`block w-full text-left px-3 py-2 rounded-lg ${
                filter === s
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">All Tickets</h1>

        <AdminStats tickets={tickets} />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3"
            >
              <h3 className="font-semibold text-lg">{ticket.title}</h3>

              <p className="text-slate-400 text-sm">
                {ticket.description}
              </p>

              <div className="flex gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${statusColors[ticket.status]}`}
                >
                  {ticket.status.replace("_", " ")}
                </span>
                <span className="text-xs text-slate-500">
                  Priority: {ticket.priority}
                </span>
              </div>

              {/* ASSIGN AGENT */}
              <select
                onChange={(e) =>
                  assignAgent(ticket.id, e.target.value)
                }
                defaultValue=""
                className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
              >
                <option value="">Assign agent</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.username}
                  </option>
                ))}
              </select>

              {/* COMMENTS */}
              <TicketComments ticketId={ticket.id} />

              <button
                onClick={() => deleteTicket(ticket.id)}
                className="bg-red-500/80 hover:bg-red-500 py-2 rounded-lg text-sm"
              >
                Delete Ticket
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
