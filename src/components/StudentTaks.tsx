import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: number;
  task: {
    title: string;
    description: string;
    aiContent: string;
    teacherId: number;
  };
  completed?: boolean; // opcional, si quieres marcar si ya la hizo
}

export default function StudentTasks() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/tasks/my-tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudieron cargar tus tareas",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col h-full w-full p-4">
      <h2 className="text-lg font-bold mb-4">Mis tareas asignadas</h2>

      <div className="flex gap-4">
        {/* Lista de tareas */}
        <div className="w-1/3 max-h-[70vh] overflow-y-auto space-y-2 border p-2 rounded">
          {tasks.map(task => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="cursor-pointer p-2 rounded hover:bg-gray-100 bg-gray-50"
            >
              {task.task.title}
            </div>
          ))}
        </div>

        {/* Detalle de la tarea seleccionada */}
        <div className="flex-1 border p-4 rounded bg-white max-h-[70vh] overflow-y-auto">
          {selectedTask ? (
            <>
              <h3 className="text-md font-semibold mb-2">{selectedTask.task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedTask.task.description}</p>
              <div className="whitespace-pre-wrap text-gray-800">
                {selectedTask.task.aiContent}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Selecciona una tarea para ver su contenido</p>
          )}
        </div>
      </div>
    </div>
  );
}