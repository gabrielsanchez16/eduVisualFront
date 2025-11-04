import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover-scale">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-elegant">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold gradient-text">EduVisual AI</h1>
            <p className="text-xs text-muted-foreground">Aprende con imágenes</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Button
            variant={isActive('/') ? 'default' : 'ghost'}
            asChild
            className="gap-2"
          >
            <Link to="/">
              <Sparkles className="w-4 h-4" />
              Chat IA
            </Link>
          </Button>
          <Button
            variant={isActive('/guia-prompts') ? 'default' : 'ghost'}
            asChild
            className="gap-2"
          >
            <Link to="/guia-prompts">
              <BookOpen className="w-4 h-4" />
              Guía de Prompts
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container flex flex-col gap-2 p-4">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              asChild
              className="w-full justify-start gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/">
                <Sparkles className="w-4 h-4" />
                Chat IA
              </Link>
            </Button>
            <Button
              variant={isActive('/guia-prompts') ? 'default' : 'ghost'}
              asChild
              className="w-full justify-start gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/guia-prompts">
                <BookOpen className="w-4 h-4" />
                Guía de Prompts
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
