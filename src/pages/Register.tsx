import { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate, Link } from "react-router-dom";
import { Role } from "../types/auth";
import { Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>("student");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
        role,
      });

      if (data.user) {
        alert("Usuario creado");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error en registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-600 to-indigo-500 relative overflow-hidden">

      {/* 🌟 Glow background */}
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-purple-400 opacity-30 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-[360px] flex flex-col gap-5"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">EduVisual</h1>
          <p className="text-sm text-white/70">
            Crea tu cuenta y comienza 🚀
          </p>
        </div>

        {/* Nombre */}
        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-white/70" />
          <input
            placeholder="Nombre"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

        {/* 🎯 Selector de rol PRO */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
              role === "student"
                ? "bg-white text-purple-700"
                : "bg-white/10 text-white border-white/20"
            }`}
          >
            🎓 Estudiante
          </button>

          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
              role === "teacher"
                ? "bg-white text-purple-700"
                : "bg-white/10 text-white border-white/20"
            }`}
          >
            👨‍🏫 Profesor
          </button>
        </div>

        {/* Button */}
        <button className="bg-white text-purple-700 font-semibold py-2 rounded-lg hover:scale-105 transition-all duration-200 shadow-lg">
          Crear cuenta
        </button>

        {/* Switch */}
        <div className="text-center text-white/60 text-sm">
          ¿Ya tienes cuenta?
        </div>

        <Link
          to="/login"
          className="text-center text-white font-semibold hover:underline"
        >
          Inicia sesión 🔐
        </Link>
      </form>
    </div>
  );
}