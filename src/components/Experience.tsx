import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ChatGPTInterface from './ChatGPTInterface';
import KeywordPrompt from './KeywordPrompt';

const Experience = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const chatKey = useRef(0);
  const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  const keywords = [
    {
      keyword: 'Data Science Intern',
      prompt: 'Tell me about Mohamed Naizan\'s Data Science internship at Genzee Technologies',
      response: `### Data Science Intern - Genzee Technologies LLP

**Duration:** Jun 2025 - Jul 2025 (2 months)  
**Location:** Kochi, Kerala, India

**What I did:**
• Worked with datasets for cleaning and preprocessing structured and unstructured data
• Performed exploratory data analysis using Pandas, Matplotlib, and Seaborn
• Implemented basic ML models like Linear Regression, Decision Trees, and K-Means Clustering
• Evaluated models using accuracy, precision, recall, and confusion matrix metrics
• Applied predictive modeling to solve practical business problems

**Skills used:**
Python, Pandas, Data Analysis, Machine Learning, Statistical Analysis, Data Modeling

This internship gave me hands-on experience with real-world data science workflows and model deployment.`
    },
    {
      keyword: 'Python Developer',
      prompt: 'Tell me about Mohamed Naizan\'s Python Developer role at PACE LAB',
      response: `### Python Developer - PACE LAB

**Duration:** Jul 2024 (1 month)  
**Location:** Kochi, Kerala, India

**What I learned:**
• Fundamentals of AI and Python programming through hands-on practice
• Data science libraries: NumPy, Pandas, Matplotlib
• Machine learning basics using scikit-learn (classification, regression, model evaluation)
• Conceptual understanding of neural networks and AI workflow
• Built a mini project involving dataset handling and model building

**Skills used:**
Python, NumPy, Pandas, Machine Learning, scikit-learn

This was a great introduction to practical AI development and helped me build a strong foundation in machine learning.`
    },
    {
      keyword: 'Tata Technologies',
      prompt: 'Tell me about Mohamed Naizan\'s internship at Tata Technologies',
      response: `### Intern - Tata Technologies

**Duration:** Jan 2024 (1 month)  
**Location:** Thrissur, Kerala, India

**What I explored:**
• Industrial automation and robotics systems
• CNC robot systems and robotic arms
• 3D modeling using Fusion 360
• 3D printing and prototyping

**Skills used:**
3D Modeling, Fusion 360, Robotics, 3D Printing

This internship exposed me to the industrial side of technology and robotics, which deepened my interest in intelligent systems and practical engineering applications.`
    }
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
      ref={(node) => {
        if (node) {
          sectionRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }
      }}
      id="experience" 
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
          Experience
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
            Click an experience to learn more:
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

        {/* Default Content */}
        {!showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-400"
          >
            <p>Select an experience above to learn more.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Experience;
