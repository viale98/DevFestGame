
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  code: string;
  title: string;
  isCorrect?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  selectable?: boolean;
  showCorrectStatus?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  title,
  isCorrect,
  isSelected,
  onClick,
  selectable = true,
  showCorrectStatus = false,
}) => {
  return (
    <div 
      className={cn(
        'rounded-lg overflow-hidden transition-all duration-300 border-2',
        selectable && 'cursor-pointer hover:shadow-lg',
        isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-transparent',
        'glass-card my-3 transform hover:scale-[1.01] active:scale-[0.99]'
      )}
      onClick={selectable ? onClick : undefined}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/40 dark:bg-secondary/30 border-b border-border/50">
        <div className="font-medium">{title}</div>
        {showCorrectStatus && (
          <div className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium',
            isCorrect 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          )}>
            {isCorrect ? '✓ Corretto' : '✗ Errato'}
          </div>
        )}
      </div>
      <pre className="p-4 text-sm overflow-x-auto max-w-full bg-white/10 dark:bg-black/10">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
