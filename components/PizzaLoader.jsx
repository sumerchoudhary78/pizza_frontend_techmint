import React from 'react';
import { motion } from 'framer-motion';
import { Pizza } from 'lucide-react';

export const PizzaLoader = () => (
  <div className="relative w-24 h-24">
    <motion.div
      className="absolute inset-0"
      animate={{
        rotateY: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Pizza className="w-full h-full text-primary" />
    </motion.div>
  </div>
);