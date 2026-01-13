import { useEffect, useState } from "react";
import api from "../api/axios";

const TicketComments = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticketId) fetchComments();
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/tickets/${ticketId}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error("Fetch comments failed", err);
    }
  };

  const addComment = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      await api.post(`/tickets/${ticketId}/comments/`, {
        message,
      });
      setMessage("");
      fetchComments();
    } catch (err) {
      console.error("Add comment failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 bg-slate-800/50 p-3 rounded-lg">
      <h4 className="text-sm font-semibold mb-2">Comments</h4>

      <div className="space-y-1 text-sm mb-2">
        {comments.length === 0 && (
          <p className="text-slate-500">No comments yet</p>
        )}

        {comments.map((c) => (
          <p key={c.id}>
            <span className="text-blue-400">{c.user}:</span>{" "}
            {c.message}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add comment..."
          className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-sm"
        />
        <button
          onClick={addComment}
          disabled={loading}
          className="px-3 py-1 bg-blue-600 rounded text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TicketComments;
