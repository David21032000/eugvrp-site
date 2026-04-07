"use client";

import { motion } from "framer-motion";

interface AnimatedGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

export function AnimatedGradientBorder({
  children,
  className = "",
  colors = ["#a855f7", "#3b82f6", "#ec4899", "#a855f7"],
}: AnimatedGradientBorderProps) {
  return (
    <motion.div
      className={`relative p-[2px] rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl opacity-50"
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content wrapper */}
      <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl h-full">
        {children}
      </div>
    </motion.div>
  );
}
