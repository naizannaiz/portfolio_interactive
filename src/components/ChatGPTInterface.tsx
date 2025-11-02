import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface ChatGPTInterfaceProps {
  initialPrompt?: string;
  response: string;
  onComplete?: () => void;
  className?: string;
  topic?: string; // Topic keyword for customized thinking messages
}

// Topic-specific thinking messages
const getThinkingMessages = (topic?: string): string[] => {
  const topicLower = topic?.toLowerCase() || '';
  
  // General mocking messages
  const generalMessages = [
    'Trying to pronounce "Naizan" correctly...',
    'Checking if Kerala is real or just a myth...',
    'Reviewing his LinkedIn to see if it matches...',
    'Asking myself: "Is he really that good or just good at describing?"',
  ];

  // Topic-specific messages
  if (topicLower.includes('who') || topicLower.includes('about') || topicLower.includes('what do you do') || topicLower.includes('interests')) {
    return [
      'Searching through Mohamed\'s internet history...',
      'Checking if he actually knows himself or just copies from bios...',
      'Googling "How to describe yourself without sounding pretentious"...',
      'Counting how many times he says "passionate" in his bio...',
      'Trying to figure out if he\'s human or AI-generated...',
      'Checking his Instagram to see if it matches his portfolio...',
      'Wondering if "AI Engineering Student" is code for "watches YouTube tutorials"...',
      'Asking Google: "Is Mohamed Naizan a real person or a LinkedIn bot?"',
      'Checking if his personality matches his GitHub commit messages...',
      'Wondering if "always curious" means "easily distracted"...',
      'Trying to figure out if "learning by doing" means "breaking things and Googling fixes"...',
      'Checking if his interests are real or just copied from trending tech topics...',
      'Wondering if he actually builds things or just watches build videos...',
      ...generalMessages,
    ];
  }

  if (topicLower.includes('education') || topicLower.includes('college')) {
    return [
      'Looking up "Jyothi Engineering College" on Google Maps...',
      'Verifying if 84.25% is actually good or just average...',
      'Checking if "AI Engineering" is a real major or he made it up...',
      'Wondering why his grades keep going down... 79.8% → 84.25% → ???',
      'Trying to find his college on Google Street View...',
      'Calculating how much money he\'s spent on tuition vs actual learning...',
      'Checking if Cheruthuruthy is even a real place...',
      'Wondering if he actually attended classes or just watched recorded lectures...',
      'Trying to figure out if "Bachelor\'s in AI" means he just watches AI videos...',
      'Checking if his college has WiFi or if he learned everything on mobile data...',
      'Wondering if he passed his exams or just ChatGPT-ed them...',
      'Trying to verify if he\'s actually studying or just maintaining his portfolio...',
      ...generalMessages,
    ];
  }

  if (topicLower.includes('experience') || topicLower.includes('intern') || topicLower.includes('data science') || topicLower.includes('python') || topicLower.includes('tata')) {
    return [
      'Verifying his internship stories aren\'t exaggerated...',
      'Checking if "2 months" is code for "2 weeks but sounds better"...',
      'Trying to find Genzee Technologies on Google... do they even exist?',
      'Wondering if he actually did work or just made coffee...',
      'Checking if PACE LAB is a real company or his friend\'s garage...',
      'Verifying he didn\'t just list "internship" on LinkedIn for clout...',
      'Trying to find evidence he wrote actual code, not just copied...',
      'Wondering if Tata Technologies knows he\'s using their name...',
      'Checking if his "projects" were just tutorials he renamed...',
      'Trying to figure out if "Data Science Intern" means he just looked at spreadsheets...',
      'Wondering if he actually used Python or just imported libraries someone else wrote...',
      'Checking if his internship certificate is real or Photoshop-ed...',
      'Trying to verify if he learned anything or just added lines to his resume...',
      'Wondering if "hands-on experience" means he copied code from tutorials...',
      'Checking if his supervisors would actually recommend him or just being polite...',
      ...generalMessages,
    ];
  }

  if (topicLower.includes('project') || topicLower.includes('iccca') || topicLower.includes('copygo') || topicLower.includes('karthavya') || topicLower.includes('print')) {
    return [
      'Checking if his projects actually work or just look good...',
      'Trying to access his live demos... do they even load?',
      'Wondering if he actually wrote the code or just the README...',
      'Checking if his GitHub commits are real or just "Initial commit" and "Final commit"...',
      'Trying to find bugs in his "production-ready" projects...',
      'Wondering if "fully responsive" means "looks okay on my laptop"...',
      'Checking if he tested his projects on actual users or just his mom...',
      'Trying to figure out how much of his code is from Stack Overflow...',
      'Wondering if his projects have any actual users or just him...',
      'Trying to figure out if "ICCCA 2026" is a real conference or he just made it up...',
      'Checking if CopyGo actually works or just crashes on first use...',
      'Wondering if his "AI Image Classifier" can actually tell AI from real or just guesses...',
      'Trying to verify if he deployed these or just screenshotted localhost...',
      'Checking if his "modern tech stack" means he used the latest tutorial...',
      'Wondering if his projects have been deployed or just sit in his GitHub...',
      'Trying to figure out if "fully functional" means "works once, then breaks"...',
      ...generalMessages,
    ];
  }

  if (topicLower.includes('contact') || topicLower.includes('email') || topicLower.includes('social')) {
    return [
      'Trying to email him... will he actually reply or just mark as read?',
      'Checking if his social media matches his portfolio personality...',
      'Wondering if he actually checks his email or just ignores it...',
      'Trying to figure out if his Instagram is real or just stock photos...',
      'Checking if his GitHub is active or just has 3 repos from 2023...',
      'Wondering if "always open to opportunities" means "desperate for job"...',
      'Trying to verify if his contact info is real or fake...',
      'Checking if he actually responds to DMs or just reads and never replies...',
      'Wondering if his LinkedIn posts are original or just reposts with emojis...',
      'Trying to figure out if "naizz.af" is his real handle or he just thought it sounded cool...',
      'Checking if he has notifications on or just lives in email chaos...',
      ...generalMessages,
    ];
  }

  // Skills-related messages
  if (topicLower.includes('skill')) {
    return [
      'Counting how many skills he listed... is he actually good at all of them?',
      'Wondering if "proficient" means "watched a tutorial once"...',
      'Checking if he can actually code in all those languages or just hello world...',
      'Trying to verify if his skills are real or just copied from job requirements...',
      'Wondering if he actually uses all those tools or just installed them once...',
      'Checking if his skill levels match his GitHub activity...',
      'Trying to figure out if "Advanced" means "intermediate but sounds better"...',
      ...generalMessages,
    ];
  }

  // Default messages
  return [
    'Searching through Mohamed\'s GitHub repos...',
    'Trying to remember if he finished that Python project...',
    'Checking if he actually knows all those skills he listed...',
    'Counting how many times he mentioned "AI" in his bio...',
    'Googling "What does an AI Engineer actually do?"',
    'Calculating the probability he actually uses all those tools...',
    'Searching for his actual code quality, not just the README...',
    'Wondering if he actually wrote all those projects himself...',
    'Checking if "AI Engineering Student" is even a real major...',
    'Trying to find evidence he\'s not just copying from tutorials...',
    'Calculating how much of his portfolio is ChatGPT-written...',
    'Wondering if he\'s ever written code without Stack Overflow...',
    ...generalMessages,
  ];
};

