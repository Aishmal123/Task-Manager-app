import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

  return (
    <header className="bg-white border-b border-slate-200 px-6 flex items-center justify-between h-14 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold text-blue-800 tracking-tight">Task Manager</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer border-none"
        >
           View Tasks
          {/* {tasks.length > 0 && (
            <span className="bg-white text-indigo-600 text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">
              {tasks.length}
            </span> 'tasks = [],'
          )} */}
        </button>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-2 transition-colors bg-transparent cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Navbar;