import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Github, Linkedin, Instagram, Mail } from 'lucide-react';

interface GitHubIDCardProps {
  onClose: () => void;
}

// Generate recent commit data (last few months)
const generateRecentCommits = () => {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const commitData: Record<string, number[][]> = {};
  
  months.forEach((month) => {
    const weeks: number[][] = [];
    // 4 weeks per month
    for (let week = 0; week < 4; week++) {
      const weekDays: number[] = [];
      // 7 days per week
      for (let day = 0; day < 7; day++) {
        // Random commits with some realistic patterns (more commits on weekdays)
        const isWeekend = day === 0 || day === 6;
        const commitCount = isWeekend 
          ? Math.floor(Math.random() * 5) 
          : Math.floor(Math.random() * 10);
        weekDays.push(commitCount);
      }
      weeks.push(weekDays);
    }
    commitData[month] = weeks;
  });
  
  return commitData;
};

const GitHubIDCard = ({ onClose }: GitHubIDCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [commitData, setCommitData] = useState<Record<string, number[][]>>({});
  
  useEffect(() => {
    setCommitData(generateRecentCommits());
  }, []);

  const getCommitColor = (commits: number) => {
    if (commits === 0) return 'bg-gray-900';
    if (commits <= 2) return 'bg-green-900';
    if (commits <= 5) return 'bg-green-700';
    if (commits <= 8) return 'bg-green-500';
    return 'bg-green-400';
  };

  // Calculate age (assuming born around 2003-2004 based on being a student)
  const age = new Date().getFullYear() - 2004;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative z-50"
    >
      <div className="relative w-80">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-30 p-2 bg-gray-900/80 hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-300" />
        </button>

        {/* ID Card Container with 3D Flip */}
        <div className="relative h-[500px] perspective-1000">
          <motion.div
            className="relative w-full h-full preserve-3d cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            animate={{ 
              rotateY: isFlipped ? 180 : 0,
              y: [0, -5, 0],
            }}
            transition={{ 
              rotateY: { duration: 0.6, ease: 'easeInOut' },
              y: { 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut',
                repeatDelay: 1,
              },
            }}
            style={{ 
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Front of ID Card */}
            <motion.div
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700 shadow-2xl overflow-hidden">
                {/* ID Card Header */}
                <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      Developer ID
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MN</span>
                    </div>
                  </div>
                </div>

                {/* Profile Photo Section */}
                <div className="px-6 pt-6 pb-24">
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      layoutId="profile-image"
                      className="rounded-lg overflow-hidden border-4 border-gray-600 shadow-xl bg-gray-700"
                      style={{ 
                        width: '128px',
                        height: '128px',
                        aspectRatio: '1 / 1',
                      }}
                      transition={{ 
                        layout: { duration: 0.8, ease: 'easeInOut' },
                        borderRadius: { duration: 0.8, ease: 'easeInOut' },
                        borderColor: { duration: 0.8, ease: 'easeInOut' },
                      }}
                    >
                      <img
                        src="/profile.jpg"
                        alt="Mohamed Naizan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%234a5568" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23cbd5e0" font-family="Arial" font-size="14"%3EProfile%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Name Section */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Mohamed Naizan
                    </h2>
                    <p className="text-sm text-gray-400 mb-2">AI Engineering Student</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full">
                      <span className="text-xs text-gray-300">Age: {age}</span>
                    </div>
                  </div>

                  {/* Profile Buttons - Icons Only */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <a
                      href="https://github.com/naizannaiz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors group"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mohamednaizan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors group"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </a>
                    <a
                      href="https://www.instagram.com/naizz.af/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-700 hover:bg-pink-600 transition-colors group"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </a>
                    <a
                      href="mailto:naizan9846@gmail.com"
                      className="p-3 rounded-full bg-gray-700 hover:bg-red-600 transition-colors group"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </a>
                  </div>
                </div>

                {/* ID Card Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-700/30 px-6 py-4 border-t border-gray-600">
                  <div className="text-xs text-center space-y-1.5">
                    <div className="text-gray-300 font-medium italic">i code with vibe</div>
                    <div className="text-gray-500">Kerala, India</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back of ID Card - GitHub Commits */}
            <motion.div
              className="absolute inset-0 backface-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="h-full bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-700 shadow-2xl overflow-hidden">
                {/* Back Header */}
                <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-gray-300" />
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        Recent Commitments
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Last 6 months</div>
                  </div>
                </div>

                {/* Commit Graph */}
                <div className="px-6 py-6 h-full flex flex-col">
                  {/* Legend */}
                  <div className="mb-4 flex items-center justify-center gap-2 text-xs">
                    <span className="text-gray-500">Less</span>
                    <div className="flex gap-0.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-gray-900"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-green-900"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-green-700"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-green-400"></div>
                    </div>
                    <span className="text-gray-500">More</span>
                  </div>

                  {/* GitHub-Style Grid - Compact Version */}
                  <div className="flex-1 overflow-auto flex items-center justify-center">
                    <div className="inline-flex gap-1">
                      {Object.entries(commitData).map(([month, weeks]) => (
                        <div key={month} className="flex flex-col gap-0.5">
                          <div className="text-[10px] text-gray-500 mb-1 text-center h-4 flex items-end justify-center font-mono">
                            {month}
                          </div>
                          {weeks.map((week, weekIdx) => (
                            <div key={weekIdx} className="flex flex-col gap-0.5">
                              {week.map((commitCount, dayIdx) => (
                                <div
                                  key={dayIdx}
                                  className={`w-2.5 h-2.5 rounded-sm ${getCommitColor(commitCount)} hover:ring-1 hover:ring-blue-400 transition-all cursor-pointer`}
                                  title={`${commitCount} contributions on ${month} week ${weekIdx + 1}`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex justify-around text-xs text-gray-500">
                      <div className="text-center">
                        <div className="text-white font-semibold">
                          {Object.values(commitData).flat().flat().reduce((a, b) => a + b, 0)}
                        </div>
                        <div>Total Commits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold">
                          {Object.values(commitData).flat().flat().filter(c => c > 0).length}
                        </div>
                        <div>Active Days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubIDCard;

