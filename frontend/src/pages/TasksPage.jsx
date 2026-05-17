import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      console.log(res.data);
      setTasks(res.data?.tasks || []);
    } catch (error) {
      console.log(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tasks=async ()=>{
    await fetchTasks();
    }
    tasks();
  }, []);

  const filtered = filter === "all" ? tasks : tasks.filter(t => t.status === filter);

  const tabs = [
    { key: "all",         label: "All",         count: tasks.length },
    { key: "todo",        label: "To Do",       count: tasks.filter(t => t.status === "todo").length },
    { key: "in-progress", label: "In Progress", count: tasks.filter(t => t.status === "in-progress").length },
    { key: "done",        label: "Done",        count: tasks.filter(t => t.status === "done").length },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

    

      <main className="max-w-5xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">All Tasks</h1>
            <p className="text-sm text-slate-500">
              {loading ? "Loading..." : `${tasks.length} task${tasks.length !== 1 ? "s" : ""} total`}
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer border-none"
          >
            Add Task
          </button>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-0">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer bg-transparent -mb-px ${
                filter === key
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                filter === key ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-slate-400 animate-pulse">Loading tasks...</p>
          </div>
        ) : (
         <TaskList tasks={filtered} refresh={fetchTasks} />
        )}
      </main>
    </div>
  );
}