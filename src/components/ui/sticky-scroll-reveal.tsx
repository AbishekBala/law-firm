"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "rgb(17 24 39)", // slate-900 - deep navy
    "rgb(30 41 59)", // slate-700 - medium navy
    "rgb(45 55 72)", // slate-600 - lighter navy
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, rgb(251 191 36), rgb(217 119 6))", // amber gold gradient
    "linear-gradient(to bottom right, rgb(59 130 246), rgb(29 78 216))", // blue gradient
    "linear-gradient(to bottom right, rgb(251 191 36), rgb(17 24 39))", // gold to dark navy
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-lg p-10 scroll-smooth snap-y snap-mandatory shadow-lg border border-slate-200/20"
      ref={ref}
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl text-center">
          {content.map((item, index) => (
            <div key={item.title + index} className="min-h-[30rem] flex flex-col justify-center snap-start snap-always text-center" style={{ scrollSnapAlign: 'start' }}>
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.4,
                  y: activeCard === index ? 0 : 20
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="text-3xl font-bold text-center mb-6 text-white"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.4,
                  y: activeCard === index ? 0 : 20
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut"
                }}
                className="text-lg max-w-lg mx-auto text-center leading-relaxed text-white/90"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};