import React from 'react';
import { motion } from 'framer-motion';

const PizzaBackground = () => {
  return (
    <div className="fixed inset-0 bg-[#FFF5EE] overflow-hidden">
      {/* Floating pizza slices */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full border-8 border-orange-400 rounded-tl-full transform rotate-45 opacity-10" />
        </motion.div>
      ))}

      {/* Ambient circles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full bg-red-200"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, orange 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>
    </div>
  );
};

export default PizzaBackground;