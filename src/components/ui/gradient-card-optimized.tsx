'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GradientCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const GradientCard = ({ icon: Icon, title, description }: GradientCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden border border-gray-200 bg-white h-[350px] will-change-transform"
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Optimized gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        }}
      />

      {/* Simplified gold accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 z-10"
        style={{
          background: "radial-gradient(ellipse at bottom center, rgba(218, 165, 32, 0.08) 0%, transparent 70%)",
        }}
        animate={{
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card content */}
      <div className="relative flex flex-col h-full p-6 z-20">
        {/* Icon circle */}
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon 
            className="w-7 h-7 text-amber-600" 
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-gray-900 mb-3 leading-tight"
          animate={{
            color: isHovered ? "#1f2937" : "#374151",
          }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-600 leading-relaxed text-sm flex-grow"
          animate={{
            color: isHovered ? "#4b5563" : "#6b7280",
          }}
          transition={{ duration: 0.2 }}
        >
          {description}
        </motion.p>

        {/* Bottom accent line */}
        <motion.div
          className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
          animate={{
            width: isHovered ? "3rem" : "2rem",
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};