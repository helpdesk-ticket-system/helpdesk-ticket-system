import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/accounts/register/", form);
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Create account</h2>
        <p className="text-slate-400 mb-6">
          Start using HelpdeskPro today
        </p>

        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
