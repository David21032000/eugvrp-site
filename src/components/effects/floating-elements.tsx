"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
}

export function FloatingElements({
  count = 6,
  colors = ["#a855f7", "#3b82f6", "#ec4899", "#8b5cf6"],
}: FloatingElementsProps) {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const generatedElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setElements(generatedElements);
  }, [count, colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: el.size,
            height: el.size,
            background: `radial-gradient(circle, ${el.color}, transparent)`,
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
