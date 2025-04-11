
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

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
    <div className="w-full">
      <Textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="min-h-24 resize-none rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm transition-all duration-300 hover:border-primary/30"
      />
    </div>
  );
};

export default PromptInput;
