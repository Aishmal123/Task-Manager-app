import API from "../api.js";

export default function Logout() {
  const handleLogout = () => {
    // Optionally notify backend if you want to invalidate token
    // await API.post("/user/logout");  <-- only if you have a logout route

    // Clear token from localStorage
    localStorage.removeItem("token");

    // Redirect to login
    window.location = "/login";
  };

  return (
    <div className="btn">
      <button
        onClick={handleLogout}
        type="button"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
