import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Modern Helpdesk <span className="text-blue-500">Made Simple</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-400 text-lg mb-10"
        >
          Manage tickets, assign agents, track resolutions and deliver
          outstanding support — all from one powerful dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl transition"
          >
            Login
          </Link>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Ticket Management",
            desc: "Create, track and resolve tickets effortlessly.",
          },
          {
            title: "Role Based Access",
            desc: "User, Agent & Admin dashboards built-in.",
          },
          {
            title: "Real-time Updates",
            desc: "Instant status changes and workflow clarity.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
