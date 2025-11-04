
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Header />
      <main className="flex-1 container mx-auto max-w-5xl flex flex-col overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
