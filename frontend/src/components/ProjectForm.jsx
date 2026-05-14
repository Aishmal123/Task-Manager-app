
import { useState } from "react";
import API from "../api";

export default function ProjectForm({ onProjectCreated }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!project.name || !project.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // API Call
      const res = await API.post("/projects", project);

      // Success Message
      alert("✅ Project created successfully!");

      console.log("Created Project:", res.data);

      // Clear form
      setProject({
        name: "",
        description: "",
      });

      // Notify parent component
      if (onProjectCreated) {
        onProjectCreated(res.data);
      }

    } catch (err) {
      console.error(err);

      alert(
        "❌ Error: " +
          (err.response?.data?.message || "Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-4"
    >
      <h2 className="text-xl font-bold mb-4">Add Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        className="w-full p-2 mb-2 border rounded"
        value={project.name}
        onChange={(e) =>
          setProject({ ...project, name: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded"
        value={project.description}
        onChange={(e) =>
          setProject({
            ...project,
            description: e.target.value,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}