import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import { on } from "events";

interface Props {
  onMenuClick?: () => void;
  onModalClick?: () => void;
  onTasksClick?: () => void;
}

const Header = ({ onMenuClick, onModalClick, onTasksClick }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">

        {/* 🔷 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" className="w-40" alt="logo" />
        </Link>

        {/* 🔥 Desktop (NAV + USER) */}
        <div className="hidden md:flex items-center gap-6">

          {/* NAV */}
          <nav className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/">
                <Sparkles className="w-4 h-4" />
                Chat IA
              </Link>
            </Button>

            <Button
              variant={isActive("/guia-prompts") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/guia-prompts">
                <BookOpen className="w-4 h-4" />
                Guía de Prompts
              </Link>
            </Button>
            {user?.role === "teacher" && (
              <Button
                variant={isActive("/crear-tarea") ? "default" : "ghost"}
                asChild
                className="gap-2"
                onClick={onModalClick}
              >
                <Link to="#">Estudiantes</Link>
              </Button>
            )}
            {user?.role === "student" && (
              <Button
                variant={isActive("/mis-tareas") ? "default" : "ghost"}
                asChild
                className="gap-2"
                onClick={onTasksClick}
              >
                <Link to="#">Mis tareas</Link>
              </Button>
            )}
          </nav>

          {/* 👤 USER */}
          {user && (
            <div className="flex items-center gap-3 border-l pl-4">

              {/* Avatar simple */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="text-left leading-tight">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.role === "teacher"
                    ? "👨‍🏫 Profesor"
                    : "🎓 Estudiante"}
                </p>
                <p className="text-xs text-muted-foreground">
                  id:{user.id}
                </p>
              </div>

              {/* Logout */}
              <Button
                variant="destructive"
                size="sm"
                onClick={logout}
              >
                Salir
              </Button>
            </div>
          )}
        </div>

        {/* 📱 Mobile button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* 📱 Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top">

          <nav className="container flex flex-col gap-2 p-4">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
              className="justify-start gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/">
                <Sparkles className="w-4 h-4" />
                Chat IA
              </Link>
            </Button>

            <Button
              variant={isActive("/guia-prompts") ? "default" : "ghost"}
              asChild
              className="justify-start gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/guia-prompts">
                <BookOpen className="w-4 h-4" />
                Guía de Prompts
              </Link>

            </Button>
            <Button
              variant={isActive("/conversaciones") ? "default" : "ghost"}
              asChild
              className="justify-start flex gap-2"
              onClick={() => {
                onMenuClick()
                setIsMenuOpen(false)
              }}
            >
              <Link to="#">
                <BookOpen className="w-4 h-4" />
                Conversaciones
              </Link>


            </Button>
            {user?.role === "teacher" && (
              <Button
                variant={isActive("/crear-tarea") ? "default" : "ghost"}
                asChild
                className="justify-start gap-2"
                onClick={() => onModalClick()}
              >
                <Link to="#">Estudiantes</Link>
              </Button>
            )}
            {user?.role === "student" && (
              <Button
                variant={isActive("/mis-tareas") ? "default" : "ghost"}
                asChild
                className="gap-2"
                onClick={onTasksClick}
              >
                <Link to="#">Mis tareas</Link>
              </Button>
            )}
          </nav>

          {/* 👤 USER MOBILE */}
          {user && (
            <div className="border-t p-4 flex flex-col gap-3">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.role === "teacher"
                      ? "👨‍🏫 Profesor"
                      : "🎓 Estudiante"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    id:{user.id}
                  </p>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                Cerrar sesión
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;