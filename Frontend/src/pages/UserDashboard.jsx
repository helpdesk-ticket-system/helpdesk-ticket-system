import { useEffect, useState } from "react";
import api from "../api/axios";

import CreateTicket from "../tickets/CreateTicket";
import TicketComments from "../components/TicketComments";

const statusColors = {
  OPEN: "bg-yellow-500/10 text-yellow-400",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400",
  RESOLVED: "bg-green-500/10 text-green-400",
  CLOSED: "bg-gray-500/10 text-gray-400",
};

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTickets();
  }, []);

  const fetchMyTickets = async () => {
    try {
      const res = await api.get("/tickets/");
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Tickets</h1>

        {/* CREATE TICKET */}
        <CreateTicket onCreated={fetchMyTickets} />

        {/* TICKET LIST */}
        {loading ? (
          <p className="text-slate-400 mt-6">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-slate-400 mt-6">
            You have not created any tickets yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3"
              >
                <h3 className="font-semibold text-lg">
                  {ticket.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {ticket.description}
                </p>

                <div className="flex gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${statusColors[ticket.status]}`}
                  >
                   {ticket.status ? ticket.status.replace("_", " ") : "UNKNOWN"}

                  </span>

                  <span className="text-xs text-slate-500">
                   Priority: {ticket.priority || "N/A"}

                  </span>
                </div>

                {/* COMMENTS */}
                <TicketComments ticketId={ticket.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
