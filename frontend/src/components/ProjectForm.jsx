import { useState } from "react";
import API from "../api";

export default function ProjectForm({ onProjectCreated }) {
  const [project, setProject] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!project.name || !project.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/projects", project);
      alert("Project created successfully!");
      console.log("Created Project:", res.data);
      setProject({ name: "", description: "" });
      if (onProjectCreated) onProjectCreated(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Project Name</label>
          <input
            type="text"
            placeholder="Enter your project name here"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</label>
          <input
            type="text"
            placeholder=" Add your Project"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}