import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export default function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Pre-split the segments into words while keeping their classes and references
  const allWords = segments.flatMap((segment, segIdx) => {
    return segment.text.split(" ").map((word, wordIdx) => ({
      word,
      className: segment.className || "",
      key: `${segIdx}-${wordIdx}-${word}`,
    }));
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
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
    <motion.div
      id="words-pull-up-multi"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center items-baseline ${className}`}
    >
      {allWords.map((item, index) => {
        if (!item.word) return null;
        return (
          <span
            key={item.key}
            className="inline-block overflow-hidden mr-[0.2em] last:mr-0 pb-[0.05em]"
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block ${item.className}`}
            >
              {item.word}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
}
