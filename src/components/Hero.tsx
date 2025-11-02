import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Code } from 'lucide-react';
import ChatGPTInterface from './ChatGPTInterface';
import KeywordPrompt from './KeywordPrompt';
import GitHubIDCard from './GitHubIDCard';

const Hero = () => {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const chatKey = useRef(0);
  const autoCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const keywords = [
    {
      keyword: 'Who are you?',
      prompt: 'Tell me about Mohamed Naizan',
      response: `I'm Mohamed Naizan, an AI Engineering student currently pursuing my Bachelor's degree at Jyothi Engineering College.

I'm passionate about learning and building with AI, machine learning, and web technologies. I enjoy working on projects that solve real problems and I'm always curious about exploring new technologies.

Currently, I'm diving deep into:
• Machine learning and data science
• Web development with React and modern frameworks
• Building intelligent systems

I believe in learning by doing, so I spend a lot of time on projects and experiments.`
    },
    {
      keyword: 'What do you do?',
      prompt: 'What projects and technologies does Mohamed work on?',
      response: `I work on a variety of projects spanning AI, web development, and data science:

**Web Development:**
• Built conference websites with registration systems
• Created clipboard management tools
• Developed responsive web applications

**AI & Machine Learning:**
• Image classification projects
• Data analysis and visualization
• Machine learning model development

**Technologies I use:**
• Python, JavaScript, TypeScript
• React, Node.js, Django
• Pandas, NumPy, scikit-learn
• Various databases and cloud services

I'm always exploring new technologies and working on projects that interest me.`
    },
    {
      keyword: 'Contact info',
      prompt: 'How can I contact Mohamed Naizan?',
      response: `You can reach me through:

**Email:** naizan9846@gmail.com

**Social Media:**
• GitHub: github.com/naizannaiz
• LinkedIn: linkedin.com/in/mohamednaizan
• Instagram: @naizz.af

**Location:** Kerala, India

Feel free to reach out if you'd like to collaborate on a project or just want to chat about technology!`
    }
  ];

  const handleKeywordClick = (keywordData: typeof keywords[0]) => {
    // Clear any existing timeout
    if (autoCloseTimeout.current) {
      clearTimeout(autoCloseTimeout.current);
    }
    
    // Reset chat when new keyword is clicked
    setShowChat(false);
    chatKey.current += 1;
    setTimeout(() => {
      setActivePrompt(keywordData.prompt);
      setShowChat(true);
    }, 100);
  };

  // Auto-close chat when user scrolls away from section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !showChat) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      // If section is not visible or user scrolled to another section
      if (!isInView) {
        // Clear existing timeout
        if (autoCloseTimeout.current) {
          clearTimeout(autoCloseTimeout.current);
        }
        
        // Close after 5 seconds
        autoCloseTimeout.current = setTimeout(() => {
          setShowChat(false);
          setActivePrompt(null);
        }, 5000);
      } else {
        // Section is visible, clear timeout
        if (autoCloseTimeout.current) {
          clearTimeout(autoCloseTimeout.current);
          autoCloseTimeout.current = null;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (autoCloseTimeout.current) {
        clearTimeout(autoCloseTimeout.current);
      }
    };
  }, [showChat]);

  // Auto-close ID card when user scrolls away from section
  useEffect(() => {
    if (!showIDCard) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      // If section is not visible, close ID card
      if (!isInView) {
        setShowIDCard(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showIDCard]);

  const handleChatComplete = () => {
    // Chat generation complete
  };

  const handleShowCommitments = () => {
    setShowIDCard(true);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className={`max-w-7xl mx-auto w-full ${showIDCard ? 'flex flex-col md:flex-row' : ''}`}>
        {/* Left Section - Profile, Button, Keywords, Chat */}
        <motion.div
          className={`mb-12 relative flex flex-col items-center justify-center ${showIDCard ? 'w-full md:flex-1 hidden md:flex' : 'w-full'}`}
          layout
          transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
        >
          {/* Profile Picture - moves to ID card when clicked */}
          {!showIDCard && (
            <div className="mb-8 flex justify-center">
              <motion.div 
                layoutId="profile-image"
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl"
                style={{ 
                  aspectRatio: '1 / 1',
                  width: '128px',
                  height: '128px',
                }}
                transition={{ 
                  layout: { duration: 0.8, ease: 'easeInOut' },
                  borderRadius: { duration: 0.8, ease: 'easeInOut' },
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Mohamed Naizan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </div>
          )}

          {/* Name and Title - Mobile responsive */}
          <div className="text-center w-full mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Mohamed Naizan
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">
              AI Engineering Student
            </h2>
          </div>

          {/* Show Commitments Button - Mobile optimized */}
          {!showIDCard && (
            <div className="mb-8 flex justify-center">
              <button
                onClick={handleShowCommitments}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:scale-95 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Show Commitments</span>
              </button>
            </div>
          )}

          {/* Keywords */}
          <AnimatePresence>
            {!showIDCard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <p className="text-center text-gray-400 mb-6 text-sm">
                  Click a keyword to learn more:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {keywords.map((keywordData, index) => (
                    <KeywordPrompt
                      key={index}
                      keyword={keywordData.keyword}
                      prompt={keywordData.prompt}
                      response={keywordData.response}
                      onClick={() => handleKeywordClick(keywordData)}
                      isActive={activePrompt === keywordData.prompt}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ChatGPT Interface */}
          {showChat && activePrompt && (
            <motion.div
              key={chatKey.current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 w-full"
            >
              <ChatGPTInterface
                initialPrompt={activePrompt}
                response={keywords.find(k => k.prompt === activePrompt)?.response || ''}
                onComplete={handleChatComplete}
                topic={keywords.find(k => k.prompt === activePrompt)?.keyword || ''}
              />
            </motion.div>
          )}

          {/* Social Links */}
          <AnimatePresence>
            {!showIDCard && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center space-x-6"
              >
                {[
                  { icon: Github, href: 'https://github.com/naizannaiz', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohamednaizan/', label: 'LinkedIn' },
                  { icon: Instagram, href: 'https://www.instagram.com/naizz.af/', label: 'Instagram' },
                  { icon: Mail, href: 'mailto:naizan9846@gmail.com', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-gray-300 hover:text-white" />
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* GitHub ID Card Component - Mobile optimized */}
        <AnimatePresence>
          {showIDCard && (
            <>
              {/* Backdrop overlay - closes on click outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowIDCard(false)}
                className="fixed inset-0 z-40 bg-black/50 md:bg-transparent"
              />
              {/* ID Card - Full width on mobile, centered on desktop */}
              <div className="w-full md:flex-1 flex items-center justify-center relative z-50 px-4 py-8 md:px-0 md:py-0" onClick={(e) => e.stopPropagation()}>
                <GitHubIDCard onClose={() => setShowIDCard(false)} />
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
