import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ChatGPTInterface from './ChatGPTInterface';
import KeywordPrompt from './KeywordPrompt';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const chatKey = useRef(0);
  const autoCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const keywords = [
    {
      keyword: 'ICCCA 2026',
      prompt: 'Tell me about the ICCCA 2026 Conference Website project',
      response: `### ICCCA 2026 Conference Website

**Description:**
A fully responsive conference website for the International Conference on Contemporary Catalysis and Applications. Built with modern web technologies and deployed on Vercel.

**Features:**
• Registration system for attendees
• Abstract submission portal
• Event schedule and program
• Payment integration
• Responsive design for all devices

**Technologies:**
React, Next.js, Tailwind CSS, TypeScript

**Links:**
• Demo: iccca2026.vercel.app
• GitHub: github.com/naizannaiz/iccs2026

This project taught me about building complex registration systems and handling form submissions at scale.`
    },
    {
      keyword: 'CopyGo',
      prompt: 'Tell me about the CopyGo Clipboard Manager project',
      response: `### CopyGo - Smart Clipboard Manager

**Description:**
An intelligent clipboard management tool that helps users organize and manage their copied content efficiently.

**Features:**
• Instant access to clipboard history
• History tracking and organization
• Quick search and filter
• Modern, clean UI/UX

**Technologies:**
React, TypeScript, Web APIs

**Link:**
• Demo: copygo.vercel.app

This project explored browser APIs and state management for managing clipboard data across sessions.`
    },
    {
      keyword: 'AI Image Classifier',
      prompt: 'Tell me about the AI vs Real Image Classifier project',
      response: `### AI vs Real Image Classifier

**Description:**
A TypeScript-based machine learning application that classifies images as AI-generated or real. Uses advanced neural network models to detect subtle differences in image patterns.

**Features:**
• Image classification using ML models
• Neural network-based detection
• Real-time image processing

**Technologies:**
TypeScript, Machine Learning, Neural Networks, Image Processing

**GitHub:**
github.com/naizannaiz/ai-vs-real-classifier

This project combines my interests in AI and web development, demonstrating how machine learning models can be integrated into web applications.`
    },
    {
      keyword: 'Other Projects',
      prompt: 'Tell me about Mohamed Naizan\'s other projects',
      response: `### Other Projects

**Karthavya**
• A web application focusing on responsive design and user experience
• Technologies: CSS, HTML, Responsive Design
• GitHub: github.com/naizannaiz/karthavya

**Print Kada**
• A college print shop management system
• Features: Order management, queue handling, user authentication
• Technologies: JavaScript, Node.js, Web Development
• GitHub: github.com/naizannaiz/printkada

**Coder Platform**
• A coding practice and learning platform
• Features: Coding challenges, tutorials, interactive examples
• Technologies: HTML, CSS, JavaScript
• GitHub: github.com/naizannaiz/coder

These projects showcase my journey in web development, from basic HTML/CSS to full-stack applications with database management.`
    }
  ];

  const projects = [
    {
      title: 'ICCCA 2026 Conference Website',
      description: 'A responsive conference website with registration, abstract submission, event schedule, and payment integration.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/naizannaiz/iccs2026',
      demo: 'https://iccca2026.vercel.app/',
    },
    {
      title: 'CopyGo - Clipboard Manager',
      description: 'A clipboard management tool for organizing copied content with history tracking.',
      technologies: ['React', 'TypeScript', 'Web APIs'],
      demo: 'https://copygo.vercel.app/',
    },
    {
      title: 'AI vs Real Image Classifier',
      description: 'A machine learning application that classifies images as AI-generated or real using neural networks.',
      technologies: ['TypeScript', 'Machine Learning', 'Neural Networks'],
      github: 'https://github.com/naizannaiz/ai-vs-real-classifier',
    },
    {
      title: 'Karthavya',
      description: 'A web application focusing on responsive design and user experience.',
      technologies: ['CSS', 'HTML', 'Responsive Design'],
      github: 'https://github.com/naizannaiz/karthavya',
    },
    {
      title: 'Print Kada',
      description: 'A college print shop management system for order management and queue handling.',
      technologies: ['JavaScript', 'Node.js', 'Web Development'],
      github: 'https://github.com/naizannaiz/printkada',
    },
    {
      title: 'Coder Platform',
      description: 'A coding practice platform with challenges and tutorials.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/naizannaiz/coder',
    },
  ];

  const handleKeywordClick = (keywordData: typeof keywords[0]) => {
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
      ref={sectionRef}
      id="projects" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          Projects
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
            Click a project to learn more:
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
