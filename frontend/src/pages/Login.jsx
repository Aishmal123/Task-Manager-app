import { useState , useEffect} from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/user/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("keepLoggedIn",JSON.stringify(true));
navigate("/dashboard", { replace: true });
    } catch (err) {
  console.log(err);
  setError("Login failed. Please check your email and password.");
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-zinc-300 rounded-2xl p-8">

        <div className="flex items-center gap-2 mb-8">
          <span className="text-blue-700 font-semibold tracking-tight">Task Manager</span>
        </div>

        <h1 className="text-2xl font-semibold text-blue-700 tracking-tight mb-1">Welcome back</h1>
        <p className="text-sm text-zinc-500 mb-6">Sign in to your workspace</p>

        {error && (
          <div className="bg-white border border-red-900 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Email</label>
            <input
              type="email"
              placeholder="Enter You Email"
              className="bg-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-black placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-black placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-violet-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in "}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-600 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}