import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/SideBar.tsx";
import StudentsModal from "./TeacherStudent";
import StudentTasks from "../components/StudentTaks"; // tu componente de tareas

const Index = () => {
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalStudentsOpen, setModalStudentsOpen] = useState(false);
  const [showTasks, setShowTasks] = useState(false); // nueva variable

  const handleNewChat = () => {
    setConversationId(null);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onSelect={(id) => setConversationId(id)}
        onNew={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onModalClick={() => setModalStudentsOpen(true)}
          onTasksClick={() => setShowTasks((prev) => !prev)} // boton para alternar tareas
        />

        {/* Contenido principal */}
        <main className="flex-1 flex overflow-hidden p-4">
          {showTasks ? (
            <StudentTasks /> // renderizamos tareas
          ) : (
            <ChatInterface
              key={reloadKey}
              conversationId={conversationId}
              setConversationId={setConversationId}
            />
          )}
        </main>
      </div>

      <StudentsModal
        open={modalStudentsOpen}
        onClose={() => setModalStudentsOpen(false)}
      />
    </div>
  );
};

export default Index;