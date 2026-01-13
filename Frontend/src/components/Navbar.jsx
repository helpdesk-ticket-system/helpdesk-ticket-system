import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight">
          Helpdesk<span className="text-blue-500">Pro</span>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="text-slate-400 text-sm">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="bg-red-500/80 hover:bg-red-500 px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
