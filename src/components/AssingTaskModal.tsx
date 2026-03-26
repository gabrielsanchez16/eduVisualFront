import { useEffect, useState } from "react";

export default function AssignTaskModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handler = (e: any) => {
      setContent(e.detail.content);
      setOpen(true);
    };

    window.addEventListener("openAssignTask", handler);
    return () => window.removeEventListener("openAssignTask", handler);
  }, []);

  const handleAssign = async () => {
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/chat/create-from-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        content
      })
    });

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
        
        <h2 className="text-lg font-bold">Asignar tarea</h2>

        <textarea
          value={content}
          readOnly
          className="w-full border p-2 rounded text-sm"
        />

        <div className="flex justify-end gap-2">
          <button onClick={() => setOpen(false)}>Cancelar</button>
          <button
            onClick={handleAssign}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Crear tarea
          </button>
        </div>
      </div>
    </div>
  );
}