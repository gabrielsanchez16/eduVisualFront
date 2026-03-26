import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Index from "./pages/Index";
import PromptsGuide from "./pages/PromptsGuide";
import NotFound from "./pages/NotFound";

// 👇 agrega estos
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from './routes/PublicRoutes';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* 🌐 Públicas */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* 🔐 Protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />

          <Route
            path="/guia-prompts"
            element={
              <ProtectedRoute>
                <PromptsGuide />
              </ProtectedRoute>
            }
          />

          {/* 👨‍🏫 SOLO PROFESOR (ejemplo futuro) */}
          {/*
          <Route
            path="/crear-tarea"
            element={
              <ProtectedRoute role="teacher">
                <CreateTask />
              </ProtectedRoute>
            }
          />
          */}

          {/* 👨‍🎓 SOLO ESTUDIANTE */}
          {/*
          <Route
            path="/mis-tareas"
            element={
              <ProtectedRoute role="student">
                <MyTasks />
              </ProtectedRoute>
            }
          />
          */}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;