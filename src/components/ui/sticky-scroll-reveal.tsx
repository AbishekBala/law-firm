"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  autoPlay = true,
  intervalMs = 4500,
  pauseOnHover = true,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  autoPlay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  // autoplay state and refs
  const autoPlayRef = useRef<boolean>(autoPlay);
  const timerRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);

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

  // keep a ref of activeCard to avoid stale closures inside intervals
  const activeCardRef = useRef<number>(0);
  useEffect(() => {
    activeCardRef.current = activeCard;
  }, [activeCard]);

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

  // scroll to a specific card index
  const scrollToIndex = (index: number) => {
    const el = ref.current;
    if (!el) return;
    // find the card element by data attribute and scroll to its offsetTop
    const cards = el.querySelectorAll('[data-sticky-card]');
    const card = cards[index] as HTMLElement | undefined;
    if (card) {
      const top = card.offsetTop;
      try {
        el.scrollTo({ top, behavior: 'smooth' });
      } catch (e) {
        el.scrollTop = top;
      }
    }
  };

  // autoplay handlers
  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoPlay = () => {
    clearTimer();
    if (!autoPlayRef.current) return;
    timerRef.current = window.setInterval(() => {
      const current = activeCardRef.current ?? 0;
      const next = (current + 1) % cardLength;
      scrollToIndex(next);
    }, intervalMs) as unknown as number;
  };

  const pauseAutoPlayTemporary = (ms = 4000) => {
    autoPlayRef.current = false;
    clearTimer();
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      autoPlayRef.current = autoPlay;
      startAutoPlay();
    }, ms) as unknown as number;
  };

  useEffect(() => {
    autoPlayRef.current = autoPlay;
    if (autoPlay) startAutoPlay();
    return () => {
      clearTimer();
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, intervalMs, cardLength, /* activeCard intentionally omitted */]);

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
      onPointerDown={() => pauseAutoPlayTemporary(6000)}
      onWheel={() => pauseAutoPlayTemporary(6000)}
      onTouchStart={() => pauseAutoPlayTemporary(6000)}
      onMouseEnter={() => { if (pauseOnHover) { pauseAutoPlayTemporary(999999); } }}
      onMouseLeave={() => { if (pauseOnHover) { autoPlayRef.current = autoPlay; startAutoPlay(); } }}
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl text-center">
          {content.map((item, index) => (
            <div data-sticky-card key={item.title + index} className="min-h-[30rem] flex flex-col justify-center snap-start snap-always text-center" style={{ scrollSnapAlign: 'start' }}>
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