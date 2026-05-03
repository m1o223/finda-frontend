import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bell, BookOpen, Clock, UserCircle, Plus, Send, Menu, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Simulated AI responses
const AI_RESPONSES = [
  "That's a great question! Let me break it down for you. The key thing to understand is that modern AI systems work by processing patterns in data. They learn from vast amounts of text, code, and other information to generate helpful responses.",
  "I'd be happy to help with that! Here's what I think would work best for your situation. You'll want to start by defining your goals clearly, then break them down into smaller, actionable steps that you can tackle one at a time.",
  "Interesting thought! Let me share my perspective on this. The way I see it, there are three main approaches you could take, each with their own trade-offs. Would you like me to elaborate on any of them?",
  "Great question! Here's a comprehensive answer for you. First, let's establish the fundamentals. Then we can explore some more advanced concepts that build on that foundation.",
  "I understand what you're looking for. Let me help you figure this out step by step. The most important thing is to start with a clear understanding of the problem before jumping to solutions.",
];

function TypingText({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");
    setIsComplete(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsComplete(true);
        onComplete?.();
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="inline-block w-0.5 h-4 bg-white/70 ml-0.5 animate-pulse align-middle" />}
    </span>
  );
}

function IconSidebar({ activeItem, onItemClick, isMobile, onClose }) {
  const navigate = useNavigate();
  const items = [
    { id: "chat", icon: MessageSquare, label: "Chat" },
    { id: "reminders", icon: Bell, label: "Reminders", route: "/reminders" },
    { id: "learning", icon: BookOpen, label: "Learning" },
    { id: "history", icon: Clock, label: "History" },
    { id: "profile", icon: UserCircle, label: "Profile" },
  ];

  return (
    <div className={cn(
      "h-full w-16 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col items-center py-5 gap-1",
      isMobile && "absolute left-0 top-0 z-50"
    )}>
      {/* Logo */}
      <div className="w-10 h-10 rounded-xl bg-[#193B68] flex items-center justify-center mb-6">
        <span className="text-white font-bold text-lg">F</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col items-center gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onItemClick(item.id);
              if (item.route) navigate(item.route);
              if (isMobile) onClose?.();
            }}
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer group relative",
              activeItem === item.id
                ? "bg-[#2a2a2a] text-white"
                : "text-[#6b6b6b] hover:text-white hover:bg-[#252525]"
            )}
            data-testid={`sidebar-icon-${item.id}`}
          >
            <item.icon className="w-5 h-5" />
            {/* Tooltip */}
            <span className="absolute left-14 px-2 py-1 bg-[#333] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function MenuSidebar({ isMobile, onClose }) {
  const [chats] = useState([
    { id: 1, title: "New Chat" },
  ]);

  const menuItems = [
    { id: "new", icon: Plus, label: "New Chat" },
    { id: "reminders", icon: Bell, label: "Reminders" },
    { id: "history", icon: Clock, label: "History" },
  ];

  return (
    <div className={cn(
      "h-full w-56 bg-[#1e1e1e] border-r border-[#2a2a2a] flex flex-col",
      isMobile && "absolute left-16 top-0 z-40"
    )}>
      <div className="p-4">
        <h2 className="text-white/80 text-sm font-medium mb-3">Menu</h2>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9a9a9a] hover:text-white hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer text-sm"
              data-testid={`menu-${item.id}`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 pt-2">
        <p className="text-[#555] text-xs mb-2 uppercase tracking-wider">Recent</p>
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="px-3 py-2 rounded-lg text-[#9a9a9a] hover:text-white hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer text-sm truncate"
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message, isLatestAi }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex w-full mb-5", isUser ? "justify-end" : "justify-start")}
      data-testid={`chat-message-${message.role}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-[#193B68] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] px-5 py-3.5 text-[15px] leading-relaxed",
          isUser
            ? "bg-[#2a2a2a] text-white rounded-2xl rounded-br-md"
            : "text-[#e0e0e0]"
        )}
      >
        {!isUser && isLatestAi && message.isTyping ? (
          <TypingText text={message.content} onComplete={message.onTypingComplete} />
        ) : (
          message.content
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-[#333] flex items-center justify-center ml-3 mt-1 flex-shrink-0">
          <UserCircle className="w-4 h-4 text-[#999]" />
        </div>
      )}
    </motion.div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [activeIcon, setActiveIcon] = useState("chat");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping, scrollToBottom]);

  const handleSend = () => {
    if (!input.trim() || isAiTyping) return;

    const userMessage = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content: response,
        isTyping: true,
        onTypingComplete: () => {
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMessage.id ? { ...m, isTyping: false } : m))
          );
          setIsAiTyping(false);
        },
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-screen flex bg-[#212121] overflow-hidden" data-testid="chat-page">
      {/* Mobile overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setShowMobileSidebar(false)} />
      )}

      {/* Icon Sidebar - desktop */}
      <div className="hidden md:block">
        <IconSidebar activeItem={activeIcon} onItemClick={setActiveIcon} />
      </div>

      {/* Menu Sidebar - desktop */}
      <div className="hidden lg:block">
        <MenuSidebar />
      </div>

      {/* Mobile sidebars */}
      {showMobileSidebar && (
        <div className="fixed left-0 top-0 z-40 h-full flex md:hidden">
          <IconSidebar activeItem={activeIcon} onItemClick={setActiveIcon} isMobile onClose={() => setShowMobileSidebar(false)} />
          <MenuSidebar isMobile onClose={() => setShowMobileSidebar(false)} />
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#999] hover:text-white hover:bg-[#2a2a2a] transition-colors"
              data-testid="mobile-menu-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-white font-medium text-base">Finda AI</h1>
          </div>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#999] hover:text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
            data-testid="new-chat-btn"
            onClick={() => { setMessages([]); setIsAiTyping(false); }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </header>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            // Empty state - centered input
            <div className="h-full flex flex-col items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#193B68] flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-2">How can I help you today?</h2>
                <p className="text-[#777] text-sm">Ask me anything — I'm here to assist.</p>
              </motion.div>

              {/* Centered input */}
              <div className="w-full max-w-2xl">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#193B68]/40 via-[#2563eb]/20 to-[#193B68]/40 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <div className="relative flex items-center gap-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-full px-4 py-3 focus-within:border-[#4a4a4a] transition-all duration-200">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#666] hover:text-white hover:bg-[#333] transition-colors cursor-pointer">
                      <Plus className="w-4 h-4" />
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent text-white placeholder-[#666] outline-none text-[15px]"
                      data-testid="chat-input"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                        input.trim()
                          ? "bg-white text-[#1a1a1a] hover:scale-105"
                          : "bg-[#333] text-[#555] cursor-not-allowed"
                      )}
                      data-testid="chat-send-button"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Messages
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isLatestAi={message.role === "ai" && index === messages.length - 1}
                  />
                ))}
              </AnimatePresence>

              {/* AI typing indicator */}
              {isAiTyping && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#193B68] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[#777] text-sm">
                    <span>AI is thinking</span>
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-[#777] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-1 rounded-full bg-[#777] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-1 rounded-full bg-[#777] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom input - visible when messages exist */}
        {hasMessages && (
          <div className="border-t border-[#2a2a2a] px-4 sm:px-6 py-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#193B68]/40 via-[#2563eb]/20 to-[#193B68]/40 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                <div className="relative flex items-center gap-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-full px-4 py-3 focus-within:border-[#4a4a4a] transition-all duration-200">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#666] hover:text-white hover:bg-[#333] transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent text-white placeholder-[#666] outline-none text-[15px]"
                    data-testid="chat-input-bottom"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isAiTyping}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                      input.trim() && !isAiTyping
                        ? "bg-white text-[#1a1a1a] hover:scale-105"
                        : "bg-[#333] text-[#555] cursor-not-allowed"
                    )}
                    data-testid="chat-send-button-bottom"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
