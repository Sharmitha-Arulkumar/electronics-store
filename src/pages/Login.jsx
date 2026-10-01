import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [validation, setValidation] = useState({});

  const processForm = (e) => {
    e.preventDefault();
    let faults = {};

    // 1. Email validation
    if (!fields.email) {
      faults.email = "Account identification email required.";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      faults.email = "Structured format error.";
    }

    // 2. Password validation
    if (!fields.password) {
      faults.password = "Credential lock code required.";
    } else if (fields.password.length < 6) {
      faults.password = "Password must be at least 6 characters.";
    }

    setValidation(faults);

    // 3. Submit if no errors
    if (Object.keys(faults).length === 0) {
      toast.success("Access Granted! Welcome back.");
      navigate("/"); // Redirects to homepage on success
    } else {
      toast.error("Please resolve the errors below.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-xs"
      >
        <h2 className="text-2xl font-black text-center mb-6 uppercase tracking-tight">
          Access Account
        </h2>

        <form onSubmit={processForm} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={fields.email}
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-red-500 text-sm font-medium transition"
            />
            {validation.email && (
              <p className="text-red-500 text-xs font-bold mt-1">
                {validation.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={fields.password}
              onChange={(e) =>
                setFields({ ...fields, password: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-red-500 text-sm font-medium transition"
            />
            {validation.password && (
              <p className="text-red-500 text-xs font-bold mt-1">
                {validation.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider mt-2 cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-100 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs font-medium text-slate-500 mt-6">
          New to VOLT?{" "}
          <Link to="/signup" className="text-red-500 font-bold underline">
            Register Matrix
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
