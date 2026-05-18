import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar.jsx";

import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      console.log("TASK RESPONSE:", res.data);
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
  const loadTasks = async () => {
    await fetchTasks();
  };

  loadTasks();
}, []);

 
  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

 

  const todoCount = tasks.filter(t => t.status === "todo").length;
  const inProgressCount = tasks.filter(t => t.status === "in-progress").length;
  const doneCount = tasks.filter(t => t.status === "done").length;

  return (
    <div className="min-h-screen bg-slate-50">

      
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">

        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your projects and tasks</p>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "To Do",       value: todoCount,       bg: "bg-slate-100",   text: "text-slate-700",   num: "text-slate-800" },
            { label: "In Progress", value: inProgressCount, bg: "bg-amber-50",    text: "text-amber-600",   num: "text-amber-700" },
            { label: "Done",        value: doneCount,       bg: "bg-emerald-50",  text: "text-emerald-600", num: "text-emerald-700" },
            { label: "Total Tasks", value: tasks.length,    bg: "bg-indigo-50",   text: "text-indigo-600",  num: "text-indigo-700" },
          ].map(({ label, value, bg, text, num }) => (
            <div key={label} className={`${bg} rounded-xl flex-wrap px-5 py-4 border border-white shadow-sm`}>
              <p className={`text-2xl font-bold  ${num}`}>{value}</p>
              <p className={`text-[10pxl] font-bold uppercase tracking-wide mt-1 ${text}`}>{label}</p>
            </div>
          ))}
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-bold text-slate-800">Projects</h2>
            </div>
            <ProjectForm onProjectCreated={handleProjectCreated} />

           
            {projects.length > 0 && (
              <div className="mt-4 space-y-2">
                {projects.map((p) => (
                  <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">

                    <div>
                      <p className="text-sm font-semibold text-slate-700">{p.project?.name || p.name}</p>
                      <p className="text-xs text-slate-400">{p.project?.description || p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

         
          <div>
            <div className="flex items-center gap-2 mb-4">
              
              <h2 className="text-base font-bold text-slate-800">Add Task</h2>
            </div>
            {loading ? "tasks..." : " "}
            <TaskForm refresh={fetchTasks} />
          </div>

        </div>
      </main>
    </div>
  );
}