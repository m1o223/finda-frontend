import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialMessages = [
  {
    id: 1,
    type: "ai",
    content: "Hello! I'm Finda, your intelligent assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000),
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 max-w-3xl">
      <div className="w-8 h-8 rounded-lg bg-[#10a37f] flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-sm">F</span>
      </div>
      <div className="bg-[#2f2f2f] border border-[#4a4a4a] rounded-lg px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#b4b4b4] typing-dot" />
          <span className="w-2 h-2 rounded-full bg-[#b4b4b4] typing-dot" />
          <span className="w-2 h-2 rounded-full bg-[#b4b4b4] typing-dot" />
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.type === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-start gap-3 max-w-3xl", isUser && "ml-auto flex-row-reverse")}
      data-testid={`chat-message-${message.type}`}
    >
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
        isUser ? "bg-[#303030]" : "bg-[#10a37f]"
      )}>
        <span className="text-white font-bold text-sm">{isUser ? "U" : "F"}</span>
      </div>
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div className={cn(
          "px-4 py-3 rounded-lg text-[15px]",
          isUser ? "bg-[#303030] text-white" : "bg-[#2f2f2f] border border-[#4a4a4a] text-white"
        )}>
          {message.content}
        </div>
        <span className="text-xs text-[#6b6b6b] px-1">{time}</span>
      </div>
    </motion.div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), type: "user", content: input.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I understand. Here's what I can suggest...",
        "Interesting! I'd be happy to assist.",
        "Thanks for sharing. Here's my perspective...",
      ];
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: Date.now(),
        type: "ai",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col bg-[#212121]"
      data-testid="chat-page"
    >
      <header className="px-6 py-4 border-b border-[#4a4a4a]">
        <h1 className="text-lg font-semibold">Finda</h1>
        <p className="text-sm text-[#b4b4b4]">Your intelligent assistant</p>
      </header>

      <ScrollArea ref={scrollRef} className="flex-1 px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6 pb-32">
          <AnimatePresence>
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-[#4a4a4a]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-[#303030] border border-[#4a4a4a] rounded-xl p-3" data-testid="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Message Finda..."
              className="flex-1 bg-transparent text-white placeholder-[#6b6b6b] outline-none px-3 py-2 text-[15px]"
              data-testid="chat-input"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-11 h-11 rounded-xl bg-[#10a37f] hover:bg-[#0e8f70] disabled:opacity-50 disabled:cursor-not-allowed p-0 transition-all duration-200"
              data-testid="chat-send-button"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
