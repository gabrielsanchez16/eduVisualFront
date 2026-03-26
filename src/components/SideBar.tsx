import { useEffect, useState } from "react";
import { Plus, Trash2, MessageSquare, X } from "lucide-react";

interface Conversation {
  id: number;
  title: string;
}

interface Props {
  onSelect: (id: number) => void;
  onNew: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ onSelect, onNew, isOpen, onClose }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const token = localStorage.getItem("token");

  const fetchConversations = async () => {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/chat/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setConversations(data);
  };

  const deleteConversation = async (id: number) => {
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/chat/conversations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (activeId === id) setActiveId(null);
    fetchConversations();
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      {/* 🔥 Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-72 bg-white border-r z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg text-gray-700">Chats</h2>

          {/* cerrar mobile */}
          <button onClick={onClose} className="md:hidden">
            <X />
          </button>
        </div>

        {/* Nuevo */}
        <div className="p-3">
          <button
            onClick={() => {
              setActiveId(null);
              onNew();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
          >
            <Plus size={16} />
            Nuevo chat
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition
                ${activeId === conv.id ? "bg-purple-100" : "hover:bg-gray-100"}
              `}
            >
              <div
                onClick={() => {
                  setActiveId(conv.id);
                  onSelect(conv.id);
                  onClose(); // 🔥 cerrar en mobile
                }}
                className="flex items-center gap-2 text-gray-700 truncate"
              >
                <MessageSquare size={16} />
                <span className="truncate text-sm">
                  {conv.title || "Nuevo chat"}
                </span>
              </div>

              <button
                onClick={() => deleteConversation(conv.id)}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}