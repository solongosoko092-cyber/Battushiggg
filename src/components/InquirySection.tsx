import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";

export default function InquirySection() {
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "Minecraft Architecture", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after a small delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", projectType: "Minecraft Architecture", message: "" });
      }, 5000);
    }, 1200);
  };

  return (
    <section 
      id="inquiries" 
      className="bg-black py-24 px-4 sm:px-6 md:px-12 lg:px-24 w-full flex justify-center items-center relative overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div 
        id="inquiry-card"
        className="bg-[#101010] border border-[#222] rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 md:p-16 max-w-4xl w-full relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: text description */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-primary/60 font-semibold mb-4 block">
                Холбоо барих
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-normal leading-tight tracking-tight mb-4"
                style={{ color: "#E1E0CC" }}
              >
                Шинэ дижитал ертөнцийг хамтдаа бүтээцгээе.
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                Minecraft барилга, хамтарсан тоглолт, эсвэл шинэ төслүүд дээр хамтран ажиллах уу? Санал хүсэлтээ үлдээгээрэй.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6 mt-6 space-y-3">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Хаяг</p>
              <p className="text-xs sm:text-sm text-primary/80">solongosoko092@gmail.com</p>
              <p className="text-xs sm:text-sm text-gray-500">Улаанбаатар, Монгол</p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="md:col-span-7 relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                  id="inquiry-form"
                >
                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono uppercase text-primary/70 mb-2 tracking-wider">
                      Таны нэр
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Жишээ: Battushig"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono uppercase text-primary/70 mb-2 tracking-wider">
                      Мэйл хаяг
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono uppercase text-primary/70 mb-2 tracking-wider">
                      Сонголт
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
                    >
                      <option value="Minecraft Architecture">Minecraft Барилга</option>
                      <option value="Tactical Squads">Mobile Legends Хамтрал</option>
                      <option value="Digital Collaboration">Дижитал Арт</option>
                      <option value="Other Realm">Бусад төрөл</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono uppercase text-primary/70 mb-2 tracking-wider">
                      Төслийн санаа / Хүсэлт
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Хамтран юу хиймээр байгаагаа энд бичнэ үү..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-[#eae7d5] disabled:bg-primary/50 text-black font-semibold text-xs sm:text-sm rounded-xl py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Илгээж байна...</span>
                    ) : (
                      <>
                        <span>Илгээх</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                  id="form-success-container"
                >
                  <CheckCircle2 className="w-16 h-16 text-primary mb-4 animate-bounce" />
                  <h3 
                    className="text-2xl font-normal tracking-tight mb-2"
                    style={{ color: "#E1E0CC" }}
                  >
                    Амжилттай илгээгдлээ
                  </h3>
                  <p className="text-gray-400 text-sm max-w-sm font-light">
                    Таны илгээсэн мэдээлэл Battushig-д амжилттай хүрлээ. Түр хүлээнэ үү.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
