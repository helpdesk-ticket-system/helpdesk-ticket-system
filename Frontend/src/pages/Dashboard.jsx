import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import UserDashboard from "./UserDashboard";
import AgentDashboard from "./AgentDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user, loading } = useAuth();

  // 🔥 1. WAIT for auth to finish
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  // 🔥 2. If NOT logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 3. Role-based routing (SAFE)
  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "AGENT":
      return <AgentDashboard />;

    case "USER":
      return <UserDashboard />;

    default:
      return (
        <div className="min-h-screen flex items-center justify-center text-red-400">
          Invalid user role
        </div>
      );
  }
};

export default Dashboard;
