import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ChatGPTInterface from './ChatGPTInterface';
import KeywordPrompt from './KeywordPrompt';

const About = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const chatKey = useRef(0);
  const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  const keywords = [
    {
      keyword: 'Education',
      prompt: 'Tell me about Mohamed Naizan\'s education background',
      response: `### Education Background

**Bachelor of Technology - Artificial Intelligence**
• Institution: Jyothi Engineering College, Cheruthuruthy
• Period: Aug 2023 - Jul 2027
• Currently pursuing studies in AI, machine learning, and intelligent systems

**Higher Secondary Education**
• Institution: KPSMM VHSS Varode
• Period: Nov 2021 - May 2023
• Grade: 84.25%

**Secondary Education**
• Institution: St. Raphael's Cathedral School
• Period: Jun 2010 - Mar 2020
• Grade: 79.8%

I'm currently in my undergraduate program, focusing on building a strong foundation in artificial intelligence and related technologies.`
    },
    {
      keyword: 'About Me',
      prompt: 'Tell me about Mohamed Naizan as a person',
      response: `### About Mohamed Naizan

I'm an AI Engineering student who enjoys solving problems and working with teams. I'm currently learning about machine learning, data science, and building web applications.

**What I'm working on:**
• Building AI and machine learning projects
• Learning data science and analysis
• Developing web applications
• Exploring new technologies

**My approach:**
I believe in learning by doing, so I spend time on projects and exploring new technologies. I enjoy the process of building things and seeing them come to life.`
    },
    {
      keyword: 'Interests',
      prompt: 'What are Mohamed Naizan\'s interests and goals?',
      response: `### Interests and Goals

**Current Focus:**
• Artificial Intelligence and Machine Learning
• Data Science and Analytics
• Web Development
• Building practical solutions

**Learning Goals:**
• Deepen understanding of neural networks and deep learning
• Explore cloud computing and deployment
• Improve software engineering practices
• Contribute to open-source projects

**What drives me:**
I'm motivated by curiosity and the desire to build things that matter. I enjoy tackling new challenges and learning from each project I work on.`
    }
  ];

  const handleKeywordClick = (keywordData: typeof keywords[0]) => {
    // Clear any existing timeout
    if (autoCloseTimeout.current) {
      clearTimeout(autoCloseTimeout.current);
    }
    
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
      
      if (!isInView) {
        if (autoCloseTimeout.current) {
          clearTimeout(autoCloseTimeout.current);
        }
        
        autoCloseTimeout.current = setTimeout(() => {
          setShowChat(false);
          setActivePrompt(null);
        }, 5000);
      } else {
        if (autoCloseTimeout.current) {
          clearTimeout(autoCloseTimeout.current);
          autoCloseTimeout.current = null;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (autoCloseTimeout.current) {
        clearTimeout(autoCloseTimeout.current);
      }
    };
  }, [showChat]);

  return (
    <section 
      ref={(node) => {
        if (node) {
          sectionRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }
      }}
      id="about" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>

        {/* Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        {/* ChatGPT Interface */}
        {showChat && activePrompt && (
          <motion.div
            key={chatKey.current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <ChatGPTInterface
              initialPrompt={activePrompt}
              response={keywords.find(k => k.prompt === activePrompt)?.response || ''}
              topic={keywords.find(k => k.prompt === activePrompt)?.keyword || ''}
            />
          </motion.div>
        )}

        {/* Default Content (shows when no keyword selected) */}
        {!showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-400"
          >
            <p>Select a keyword above to learn more about me.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
