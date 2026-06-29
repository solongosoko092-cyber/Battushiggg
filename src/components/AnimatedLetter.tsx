import { motion, useTransform, MotionValue } from "motion/react";

interface AnimatedLetterProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  key?: any;
}

export default function AnimatedLetter({ char, index, total, scrollYProgress }: AnimatedLetterProps) {
  // Map index to scroll trigger point
  // Character staggering: charProgress = index / totalChars, range [charProgress - 0.1, charProgress + 0.05]
  const charProgress = index / total;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  // Map the scroll range [start, end] to opacity [0.2, 1]
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  // Preserve trailing spaces with non-breaking spaces or simple inline-block span
  return (
    <motion.span 
      id={`anim-char-${index}`}
      style={{ opacity }} 
      className="inline-block transition-colors duration-150"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
