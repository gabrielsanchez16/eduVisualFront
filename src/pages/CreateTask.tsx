import { useState } from "react";

export default function CreateTask() {
  const [prompt, setPrompt] = useState("");
  const token = localStorage.getItem("token");

  const createTask = async () => {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: "Nueva tarea",
        prompt
      })
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear tarea con IA</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ej: crea una tarea sobre el sistema solar..."
        className="w-full border p-3 rounded mb-3"
      />

      <button
        onClick={createTask}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Generar tarea
      </button>
    </div>
  );
}