import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketDetails, addComment } from "../api/tickets";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getTicketDetails(id).then((res) => setTicket(res.data));
  }, [id]);

  const submitComment = async () => {
    await addComment(id, { comment });
    setComment("");
    const res = await getTicketDetails(id);
    setTicket(res.data);
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>

      <h3>Comments</h3>
      {ticket.comments?.map((c, i) => (
        <p key={i}>• {c.comment}</p>
      ))}

      <textarea
        placeholder="Add comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitComment}>Add Comment</button>
    </div>
  );
};

export default TicketDetails;
