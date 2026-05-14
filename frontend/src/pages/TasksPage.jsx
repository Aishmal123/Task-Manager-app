import { useEffect, useState } from "react";
import API from "../api";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");

        console.log(res.data);

        setTasks(res.data?.tasks || []);
      } catch (error) {
        console.log(error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <TaskList tasks={tasks} />
    </div>
  );
}