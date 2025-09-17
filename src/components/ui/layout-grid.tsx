"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden cursor-pointer",
              selected?.id === card.id
                ? "rounded-2xl absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-2xl h-full w-full shadow-xl border border-accent/30"
                : "bg-white rounded-2xl h-full w-full shadow-lg hover:shadow-2xl transition-all duration-500 border border-legal-navy/10 hover:border-accent/40"
            )}
            layoutId={`card-${card.id}`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} index={i} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-gradient-to-br from-legal-navy/95 via-legal-navy/90 to-accent/20 backdrop-blur-md z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 1 : 0 }}
      />
    </div>
  );
};

  const ImageComponent = ({ card, index }: { card: Card; index: number }) => {
    return (
      <motion.div
        className={cn(card.className, "relative overflow-hidden rounded-xl")}
        layout
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={card.thumbnail}
          alt={`Testimonial ${index + 1}`}
          className="w-full h-full object-cover absolute inset-0"
          style={{ objectPosition: 'center 25%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/80 via-legal-navy/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          {card.content}
        </div>
      </motion.div>
    );
  };

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-2xl shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="absolute inset-0 h-full w-full bg-gradient-to-t from-legal-navy/95 via-legal-navy/80 to-legal-navy/60 backdrop-blur-md z-10 rounded-2xl border border-accent/30"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-8 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};