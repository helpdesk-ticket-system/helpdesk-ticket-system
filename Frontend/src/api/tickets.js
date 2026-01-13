import api from "./axios";

// User
export const getUserTickets = () =>
  api.get("/tickets/");

export const createTicket = (data) =>
  api.post("/tickets/", data);
export const getTicketDetails = (id) =>
  api.get(`/tickets/${id}/`);

export const addComment = (id, data) =>
  api.post(`/tickets/${id}/comments/`, data);
// Agent
export const getAgentTickets = () =>
  api.get("/tickets/agent/");

export const updateTicketStatus = (id, data) =>
  api.put(`/tickets/agent/${id}/update/`, data);
// Admin
export const getAllTickets = () =>
  api.get("/tickets/admin-tickets/");

export const assignTicket = (id, data) =>
  api.put(`/tickets/admin-tickets/${id}/assign/`, data);

export const deleteTicket = (id) =>
  api.delete(`/tickets/admin-tickets/${id}/delete/`);
