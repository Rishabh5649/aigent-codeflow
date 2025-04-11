
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy, ArrowLeft } from 'lucide-react';
import CodeDisplay from '@/components/CodeDisplay';
import PromptInput from '@/components/PromptInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { motion } from 'framer-motion';

interface ApiResponse {
  output: string;
  error?: string;
}

const CodeGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [initialPrompt, setInitialPrompt] = useState('');
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
    
    setInitialPrompt(savedPrompt);
    // Generate code based on the initial prompt
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
      
      // For demo purposes, we'll simulate the API response
      // In a real implementation, you would uncomment the actual fetch call
      /*
      const response = await fetch(
        'https://api.langflow.astra.datastax.com/lf/adb64f11-3dfe-400f-89b1-1a84912bca1c/api/v1/run/59530d4d-f5d2-43aa-87b2-f096387a063e',
        options
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setGeneratedCode(data.output);
      */
      
      // Simulate API response for demo
      setTimeout(() => {
        const simulatedResponse = `
// Generated code based on prompt: "${promptText}"

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                AppScreen()
            }
        }
    }
}

@Composable
fun AppScreen() {
    var text by remember { mutableStateOf("") }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Welcome to Your App",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        TextField(
            value = text,
            onValueChange = { text = it },
            label = { Text("Enter your text") },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Button(
            onClick = { /* Handle button click */ },
            modifier = Modifier.align(Alignment.End)
        ) {
            Text("Submit")
        }
    }
}

@Preview
@Composable
fun PreviewAppScreen() {
    MaterialTheme {
        AppScreen()
    }
}`;
        setGeneratedCode(simulatedResponse);
        setIsLoading(false);
      }, 1500);
      
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

  const handleSendPrompt = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of what you want to build.",
        variant: "destructive",
      });
      return;
    }
    
    generateCodeFromPrompt(prompt);
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
      
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="mb-6 flex items-center">
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
          className="flex-1 flex flex-col"
        >
          <div className="bg-card p-4 rounded-lg shadow-sm border flex-1 flex flex-col mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Code Output</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyCode}
                disabled={!generatedCode || isLoading}
                className="gap-1"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
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
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Initial prompt:</p>
                <div className="bg-muted/50 rounded p-2 text-sm">
                  {initialPrompt}
                </div>
              </div>
              
              <PromptInput 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendPrompt();
                  }
                }}
                placeholder="Refine your code by adding more details..."
              />
              
              <Button 
                onClick={handleSendPrompt} 
                disabled={isLoading}
                className="w-full mt-4 gap-2"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : null}
                {isLoading ? "Generating..." : "Refine Code"}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CodeGeneration;
