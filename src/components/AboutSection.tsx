import { useRef } from "react";
import { useScroll } from "motion/react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import AnimatedLetter from "./AnimatedLetter";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // scroll tracking for the progressive text reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const headingSegments = [
    { text: "Sain uu,", className: "text-white font-normal" },
    { text: "namaig Battushig gedeg.", className: "text-primary italic font-serif" }
  ];

  const bodyText = "Bi odoo 13 nastai. Bi video togloom togloh durtai ba bi ihenhdee gadaa gardgui gertee baidag. Bi anime kino edneriig neeh ih uzdeggui. Minii durtai togloom bol MLBB bas Minecraft bas busad uur togloomuud.";
  const characters = bodyText.split("");

  return (
    <section 
      id="our-story" 
      className="bg-black py-20 px-4 md:px-12 lg:px-24 w-full flex justify-center items-center relative overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div 
        id="about-card"
        ref={containerRef}
        className="bg-[#101010] border border-[#222] rounded-3xl md:rounded-[2.5rem] py-16 px-6 sm:px-12 md:py-24 max-w-6xl w-full text-center relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      >
        {/* Category Label */}
        <div className="mb-6">
          <span 
            id="about-label"
            className="text-primary text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
          >
            Digital Arts & Play
          </span>
        </div>

        {/* Dynamic MultiStyle Heading */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <WordsPullUpMultiStyle 
            segments={headingSegments}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.05] sm:leading-[1.0] tracking-tight gap-x-[0.22em] gap-y-3 justify-center"
          />
        </div>

        {/* Scroll Linked Character Opacity Text */}
        <div className="max-w-3xl mx-auto border-t border-white/10 pt-10 mt-10">
          <p 
            id="about-scroll-body"
            className="text-[#DEDBC8] text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed tracking-wide text-center"
          >
            {characters.map((char, index) => (
              <AnimatedLetter 
                key={index}
                char={char}
                index={index}
                total={characters.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>
        </div>

        {/* Custom Info Box */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/5 text-[#E1E0CC]/80 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary">●</span>
            <span>Age 13</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">●</span>
            <span>Based in Mongolia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">●</span>
            <span>Sandbox Architect</span>
          </div>
        </div>

      </div>
    </section>
  );
}
