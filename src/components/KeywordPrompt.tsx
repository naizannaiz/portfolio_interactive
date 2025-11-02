import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface KeywordPromptProps {
  keyword: string;
  prompt: string;
  response: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

const KeywordPrompt = ({ 
  keyword, 
  prompt, 
  response, 
  onClick, 
  isActive = false,
  className = '' 
}: KeywordPromptProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-4 py-2 rounded-full border 
        ${isActive 
          ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
          : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
        }
        transition-all duration-300
        ${className}
      `}
    >
      <span className="flex items-center gap-2">
        {isActive && <Sparkles className="w-4 h-4 animate-pulse" />}
        {keyword}
      </span>
    </motion.button>
  );
};

export default KeywordPrompt;

