import { useState } from "react";
import API from "../api";

const priorityConfig = {
  high:   { label: "High",   bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200" },
  medium: { label: "Medium", bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200"},
  low:    { label: "Low",    bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
};

const statusConfig = {
  "todo":        { label: "To Do",       bg: "bg-slate-100",   text: "text-slate-600"   },
  "in-progress": { label: "In Progress", bg: "bg-amber-100",   text: "text-amber-700"    },
  "done":        { label: "Done",        bg: "bg-emerald-100", text: "text-emerald-700" },
};

export default function TaskList({ tasks = [], refresh }) {

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

const handleDelete = async (id) => {
  if (!confirm("Delete this task?")) return;
  try {
    await API.delete(`/tasks/${id}`);
    console.log("refresh type:", typeof refresh); 
    if (refresh) refresh();
  } catch (error) {
    console.log("DELETE ERROR:", error.response?.data);
  }
};

const updateStatus = async (id, status) => {
  try {
    await API.put(`/tasks/${id}`, { status });
    if (refresh) refresh();
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error.response?.data);
  }
};

const startEdit = (task) => {
  setEditingId(task._id);
  setEditForm({
    title: task.title,
    description: task.description || "",
    priority: task.priority || "medium",
    status: task.status,
    completed: task.completed || false,
  });
};

const handleUpdate = async (id) => {
  try {
    await API.put(`/tasks/${id}`, editForm);
    setEditingId(null);
    if (refresh) refresh();
  } catch (error) {
    console.log("UPDATE ERROR:", error.response?.data);
  }
};

  if (!Array.isArray(tasks)) return null;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {/* <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-4">📭</div> */}
        <p className="text-slate-500 font-semibold">No tasks here</p>
        <p className="text-sm text-slate-400 mt-1">Go to Dashboard to add a task</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => {
        const priority = priorityConfig[task.priority] || priorityConfig.medium;
        const status = statusConfig[task.status] || statusConfig["todo"];
        const isEditing = editingId === task._id;

        return (
          <div
            key={task._id}
            className={`bg-white border rounded-2xl p-4 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md ${
              task.completed ? "opacity-60" : ""
            } ${priority.border}`}
          >
            {isEditing ? (
              /* EDIT MODE */
              <div className="flex flex-col gap-3">
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 w-full"
                  placeholder="Task title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 w-full resize-none"
                  rows={2}
                  placeholder="Description"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={editForm.priority}
                    onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                    className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 outline-none bg-white cursor-pointer"
                  >
                    <option value="low"> Low</option>
                    <option value="medium">Medium</option>
                    <option value="high"> High</option>
                  </select>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 outline-none bg-white cursor-pointer"
                  >
                    <option value="todo"> To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done"> Done</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.completed}
                    onChange={(e) => setEditForm({ ...editForm, completed: e.target.checked })}
                    className="accent-indigo-600 w-3.5 h-3.5"
                  />
                  Mark as completed
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer border-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer border-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <>
                {/* TOP: title + action buttons */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-semibold text-slate-800 leading-snug flex-1 ${task.completed ? "line-through text-slate-400" : ""}`}>
                    {task.title}
                  </h3>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => startEdit(task)}
                      className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors bg-transparent border-none cursor-pointer text-sm"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors bg-transparent border-none cursor-pointer text-sm"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Description */}
                {task.description && (
                  <p className="text-xs text-slate-500 leading-relaxed">{task.description}</p>
                )}

                {/* Badges row */}
                <div className="flex flex-wrap gap-1.5">
                  {/* Priority badge */}
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${priority.bg} ${priority.text} ${priority.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                    {priority.label}
                  </span>

                  {/* Status badge */}
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                    {status.icon} {status.label}
                  </span>

                  {/* Completed badge */}
                  {task.completed && (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                      Completed
                    </span>
                  )}
                </div>

                {/* Due date */}
                {task.dueDate && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                     Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}

                {/* Status change buttons */}
                <div className="flex gap-1.5 pt-1 border-t border-slate-100">
                  {task.status !== "todo" && (
                    <button
                      onClick={() => updateStatus(task._id, "todo")}
                      className="flex-1 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg py-1.5 transition-colors bg-transparent cursor-pointer font-medium"
                    >
                       To Do
                    </button>
                  )}
                  {task.status !== "in-progress" && (
                    <button
                      onClick={() => updateStatus(task._id, "in-progress")}
                      className="flex-1 text-xs text-amber-600 hover:text-amber-700 border border-amber-200 hover:border-amber-300 rounded-lg py-1.5 transition-colors bg-transparent cursor-pointer font-medium"
                    >
                       Progress
                    </button>
                  )}
                  {task.status !== "done" && (
                    <button
                      onClick={() => updateStatus(task._id, "done")}
                      className="flex-1 text-xs text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-300 rounded-lg py-1.5 transition-colors bg-transparent cursor-pointer font-medium"
                    >
                       Done
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}