import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import WordsPullUp from "./WordsPullUp";

export default function HeroSection() {
  const customEase = [0.16, 1, 0.3, 1];

  return (
    <section 
      id="hero-section" 
      className="h-screen w-full p-4 md:p-6 bg-black relative flex flex-col justify-between overflow-hidden"
    >
      <div 
        id="hero-container" 
        className="w-full h-full relative rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between"
      >
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none z-10" />

        {/* Navbar component */}
        <Navbar />

        {/* Bottom Hero Content */}
        <div 
          id="hero-content-overlay" 
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16 z-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Giant Heading Prisma */}
            <div className="lg:col-span-8 flex items-end">
              <WordsPullUp
                text="Prisma"
                showAsterisk={true}
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.8] tracking-[-0.07em]"
                style={{ color: "#E1E0CC" } as any}
              />
            </div>

            {/* Description and CTA */}
            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 justify-end pb-2 sm:pb-4 max-w-md lg:max-w-none">
              <motion.p
                id="hero-description"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: customEase,
                }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.25] tracking-wide"
              >
                Sain uu! Namaig Battushig gedeg. Bi video togloom togloh durtai ba bi ihenhdee gertee baidag. MLBB, Minecraft togloj, shine digital ertontsiig buteedeg.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.7,
                  ease: customEase,
                }}
              >
                <a 
                  href="#inquiries"
                  className="inline-flex group items-center bg-primary hover:bg-[#eae7d5] transition-all duration-300 rounded-full pl-6 pr-2 py-2 gap-2 hover:gap-3 cursor-pointer select-none"
                  id="cta-join-lab"
                >
                  <span className="text-black font-semibold text-sm sm:text-base tracking-tight">
                    Холбоо барих
                  </span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
