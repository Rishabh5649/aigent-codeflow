
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  // Detect if we're in dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-y-auto h-full rounded-md"
    >
      {code ? (
        <SyntaxHighlighter
          language="kotlin"
          style={isDarkMode ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.75rem',
            height: '100%',
            fontSize: '0.9rem',
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(240, 240, 250, 0.5)',
            boxShadow: isDarkMode ? 'inset 0 0 10px rgba(0, 0, 0, 0.2)' : 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground bg-background/50 rounded-lg p-6 border-2 border-dashed">
          Enter a prompt to generate code.
        </div>
      )}
    </motion.div>
  );
};

export default CodeDisplay;