const ChatGPTInterface = ({ 
  initialPrompt = '', 
  response, 
  onComplete,
  className = '',
  topic = ''
}: ChatGPTInterfaceProps) => {
  const [prompt, setPrompt] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isTypingPrompt, setIsTypingPrompt] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');
  const [thinkingMessagesList, setThinkingMessagesList] = useState<string[]>([]);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseEndRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Get topic-specific thinking messages
  const thinkingMessages = getThinkingMessages(topic);

  useEffect(() => {
    if (initialPrompt && !hasStarted.current) {
      hasStarted.current = true;
      startTypingPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const startTypingPrompt = async (text: string) => {
    setIsTypingPrompt(true);
    setPrompt('');
    
    for (let i = 0; i <= text.length; i++) {
      setPrompt(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 40));
      if (i % 10 === 0) scrollToBottom();
    }
    
    setIsTypingPrompt(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    startThinking();
  };

  const startThinking = async () => {
    setIsThinking(true);
    setThinkingMessagesList([]);
    
    // Show 3-4 thinking messages in sequence
    const messageCount = 3 + Math.floor(Math.random() * 2); // 3 or 4 messages
    const usedMessages: string[] = [];
    
    for (let i = 0; i < messageCount; i++) {
      let message = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
      
      // Make sure we don't repeat messages
      let attempts = 0;
      while (usedMessages.includes(message) && attempts < 10) {
        message = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
        attempts++;
      }
      usedMessages.push(message);
      
      setThinkingMessage(message);
      setThinkingMessagesList([...usedMessages]);
      
      // Scroll to show thinking message
      await new Promise(resolve => setTimeout(resolve, 200));
      scrollToBottom();
      
      // Wait longer before next message
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    setIsThinking(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    startGeneratingResponse();
  };

  const startGeneratingResponse = async () => {
    setIsGeneratingResponse(true);
    setResponseText('');
    
    // Character-by-character for smooth, continuous typing like ChatGPT
    let currentIndex = 0;
    const totalLength = response.length;
    
    const typeCharacter = async () => {
      if (currentIndex < totalLength) {
        setResponseText(response.slice(0, currentIndex + 1));
        currentIndex++;
        
        // Scroll every few characters to keep content visible
        if (currentIndex % 10 === 0) {
          scrollToBottom();
        }
        
        // ChatGPT-like speed: faster, more continuous
        // Vary delay slightly for natural feel (15-30ms per character)
        const delay = 15 + Math.random() * 15;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Continue typing
        await typeCharacter();
      } else {
        setIsGeneratingResponse(false);
        
        // Final scroll
        setTimeout(() => {
          scrollToBottom();
        }, 200);
        
        if (onComplete) {
          setTimeout(onComplete, 300);
        }
      }
    };
    
    await typeCharacter();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseText || prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl ${className}`}>
      {/* ChatGPT Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">AI</span>
          </div>
          <span className="text-sm font-medium text-gray-300">ChatGPT</span>
        </div>
        {responseText && !isGeneratingResponse && (
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded hover:bg-gray-700 transition-colors"
            title="Copy"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div 
        ref={scrollContainerRef}
        className="h-[500px] overflow-y-auto bg-gray-900 scroll-smooth"
      >
        <div className="p-4 space-y-6">
          {/* User Prompt */}
          <AnimatePresence>
            {prompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 max-w-3xl"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                  <span className="text-xs font-semibold text-gray-300">U</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 text-gray-100 leading-relaxed">
                    {prompt}
                    {isTypingPrompt && (
                      <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse align-middle">|</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thinking Indicators - Show All Messages */}
          <AnimatePresence>
            {isThinking && thinkingMessagesList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 max-w-3xl"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <div className="flex-1 space-y-2">
                  {thinkingMessagesList.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3"
                    >
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 rounded-full bg-gray-500"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 rounded-full bg-gray-500"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 rounded-full bg-gray-500"
                          />
                        </div>
                        <span className="italic">{msg}</span>
                      </div>
                    </motion.div>
                  ))}
                  {/* Current thinking message if different */}
                  {thinkingMessage && !thinkingMessagesList.includes(thinkingMessage) && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3"
                    >
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 rounded-full bg-gray-500"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 rounded-full bg-gray-500"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 rounded-full bg-gray-500"
                          />
                        </div>
                        <span className="italic">{thinkingMessage}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Assistant Response */}
          <AnimatePresence>
            {(responseText || isGeneratingResponse) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 max-w-3xl"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 text-gray-100">
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed">
                        <span dangerouslySetInnerHTML={{ __html: formatMarkdown(responseText) }} />
                        {isGeneratingResponse && (
                          <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse align-middle">|</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={responseEndRef} />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

// Markdown formatter
const formatMarkdown = (text: string) => {
  if (!text) return '';
  
  // Escape HTML first
  let formatted = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Bold text **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  
  // Code blocks ```code```
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 p-3 rounded my-2 overflow-x-auto"><code class="text-sm text-gray-300">$1</code></pre>');
  
  // Inline code `code`
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-gray-900 px-1.5 py-0.5 rounded text-sm text-gray-300">$1</code>');
  
  // Headers
  formatted = formatted.replace(/^###\s(.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-100">$1</h3>');
  formatted = formatted.replace(/^##\s(.+)$/gm, '<h2 class="text-xl font-semibold mt-4 mb-2 text-gray-100">$1</h2>');
  
  // Bullet points - or •
  formatted = formatted.replace(/^[\-\•]\s(.+)$/gm, '<div class="flex items-start gap-2 my-1.5"><span class="text-gray-400 mt-1">•</span><span>$1</span></div>');
  
  // Numbered lists
  formatted = formatted.replace(/^\d+\.\s(.+)$/gm, '<div class="my-1.5">$&</div>');
  
  // Line breaks (preserve double newlines)
  formatted = formatted.replace(/\n\n/g, '<br/><br/>');
  formatted = formatted.replace(/\n/g, '<br/>');
  
  return formatted;
};

export default ChatGPTInterface;
