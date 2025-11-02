import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GitHubMugshotProps {
  onClose: () => void;
}

// Generate commit data for height chart lines
// Each line represents a week of commits
const generateCommitData = () => {
  const commitData: Array<Array<number>> = [];
  
  // Generate 52 weeks of commit data (1 year)
  for (let week = 0; week < 52; week++) {
    const weekCommits: number[] = [];
    // 7 days per week
    for (let day = 0; day < 7; day++) {
      // Random commits with some realistic patterns
      weekCommits.push(Math.floor(Math.random() * 10));
    }
    commitData.push(weekCommits);
  }
  
  return commitData;
};

// Generate GitHub-style contribution graph data
const generateGitHubCommitData = () => {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const commitMap: Record<string, number[][]> = {};
  
  months.forEach((month) => {
    const weeks: number[][] = [];
    for (let week = 0; week < 4; week++) {
      const weekDays: number[] = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(Math.floor(Math.random() * 10));
      }
      weeks.push(weekDays);
    }
    commitMap[month] = weeks;
  });
  
  return commitMap;
};

const GitHubMugshot = ({ onClose }: GitHubMugshotProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [heightChartCommits, setHeightChartCommits] = useState<Array<Array<number>>>([]);
  const [githubCommits, setGithubCommits] = useState<Record<string, number[][]>>({});
  
  useEffect(() => {
    // Generate commit data for height chart lines
    setHeightChartCommits(generateCommitData());
    // Generate GitHub-style commit graph data
    setGithubCommits(generateGitHubCommitData());
  }, []);

  const getCommitColor = (commits: number) => {
    if (commits === 0) return 'bg-gray-900';
    if (commits <= 2) return 'bg-green-900';
    if (commits <= 5) return 'bg-green-700';
    if (commits <= 8) return 'bg-green-500';
    return 'bg-green-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed top-20 right-8 z-50 w-96"
    >
      <div className="relative bg-gray-800 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-1.5 bg-gray-900/80 hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-300" />
        </button>

        {/* Mugshot Container */}
        <div 
          className="relative h-[600px] bg-white"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Height Chart Lines Background with Markers */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gray-50 border-r-2 border-gray-400">
            {/* Height Markers - spaced more realistically */}
            {[
              { value: '7"80"', top: '4%' },
              { value: '8"60"', top: '12%' },
              { value: '6"80"', top: '24%' },
              { value: '10"60"', top: '32%' },
              { value: '4"25"', top: '40%' },
              { value: '6"30"', top: '48%' },
              { value: '6"15"', top: '56%' },
              { value: '5"25"', top: '64%' },
              { value: '6"10"', top: '72%' },
            ].map((marker, idx) => (
              <div
                key={idx}
                className="absolute left-2 text-xs font-mono text-gray-700"
                style={{ top: marker.top }}
              >
                {marker.value}
              </div>
            ))}
          </div>

          {/* Horizontal Lines (Commit Data Visualization as Height Chart Lines) */}
          <div className="absolute left-20 right-0 top-0 bottom-0 bg-white">
            {/* Show fewer, more visible lines representing commit weeks */}
            {heightChartCommits.slice(0, 20).map((week, weekIdx) => (
              <div
                key={weekIdx}
                className="absolute w-full border-t-2 border-black"
                style={{
                  top: `${(weekIdx / 20) * 100}%`,
                }}
              >
                {/* Commit indicators as colored squares on the line */}
                {week.slice(0, 5).map((commitCount, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`absolute w-4 h-4 rounded ${getCommitColor(commitCount)} border border-gray-900 shadow-sm`}
                    style={{
                      left: `${25 + (dayIdx * 15)}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    title={`${commitCount} commits - Week ${weekIdx + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Mugshot Image Overlay */}
          <AnimatePresence>
            {!isHovering && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center bg-white z-10 pointer-events-none"
              >
                <div className="relative z-20">
                  {/* Mugshot Sign - positioned above image */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-black px-8 py-4 rounded-lg shadow-2xl z-30"
                  >
                    <div className="text-white text-sm font-bold uppercase leading-tight text-center">
                      <div>MOHAMED NAIZAN</div>
                      <div className="text-xs mt-1 font-mono">10/0713/26188 / 203</div>
                    </div>
                  </motion.div>

                  {/* Profile Image as Mugshot */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-56 h-72 rounded overflow-hidden border-4 border-gray-900 shadow-2xl bg-gray-100"
                  >
                    <img
                      src="/profile.jpg"
                      alt="Mohamed Naizan"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="224" height="288"%3E%3Crect fill="%23ddd" width="224" height="288"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16"%3EProfile Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GitHub Commit Graph Overlay */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gray-900 p-6 z-10 flex flex-col"
              >
                {/* GitHub Header */}
                <div className="mb-4">
                  <h3 className="text-white text-sm font-semibold mb-2">
                    Contribution Graph
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded ${getCommitColor(level * 2)}`}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>

                {/* GitHub-Style Grid */}
                <div className="flex-1 overflow-auto flex items-center justify-center">
                  <div className="inline-flex gap-1">
                    {Object.entries(githubCommits).map(([month, weeks]) => (
                      <div key={month} className="flex flex-col gap-1">
                        <div className="text-xs text-gray-400 mb-1 text-center h-6 flex items-end justify-center">{month}</div>
                        {weeks.map((week, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-1">
                            {week.map((commitCount, dayIdx) => (
                              <div
                                key={dayIdx}
                                className={`w-3 h-3 rounded-sm ${getCommitColor(commitCount)} hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer`}
                                title={`${commitCount} contributions on ${month} week ${weekIdx + 1} day ${dayIdx + 1}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubMugshot;

