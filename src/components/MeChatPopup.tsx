import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, User, ChevronDown, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MeChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Сайн уу! Намайг Баттүшиг (Me-AI) гэдэг. Би 13 настай, видео тоглоом тоглох дуртай! Чи миний сайт болон миний сонирхдог зүйлсийн талаар юу мэдмээр байна? Энд чөлөөтэй асуугаарай! 🎮✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    if (!textToSend) setInput("");

    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(0, -1),
        }),
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Алдаа гарлаа: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text || "Уучлаарай, би сайн ойлгосонгүй. Дахин бичнэ үү!" },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Холболтонд алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Чи хэн бэ?",
    "Ямар тоглоомд дуртай вэ?",
    "Сайтын хэсгүүдийг тайлбарлаж өгөөч",
    "Minecraft дээр юу хийдэг вэ?"
  ];

  return (
    <div id="me-chat-widget-root" className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="me-chat-popup-container"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-[#111] border border-[#333] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Soft Primary Glow Header */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary/40" />

            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary/25 border border-primary/40 flex items-center justify-center font-bold text-primary">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#E1E0CC]">Battushig (Me-AI)</h4>
                  <p className="text-[10px] text-primary/70 font-mono">Шуурхай туслах — Идэвхтэй</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                id="me-chat-close-btn"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Messages body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10 bg-black/20"
              id="me-chat-messages"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                      msg.role === "user"
                        ? "bg-primary text-black font-semibold rounded-tr-none"
                        : "bg-white/5 border border-white/5 text-[#E1E0CC]/90 rounded-tl-none font-sans"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1 h-1 rounded-full bg-primary animate-bounce"></span>
                    </span>
                    <span className="text-[10px] italic animate-pulse">Бичиж байна...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 justify-center bg-black/40 border-t border-white/5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-[10px] bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 rounded-full px-2.5 py-1 text-[#E1E0CC]/80 hover:text-primary transition-all duration-300 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <div className="p-3 bg-black/50 border-t border-white/5 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Санал хүсэлт, асуултаа энд бичнэ үү..."
                className="flex-1 bg-black/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors"
                id="me-chat-input"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center hover:bg-primary/90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer"
                id="me-chat-send-btn"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        id="me-chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: isOpen ? -90 : 10 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-primary hover:bg-[#eae7d5] text-black shadow-[0_10px_30px_rgba(222,219,200,0.3)] flex items-center justify-center cursor-pointer select-none border border-black/10 relative z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-6 h-6 text-black" key="close" />
          ) : (
            <div className="relative" key="chat">
              <MessageCircle className="w-6 h-6 text-black" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border border-black rounded-full" />
            </div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
