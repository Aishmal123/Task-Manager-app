import { useEffect, useState } from "react";
import API from "../api";

import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // FETCH TASKS
  const fetchTasks = async () => {
    try {

      const res = await API.get("/tasks");

      console.log("TASK RESPONSE:", res.data);

      // IMPORTANT
      setTasks(res.data.tasks || []);

    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  // LOAD TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  // PROJECT CALLBACK
  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* PROJECT FORM */}
      <ProjectForm
        onProjectCreated={handleProjectCreated}
      />

      {/* TASK FORM */}
      <TaskForm refresh={fetchTasks} />

      {/* TASK LIST */}
      <div className="mt-6">
        <TaskList
          tasks={tasks}
          refresh={fetchTasks}
        />
      </div>

    </div>
  );
}