import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BulletAnimationProps {
  onComplete: () => void;
}

const BulletAnimation = ({ onComplete }: BulletAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [targetX, setTargetX] = useState(1000);

  useEffect(() => {
    setTargetX(window.innerWidth - 100);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, targetX * 0.85, targetX],
      }}
      transition={{
        duration: 1.2,
        ease: 'easeOut',
      }}
      onAnimationComplete={() => {
        setIsAnimating(false);
        onComplete();
      }}
      className="fixed top-1/2 left-0 z-50 pointer-events-none"
    >
      {/* Bullet Shape */}
      <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg">
        {/* Muzzle Flash */}
        <motion.div
          animate={{
            scale: [1, 1.5, 0],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
          }}
          className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full blur-sm"
        />
      </div>
      
      {/* Trail Effect */}
      <motion.div
        animate={{
          opacity: [0.5, 0],
          scale: [0.8, 1.2],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
        className="absolute inset-0 w-6 h-6 bg-red-500 rounded-full blur-md"
      />
    </motion.div>
  );
};

export default BulletAnimation;

