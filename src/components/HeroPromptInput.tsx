
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface HeroPromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  examples: string[];
}

const HeroPromptInput: React.FC<HeroPromptInputProps> = ({
  value,
  onChange,
  onKeyDown,
  examples
}) => {
  const handleExampleClick = (example: string) => {
    // Create a synthetic event to simulate user input
    const event = {
      target: { value: example }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    
    onChange(event);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Textarea
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Describe what you want to build..."
          className="min-h-32 p-4 text-base resize-none rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm"
        />
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              onClick={() => handleExampleClick(example)}
              className="text-sm px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
            >
              {example}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPromptInput;
