
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  // Detect if we're in dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <div className="overflow-y-auto h-full rounded-md">
      {code ? (
        <SyntaxHighlighter
          language="kotlin"
          style={isDarkMode ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.5rem',
            height: '100%',
            fontSize: '0.9rem',
            backgroundColor: 'transparent',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Enter a prompt to generate code.
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;
