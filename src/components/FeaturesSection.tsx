import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const headerSegments = [
    { text: "Durtai togloom bolon minii ertontsuud.", className: "text-[#DEDBC8] block mb-2" },
    { text: "Minecraft, Mobile Legends: Bang Bang bas busad uur togloomuud.", className: "text-gray-500 block text-lg sm:text-xl md:text-2xl" }
  ];

  // Feature Card data
  const cards = [
    {
      type: "video",
      videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4",
      label: "Buteelch baidliin tsonkh."
    },
    {
      type: "feature",
      num: "01",
      title: "Minecraft Ertonts.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
      items: [
        "Voxel barilguud buteekh",
        "Ertontsiig tuluwlukh",
        "Buteelch baidliin erkh chuloo",
        "Gazar nutag bii bolgokh"
      ]
    },
    {
      type: "feature",
      num: "02",
      title: "Mobile Legends: BB.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
      items: [
        "Bgiin tactical toglolt",
        "Strategi bolon tolovloltuud",
        "Ur chadvariig nemeh toglolt"
      ]
    },
    {
      type: "feature",
      num: "03",
      title: "Gertee Baikh Khural.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
      items: [
        "Gadaa gardgui, gertee toglokh",
        "Anime kino neeh ih uzdeggui",
        "Shine togloomuud turshikh"
      ]
    }
  ];

  // Parent grid variants for staggering
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  // Card items variants
  const cardVariants = {
    hidden: {
      scale: 0.95,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      id="workshops" 
      className="min-h-screen bg-black py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background Noise with subtle opacity */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none z-0" />

      {/* Header section */}
      <div className="max-w-6xl mx-auto mb-16 text-center z-10 relative">
        <span className="text-xs uppercase tracking-[0.25em] text-primary/60 font-semibold mb-4 block">
          Core Engine
        </span>
        <WordsPullUpMultiStyle 
          segments={headerSegments}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-snug flex-col"
        />
      </div>

      {/* Staggered cards grid */}
      <motion.div 
        id="features-grid"
        ref={containerRef}
        variants={gridVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[480px] z-10 relative"
      >
        {cards.map((card, idx) => {
          if (card.type === "video") {
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                id={`feature-card-video-${idx}`}
                className="relative rounded-2xl md:rounded-[1.5rem] overflow-hidden group shadow-2xl border border-white/5 h-[350px] lg:h-full"
              >
                <video
                  src={card.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 noise-overlay opacity-[0.4] mix-blend-overlay pointer-events-none z-10" />
                
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <p 
                    className="text-lg font-medium tracking-wide uppercase"
                    style={{ color: "#E1E0CC" }}
                  >
                    {card.label}
                  </p>
                  <p className="text-xs text-white/50 mt-1">Live demo container</p>
                </div>
              </motion.div>
            );
          } else {
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                id={`feature-card-${idx}`}
                className="bg-[#212121] rounded-2xl md:rounded-[1.5rem] p-6 flex flex-col justify-between border border-white/5 hover:border-primary/20 transition-all duration-300 group shadow-2xl h-[380px] lg:h-full"
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* Top bar with Icon and Number */}
                  <div className="flex justify-between items-start mb-6">
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-mono text-primary/40 tracking-wider">
                      {card.num}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 
                    className="text-lg sm:text-xl font-medium tracking-tight mb-4"
                    style={{ color: "#E1E0CC" }}
                  >
                    {card.title}
                  </h3>

                  {/* Checklist Items */}
                  <ul className="space-y-2.5">
                    {card.items?.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-400 font-light leading-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href="#inquiries"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary/85 hover:text-primary transition-colors cursor-pointer group/link"
                  >
                    <span>Delgerengui</span>
                    <ArrowRight className="w-4 h-4 -rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          }
        })}
      </motion.div>
    </section>
  );
}
