import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import AssignTaskModal from './AssingTaskModal';
interface Props {
  conversationId: number | null;
  setConversationId: (id: number) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

const ChatInterface = ({ conversationId, setConversationId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy EduVisual AI, tu asistente de aprendizaje. Puedo ayudarte a entender cualquier tema usando explicaciones claras e imágenes educativas. ¿Qué te gustaría aprender hoy?'
    }
  ]);
  const { token } = useAuth();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generateImage, setGenerateImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/chat`;

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          generateImage: generateImage,
          conversationId: conversationId // 🔥 clave
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast({
            title: "Límite excedido",
            description: "Por favor, espera un momento antes de enviar otro mensaje.",
            variant: "destructive"
          });
          return;
        }
        if (resp.status === 402) {
          toast({
            title: "Créditos insuficientes",
            description: "Contacta al administrador para agregar más créditos.",
            variant: "destructive"
          });
          return;
        }
        throw new Error('Error al conectar con el servicio');
      }

      // Check if response is streaming or JSON
      const contentType = resp.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        // Non-streaming response (when generating images)
        const data = await resp.json();
        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
        }
        const content = data.data.content;
        const images = data.data.imageUrl;


        setMessages(prev => [...prev, {
          role: 'assistant',
          content: content,
          imageUrl: images
        }]);
        return;
      }

      if (!resp.body) throw new Error('No se recibió respuesta del servidor');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;
      let assistantContent = '';
      let imageData: string | null = null;

      // Add placeholder for assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            // 🔥 guardar conversationId si viene
            if (parsed.conversationId && !conversationId) {
              setConversationId(parsed.conversationId);
            }
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantContent,
                  imageUrl: imageData || undefined
                };
                return newMessages;
              });
            }

            // Check for images in both delta and message
            const deltaImages = parsed.choices?.[0]?.delta?.images;
            const messageImages = parsed.choices?.[0]?.message?.images;
            const images = deltaImages || messageImages;

            if (images && images.length > 0) {
              imageData = images[0].image_url?.url || images[0].url;
              console.log('Imagen recibida:', imageData ? 'Sí' : 'No');
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantContent,
                  imageUrl: imageData || undefined
                };
                return newMessages;
              });
            }
          } catch (e) {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error en el chat:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
      // Remove the placeholder message if there was an error
      setMessages(prev => prev.slice(0, -1));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    await streamChat(userMessage);

    setIsLoading(false);
    setGenerateImage(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/chat/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, [conversationId]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          console.log("message:", message);
          return (
            <MessageBubble key={index} message={message} />
          )
        })}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">EduVisual AI está pensando...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant={generateImage ? "default" : "outline"}
            size="sm"
            onClick={() => setGenerateImage(!generateImage)}
            className="gap-2"
          >
            {generateImage ? <Sparkles className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
            {generateImage ? 'Generando imagen' : 'Generar imagen'}
          </Button>
        </div>

        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta aquí... (Presiona Enter para enviar)"
            className="min-h-[60px] max-h-[200px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="self-end"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          EduVisual AI puede cometer errores. Verifica la información importante.
        </p>
      </div>
      <AssignTaskModal />
    </div>
  );
};

export default ChatInterface;
