
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';
import HeroPromptInput from '@/components/HeroPromptInput';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSendPrompt = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of what you want to build.",
        variant: "destructive",
      });
      return;
    }
    
    // Store prompt in localStorage to pass between pages
    localStorage.setItem('userPrompt', prompt);
    
    // Navigate to the code generation page
    navigate('/code-generation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              App Genesis
            </h1>
            
            <div className="h-12 mb-8">
              <AnimatedText 
                text="Transform Your Ideas Into Production-Ready Code with AI" 
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground bg-clip-text text-transparent bg-gradient-to-r from-secondary-foreground to-primary/70" 
              />
            </div>
            
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Simply describe what you want to build, and our AI will generate the code for you.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <HeroPromptInput 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendPrompt();
                }
              }}
              examples={[
                "Build a login screen with email and password fields",
                "Create a chat interface with message bubbles",
                "Design a photo gallery with grid layout",
                "Make a to-do list with completion checkboxes"
              ]}
            />
            
            <div className="flex justify-center mt-6">
              <Button 
                onClick={handleSendPrompt} 
                size="lg" 
                className="gap-2 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-primary to-blue-500 hover:shadow-primary/20"
              >
                <Send className="h-5 w-5" />
                Generate Code
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Index;
