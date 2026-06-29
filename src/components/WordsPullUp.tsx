import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export default function WordsPullUp({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  // useInView with margin and once trigger
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.h1
      id="words-pull-up"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <span
            key={index}
            className="inline-block overflow-hidden mr-[0.18em] last:mr-0 pb-[0.05em] relative"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block relative"
            >
              {word}
              {isLastWord && showAsterisk && (
                <span 
                  id="prisma-asterisk"
                  className="absolute top-[0.15em] -right-[0.3em] text-[0.31em] leading-none text-[#DEDBC8]"
                  style={{ transform: "translateY(-40%)" }}
                >
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}
