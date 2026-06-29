import { motion } from "motion/react";

export default function Navbar() {
  const navItems = [
    { label: "Эхлэл", href: "#hero-section" },
    { label: "Миний түүх", href: "#our-story" },
    { label: "Тоглоомууд", href: "#workshops" },
    { label: "🤖 My Idol", href: "#", action: "idol" },
    { label: "Холбоо барих", href: "#inquiries" }
  ];

  // inline style colors
  const linkColor = "rgba(225, 224, 204, 0.8)";
  const hoverColor = "#E1E0CC";

  return (
    <div id="navbar-container" className="absolute top-0 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        id="navbar-pill"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-black border-x border-b border-[#222] rounded-b-2xl md:rounded-b-3xl px-6 py-3 md:px-10 md:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      >
        <ul id="navbar-list" className="flex items-center gap-4 sm:gap-6 md:gap-12 lg:gap-14">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <motion.a
                href={item.href}
                onClick={(e) => {
                  if (item.action === "idol") {
                    e.preventDefault();
                    if (typeof (window as any).openIdolChat === "function") {
                      (window as any).openIdolChat();
                    }
                  }
                }}
                className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 relative group cursor-pointer"
                style={{ color: linkColor }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = hoverColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = linkColor;
                }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#DEDBC8] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}
