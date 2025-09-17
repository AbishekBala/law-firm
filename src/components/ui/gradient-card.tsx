'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GradientCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const GradientCard = ({ icon: Icon, title, description }: GradientCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-3xl overflow-hidden border border-gray-200 bg-white"
      style={{
        width: "100%",
        height: "350px",
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Subtle glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-35 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(218, 156, 0, 0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(218,165,32,0.05) 100%)",
          backdropFilter: "blur(1px)",
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.6,
          rotateX: -rotation.x * 0.2,
          rotateY: -rotation.y * 0.2,
          z: 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Light background with subtle gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 70%)",
        }}
        animate={{
          z: -1
        }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-20 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          z: -0.5
        }}
      />

      {/* Gold accent glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(218, 165, 32, 0.1) -10%, rgba(184, 134, 11, 0) 70%),
            radial-gradient(ellipse at bottom left, rgba(251, 191, 36, 0.08) -10%, rgba(184, 134, 11, 0) 70%)
          `,
          filter: "blur(30px)",
        }}
        animate={{
          opacity: isHovered ? 0.9 : 0.7,
          y: isHovered ? rotation.x * 0.5 : 0,
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Central gold accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-21"
        style={{
          background: `
            radial-gradient(circle at bottom center, rgba(218, 165, 32, 0.12) -20%, rgba(184, 134, 11, 0) 60%)
          `,
          filter: "blur(35px)",
        }}
        animate={{
          opacity: isHovered ? 0.85 : 0.75,
          y: isHovered ? `calc(10% + ${rotation.x * 0.3}px)` : "10%",
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Enhanced bottom border accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-25"
        style={{
          background: "linear-gradient(90deg, rgba(218, 165, 32, 0.1) 0%, rgba(218, 165, 32, 0.4) 50%, rgba(218, 165, 32, 0.1) 100%)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Card content */}
      <motion.div
        className="relative flex flex-col h-full p-6 z-40"
        animate={{
          z: 2
        }}
      >
        {/* Icon circle */}
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
          style={{
            background: "linear-gradient(225deg, rgba(218, 165, 32, 0.15) 0%, rgba(184, 134, 11, 0.08) 100%)",
            border: "1px solid rgba(218, 165, 32, 0.2)",
            position: "relative",
            overflow: "hidden"
          }}
          initial={{ filter: "blur(3px)", opacity: 0.7 }}
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            z: isHovered ? 10 : 5,
            y: isHovered ? -2 : 0,
            rotateX: isHovered ? -rotation.x * 0.5 : 0,
            rotateY: isHovered ? -rotation.y * 0.5 : 0
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          {/* Top-left highlight for realistic lighting */}
          <div
            className="absolute top-0 left-0 w-2/3 h-2/3 opacity-20"
            style={{
              background: "radial-gradient(circle at top left, rgba(218, 165, 32, 0.3), transparent 80%)",
              pointerEvents: "none",
              filter: "blur(8px)"
            }}
          />

          {/* Icon */}
          <div className="flex items-center justify-center w-full h-full relative z-10">
            <Icon className="h-7 w-7 text-amber-600" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="mb-auto"
          animate={{
            z: isHovered ? 5 : 2,
            rotateX: isHovered ? -rotation.x * 0.3 : 0,
            rotateY: isHovered ? -rotation.y * 0.3 : 0
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <motion.h3
            className="text-xl font-semibold text-legal-navy mb-4"
            style={{
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              textShadow: isHovered ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              filter: "blur(0px)",
              opacity: 1,
            }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-sm text-gray-600 leading-relaxed mb-6"
            style={{
              lineHeight: 1.6,
              fontWeight: 350,
            }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              textShadow: isHovered ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
              filter: "blur(0px)",
              opacity: 0.9,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Learn More link */}
          <motion.div
            className="inline-flex items-center text-amber-600 text-sm font-medium group cursor-pointer"
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              filter: "blur(0px)",
              opacity: 0.9,
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{
              filter: "drop-shadow(0 0 5px rgba(218, 165, 32, 0.5))"
            }}
          >
            Learn More
            <motion.svg
              className="ml-1 w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                x: isHovered ? 4 : 0
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <path
                d="M1 8H15M15 8L8 1M15 8L8 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};