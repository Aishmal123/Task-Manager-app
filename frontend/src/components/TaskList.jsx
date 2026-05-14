import API from "../api";

export default function TaskList({ tasks = [], refresh }) {

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    refresh(); // reload tasks
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    refresh();
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 border rounded shadow">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>

          <p className="text-sm">
            Status: {task.status}
          </p>

          <div className="flex gap-2 mt-2">
            <button onClick={() => updateStatus(task._id, "todo")}>
              Todo
            </button>

            <button onClick={() => updateStatus(task._id, "in-progress")}>
              Progress
            </button>

            <button onClick={() => updateStatus(task._id, "done")}>
              Done
            </button>
          </div>

          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}