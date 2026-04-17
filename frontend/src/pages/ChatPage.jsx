import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const USER_AVATAR = "https://images.unsplash.com/photo-1769636929231-3cd7f853d038?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzc2NDQ5MTUyfDA&ixlib=rb-4.1.0&q=85";

const initialMessages = [
  {
    id: 1,
    type: "ai",
    content: "Hello! I'm BlueMind AI, your intelligent assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000),
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const messageVariants = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-start gap-3 mr-auto max-w-[85%]"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-zinc-900/80 border border-white/5 rounded-3xl rounded-tl-sm px-6 py-4">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-400 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-zinc-400 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-zinc-400 typing-dot" />
        </div>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.type === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      variants={messageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
      className={cn("flex items-start gap-3", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}
      data-testid={`chat-message-${message.type}`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
          <img src={USER_AVATAR} alt="User" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-6 py-4 text-[15px] leading-relaxed shadow-lg",
            isUser
              ? "chat-bubble-user text-white rounded-3xl rounded-tr-sm max-w-[80%]"
              : "bg-zinc-900/80 border border-white/5 text-zinc-200 rounded-3xl rounded-tl-sm max-w-[85%]"
          )}
        >
          {message.content}
        </div>
        <span className="text-xs text-zinc-500 px-2">{time}</span>
      </div>
    </motion.div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great question! Let me help you with that.",
        "I understand what you're looking for. Here's what I can suggest...",
        "Interesting! I'd be happy to assist you with this.",
        "Thanks for sharing that with me. Here's my perspective...",
        "Let me think about this for a moment... I have some ideas that might help.",
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "ai",
          content: randomResponse,
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="h-screen flex flex-col"
      data-testid="chat-page"
    >
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 backdrop-blur-xl bg-zinc-950/50">
        <h1 className="text-xl font-semibold font-['Outfit'] gradient-text">BlueMind AI</h1>
        <p className="text-sm text-zinc-500">Your intelligent assistant</p>
      </header>

      {/* Chat Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6 pb-32">
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="fixed bottom-8 left-[calc(50%+2.5rem)] -translate-x-1/2 w-[calc(100%-7rem)] max-w-3xl z-40">
        <div
          className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 pl-6 flex items-center shadow-2xl glow-purple"
          data-testid="chat-input-container"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message BlueMind AI..."
            className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-[15px]"
            data-testid="chat-input"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
            data-testid="chat-send-button"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
