import { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/user/register", form);
      alert("Registered successfully! Please login.");
      window.location = "/login";
    } catch (err) {
  console.log(err);
  setError("Registration failed. password should be 8 character long.");
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white-900 border border-zinc-800 rounded-2xl p-8">

        <div className="flex items-center gap-2 mb-8">
          <span className="text-blue-800 text-1.5xl font-bold tracking-tight">Task Manager</span>
        </div>

        <h1 className="text-2xl font-semibold text-blue-800 tracking-tight mb-1">Create account</h1>
        <p className="text-sm text-zinc-500 mb-6">Start managing your tasks today</p>

        {error && (
          <div className="bg-white border border-red-900 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Full name</label>
            <input
              placeholder="Enter you name"
              className="bg-white-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-black placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="bg-white-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-black placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="bg-white-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-black placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account →"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 hover:text-blue-300 font-medium transition-colors">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}