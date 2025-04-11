
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';
import CodeDisplay from '@/components/CodeDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { motion } from 'framer-motion';

const CodeGeneration = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Retrieve the prompt from localStorage that was set on the Index page
    const savedPrompt = localStorage.getItem('userPrompt');
    if (!savedPrompt) {
      navigate('/');
      return;
    }
    
    // Generate code based on the initial prompt
    generateCodeFromPrompt(savedPrompt);
  }, [navigate]);

  const generateCodeFromPrompt = async (promptText: string) => {
    setIsLoading(true);
    
    try {
      const apiToken = 'AstraCS:ACvcdnFRtBwWkSODRFBURezr:089802244296cd7eaeb2f3ccfc5ba6e9e02f5d5bd631047dde653dea398facae';
      const langflowId = 'adb64f11-3dfe-400f-89b1-1a84912bca1c';
      const flowId = '59530d4d-f5d2-43aa-87b2-f096387a063e';
      
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
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify(payload)
      };
      
      const response = await fetch(
        `https://api.langflow.astra.datastax.com/lf/${langflowId}/api/v1/run/${flowId}`,
        options
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Assuming the response contains an output field
      if (data.output) {
        setGeneratedCode(data.output);
      } else {
        setGeneratedCode('No code was generated. Please try a different prompt.');
        toast({
          title: "Warning",
          description: "The API response didn't contain the expected data format.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating code:", error);
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
      setGeneratedCode('Failed to generate code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Generated Code</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="gap-1"
            >
              New Prompt
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCopyCode}
              disabled={!generatedCode || isLoading}
              className="gap-1"
            >
              <Copy className="h-4 w-4" />
              Copy Code
            </Button>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col"
        >
          <div className="bg-card p-4 rounded-lg shadow-sm border flex-1 flex flex-col">
            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <CodeDisplay code={generatedCode} />
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CodeGeneration;
