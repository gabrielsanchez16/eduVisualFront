import React from 'react';
import { Bot, ClipboardPlus, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const { user } = useAuth(); // 🔥 NUEVO

  const handleAssign = () => {
    window.dispatchEvent(
      new CustomEvent("openAssignTask", {
        detail: {
          content: message.content
        }
      })
    );
  };

  return (
    <div
      className={cn(
        'flex gap-3 animate-fade-in group',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-gradient-to-br from-secondary to-accent text-white'
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex flex-col gap-2 max-w-[80%] md:max-w-[70%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-soft relative',
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-sm'
              : 'bg-card text-card-foreground rounded-tl-sm border border-border'
          )}
        >
           {/* 🔥 BOTÓN FLOTANTE */}
        {user?.role === "teacher" && message.role !== "user" && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
            <Button
              size="sm"
              variant="secondary"
              className="shadow-md flex items-center gap-1"
              onClick={handleAssign}
            >
              <ClipboardPlus className="w-3 h-3" />
              Tarea
            </Button>
          </div>
        )}
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Image Display */}
        {message.imageUrl && (
          <div className="rounded-lg overflow-hidden shadow-elegant border border-border max-w-md animate-scale-in">
            <img
              src={message.imageUrl}
              alt="Imagen generada por IA"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
