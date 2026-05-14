import API from "../api";

export default function TaskList({ tasks = [], refresh }) {

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      if (refresh) {
        refresh();
      }

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });

      if (refresh) {
        refresh();
      }

    } catch (error) {
      console.log(error);
    }
  };

  // SAFETY CHECK
  if (!Array.isArray(tasks)) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="p-4 border rounded shadow bg-white"
          >
            <h3 className="font-bold text-lg">
              {task.title}
            </h3>

            <p className="text-gray-600">
              {task.description}
            </p>

            <p className="text-sm mt-2">
              Status:{" "}
              <span className="font-semibold">
                {task.status}
              </span>
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() =>
                  updateStatus(task._id, "todo")
                }
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Todo
              </button>

              <button
                onClick={() =>
                  updateStatus(task._id, "in-progress")
                }
                className="bg-yellow-200 px-3 py-1 rounded"
              >
                Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(task._id, "done")
                }
                className="bg-green-200 px-3 py-1 rounded"
              >
                Done
              </button>
            </div>

            <button
              onClick={() => handleDelete(task._id)}
              className="text-red-500 mt-3"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}