import { useEffect, useState } from "react";

interface Student {
  id: number;
  student: {
    name: string;
    email: string;
  };
}

interface Task {
  id: number;
  title: string;
  createdAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function StudentsModal({ open, onClose }: Props) {
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = localStorage.getItem("token");

  // 🔹 Traer estudiantes asignados
  const fetchStudents = async () => {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/users/students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setStudents(data);
  };

  // 🔹 Traer tareas creadas por el profesor
  const fetchTasks = async () => {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/tasks/my-tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data);
  };

  // 🔹 Agregar estudiante
  const addStudent = async () => {
    if (!studentId.trim()) return;

    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/users/add-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ studentId })
    });

    setStudentId("");
    fetchStudents();
  };

  useEffect(() => {
    if (open) {
      fetchStudents();
      fetchTasks();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-6 max-h-[80vh] overflow-y-auto">
        <h2 className="font-bold text-lg">Mis estudiantes</h2>

        {/* agregar estudiante */}
        <div className="flex gap-2">
          <input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="ID estudiante"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={addStudent}
            className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 transition"
          >
            +
          </button>
        </div>

        {/* lista de estudiantes */}
        <div className="max-h-40 overflow-y-auto space-y-2 border-t border-gray-200 pt-2">
          {students.map((s) => (
            <div key={s.id} className="p-2 bg-gray-100 rounded flex justify-between items-center">
              <span>{s.student.name} ({s.student.email})</span>
            </div>
          ))}
          {students.length === 0 && (
            <p className="text-sm text-gray-400">No tienes estudiantes agregados.</p>
          )}
        </div>

        {/* lista de tareas */}
        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Mis tareas creadas</h2>
          <div className="max-h-40 overflow-y-auto space-y-2 border-t border-gray-200 pt-2">
            {tasks.map((t) => (
              <div key={t.id} className="p-2 bg-blue-100 rounded flex justify-between items-center">
                <span>{t.title}</span>
                <span className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-sm text-gray-400">Aún no has creado tareas.</p>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 rounded px-3 py-2 hover:bg-gray-300 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}