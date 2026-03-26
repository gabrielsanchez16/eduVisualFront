import { useState } from "react";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        login(data);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error en login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 relative overflow-hidden">

      {/* 🌟 Glow background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-blue-400 opacity-30 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-[360px] flex flex-col gap-5"
      >
        {/* Logo / Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">EduVisual</h1>
          <p className="text-sm text-white/70">
            IA para aprender con imágenes
          </p>
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-white/70" />
          <input
            type="email"
            placeholder="Correo"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-white/70" />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button className="bg-white text-purple-700 font-semibold py-2 rounded-lg hover:scale-105 transition-all duration-200 shadow-lg">
          Iniciar sesión
        </button>

        {/* Divider */}
        <div className="text-center text-white/60 text-sm">
          ¿No tienes cuenta?
        </div>

        {/* Switch to Register */}
        <Link
          to="/register"
          className="text-center text-white font-semibold hover:underline"
        >
          Crear cuenta 🚀
        </Link>
      </form>
    </div>
  );
}