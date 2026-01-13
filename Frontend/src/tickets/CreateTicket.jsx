import { useState } from "react";
import axios from "../api/axios";

const CreateTicket = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "/tickets/",
        { title, description, priority },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setPriority("LOW");

      // 🔥 IMPORTANT
      onCreated && onCreated();
    } catch (err) {
      console.error("Ticket creation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        Create New Ticket
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ticket title"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          rows="4"
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
