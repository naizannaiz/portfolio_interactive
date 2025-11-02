import { 
  Code2, 
  Database, 
  Brain, 
  Wrench, 
  Palette, 
  Cloud,
  GitBranch,
  Box
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const ref = useRef(null);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code2,
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'HTML5', 'CSS'],
    },
    {
      title: 'Data Science & ML',
      icon: Brain,
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'scikit-learn', 'PyTorch', 'Data Mining'],
    },
    {
      title: 'Web Development',
      icon: Palette,
      skills: ['React.js', 'Node.js', 'Django', 'Tailwind CSS', 'Figma', 'JSON'],
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['MySQL', 'Firebase', 'Cloud Firestore', 'Data Modeling'],
    },
    {
      title: 'DevOps & Tools',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'CI/CD', 'Nginx', 'DevOps'],
    },
    {
      title: '3D & Design',
      icon: Box,
      skills: ['3D Modeling', 'Fusion 360', 'Robotic Welding', 'Robot Operating System (ROS)'],
    },
    {
      title: 'Cloud & Analytics',
      icon: Cloud,
      skills: ['Big Data', 'Statistical Data Analysis', 'CRM', 'Knowledge Engineering'],
    },
    {
      title: 'Soft Skills',
      icon: GitBranch,
      skills: ['Analytical Skills', 'Team Collaboration', 'Problem Solving', 'Project Management'],
    },
  ];

  return (
    <section 
      id="skills" 
      ref={ref}
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
          Skills
        </motion.h2>

        {/* 2x4 Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700/50"
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-200 leading-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Tags - Pill Style */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 rounded-full border border-gray-600/50 bg-transparent text-gray-300 text-sm font-light"
                      style={{
                        borderRadius: '9999px',
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
