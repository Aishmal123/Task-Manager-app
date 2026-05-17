import { useState } from "react";
import API from "../api";

export default function TaskForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    completed: false,
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      setLoading(true);
      await API.post("/tasks", form);
      setForm({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        completed: false,
        dueDate: "",
      });
      if (refresh) refresh(); // reload task list
    } catch (error) {
      console.log("CREATE TASK ERROR:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const priorityColors = {
    low:    "bg-emerald-100 text-emerald-700 border-emerald-300",
    medium: "bg-amber-100 text-amber-700 border-amber-300",
    high:   "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Task Title *</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</label>
          <textarea
            placeholder="Add more details..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
            rows={3}
          />
        </div>

        {/* Priority + Status row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white cursor-pointer"
            >
              <option value="low"> Low</option>
              <option value="medium"> Medium</option>
              <option value="high"> High</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white cursor-pointer"
            >
              <option value="todo"> To Do</option>
              <option value="in-progress"> In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Due Date</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white cursor-pointer"
          />
        </div>

        {/* Completed toggle */}
        <div className="flex items-center gap-3 py-1">
          <input
            type="checkbox"
            id="completed"
            checked={form.completed}
            onChange={(e) => setForm({ ...form, completed: e.target.checked })}
            className="w-4 h-4 accent-indigo-600 cursor-pointer"
          />
          <label htmlFor="completed" className="text-sm text-slate-600 cursor-pointer font-medium">
            Mark as completed
          </label>
        </div>

        {/* Priority preview badge */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Priority:</span>
          <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${priorityColors[form.priority]}`}>
            {form.priority.charAt(0).toUpperCase() + form.priority.slice(1)}
          </span>
          {form.completed && (
            <span className="px-2 py-0.5 rounded-full border bg-indigo-100 text-indigo-700 border-indigo-300 text-xs font-semibold">
              Completed 
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Adding task..." : " Add Task"}
        </button>
      </form>
    </div>
  );
}