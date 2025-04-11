
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "Enter your prompt..."
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="min-h-24 resize-none rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm transition-all duration-300 hover:border-primary/30 bg-card/80 backdrop-blur-sm"
      />
    </motion.div>
  );
};

export default PromptInput;
