
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import CodeDisplay from '@/components/CodeDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { motion } from 'framer-motion';

const CodeGeneration = () => {
  const [initialPrompt, setInitialPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedPrompt = localStorage.getItem('userPrompt');
    if (!savedPrompt) {
      navigate('/');
      return;
    }
    
    setInitialPrompt(savedPrompt);
    generateCodeFromPrompt(savedPrompt);
  }, [navigate]);

  const generateCodeFromPrompt = async (promptText: string) => {
    setIsLoading(true);
    
    try {
      const payload = {
        "input_value": promptText,
        "output_type": "chat",
        "input_type": "chat",
        "session_id": "user_1"
      };
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AstraCS:wUMIrIgbCfaWNCKDJrUuQBDs:27c8c5e25823ad5e0f1a45eaf806243125a278417cd2b3726944c13069e3c059'
        },
        body: JSON.stringify(payload)
      };
      
      const response = await fetch(
        'https://api.langflow.astra.datastax.com/lf/adb64f11-3dfe-400f-89b1-1a84912bca1c/api/v1/run/59530d4d-f5d2-43aa-87b2-f096387a063e',
        options
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setGeneratedCode(data.output);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating code:", error);
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-4xl mx-auto w-full justify-center items-center">
        <div className="mb-6 flex items-center w-full">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Your Generated Code</h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex-1 flex flex-col"
        >
          <div className="bg-card p-4 rounded-lg shadow-sm border flex-1 flex flex-col mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Code Output</h2>
            </div>
            
            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <CodeDisplay code={generatedCode} />
              )}
            </div>
          </div>
          
          <div className="w-full">
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <p className="text-sm text-muted-foreground mb-2">Initial prompt:</p>
              <div className="bg-muted/50 rounded p-2 text-sm">
                {initialPrompt}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CodeGeneration;
