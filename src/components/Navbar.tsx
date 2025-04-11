
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Check for preferred color scheme
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (isDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="size-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold">
              AG
            </div>
          </motion.div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            App Genesis
          </span>
        </Link>
        
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
