"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export function GlowButton({
  children,
  className = "",
  onClick,
  href,
  external = false,
  variant = "primary",
}: GlowButtonProps) {
  const baseStyles = "relative px-8 py-4 rounded-xl font-medium text-lg overflow-hidden group";

  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-500 to-blue-500 text-white",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    outline: "border-2 border-white/30 text-white hover:bg-white/10",
  };

  const content = (
    <>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.4), transparent 70%)",
        }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, #a855f7, #3b82f6, #ec4899, #a855f7)",
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </>
  );

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className} inline-flex`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...linkProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
}
