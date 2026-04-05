import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>

      <input
        placeholder="Username"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-4 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Login
      </button>
    </div>
  );
};

export default AdminLogin;