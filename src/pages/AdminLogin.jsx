import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0B0F19] to-black text-white px-4">

      {/* CARD */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500">

        {/* TITLE */}
        <h2 className="text-3xl font-playfair text-center mb-2 tracking-wide">
          Admin Access
        </h2>

        <p className="text-gray-400 text-center text-sm mb-8">
          Secure login to manage your clients
        </p>

        {/* INPUT */}
        <div className="relative mb-6">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg focus:outline-none focus:border-[#D4AF37] peer"
          />

          <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all 
            peer-placeholder-shown:top-3 
            peer-placeholder-shown:text-base 
            peer-focus:top-2 
            peer-focus:text-sm">
            Enter Password
          </label>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black py-3 rounded-xl font-semibold tracking-wide hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/40 transition-all duration-300"
        >
          Login
        </button>

        {/* FOOTER TEXT */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Authorized access only 
        </p>

      </div>

    </div>
  );
};

export default AdminLogin;