import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, Flame, Play, Volume2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface IdolChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IdolChatModal({ isOpen, onClose }: IdolChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "SIUUUUUUUU! WHAT IS UP! Darren Watkins Jr here, your IDOL COACH! Ask me anything about football, Ronaldo, or why we are the absolute GOATs! ⚽🔥 Let's goooo!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    if (!textToSend) setInput("");

    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/idol", {
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
          { role: "assistant", content: `ERR: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text || "SIUUUUU! I have no words!" },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "SIUUU! Connection timed out but CR7 is still the GOAT! Try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Who is the GOAT?",
    "Do you love Cristiano Ronaldo?",
    "Give me an energetic football quote!",
    "SIUUUUUUUUU!"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="idol-chat-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          {/* Animated Background Blob */}
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-red-600/10 rounded-full filter blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-yellow-500/10 rounded-full filter blur-[100px] pointer-events-none" />

          {/* Modal Container */}
          <motion.div
            id="idol-chat-modal"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl h-[80vh] md:h-[70vh] bg-[#111] border border-red-500/25 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(239,68,68,0.15)]"
          >
            {/* Top Red-Orange Energy Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600" />

            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                {/* Avatar with Animated Pulse */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 to-yellow-500 flex items-center justify-center font-bold text-white shadow-lg overflow-hidden">
                    <Flame className="w-6 h-6 text-black animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full animate-ping" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-lg text-white">Darren Watkins Jr</h3>
                    <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Idol Coach
                    </span>
                  </div>
                  <p className="text-xs text-yellow-500 font-mono flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    STATUS: CRAZY & ENERGETIC ⚽
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                id="idol-chat-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
              id="idol-chat-messages"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-tr-none"
                        : "bg-white/5 border border-white/5 text-[#E1E0CC]/95 rounded-tl-none font-sans"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce"></span>
                    </span>
                    <span className="text-xs italic animate-pulse">Watkins is screaming...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion Chips */}
            {messages.length === 1 && (
              <div className="px-6 py-2 flex flex-wrap gap-2 justify-center bg-black/20 border-t border-white/5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-xs bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-full px-3 py-1.5 text-primary/80 hover:text-red-400 transition-all duration-300 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-4 bg-black/40 border-t border-white/5 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Darren Watkins Jr (e.g. WHO IS THE GOAT?)..."
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-red-500/40 transition-colors"
                id="idol-chat-input"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-yellow-500 text-black flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer"
                id="idol-chat-send-btn"
              >
                <Send className="w-5 h-5 text-black" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
