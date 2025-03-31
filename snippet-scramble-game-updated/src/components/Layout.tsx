import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  timer?: number;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  timer,
  className 
}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-full flex flex-col bg-background">
      <header className="border-b border-border/50 shadow-sm bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="font-medium">Debug Game</div>
          
          {timer !== undefined && (
              <div className="mt-6 flex items-center">
              <div className="mt-2">
            <div className={cn(
              "px-3 py-1.5 rounded-full font-mono font-medium text-sm", 
              timer <= 30 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : 
              "bg-primary/10 text-primary-foreground/90 dark:bg-primary/20 dark:text-primary-foreground"
            )}>
              {formatTime(timer)}</div></div>
            </div>
          )}
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      
      <main className={cn("flex-1 container py-8", className)}>
        {(title || subtitle) && (
          <div className="mb-8 text-center animate-fade-in">
            {title && <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>}
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        
        {children}
      </main>
      
      <footer className="border-t border-border/50 py-4 bg-background/80 backdrop-blur-md">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Debug Game Challenge
        </div>
      </footer>
    </div>
  );
};

export default Layout;