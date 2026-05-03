import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bell, BookOpen, Clock, UserCircle, Plus, Send, Menu, X, Sparkles, PanelLeftClose, PanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

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
      {!isComplete && <span className="inline-block w-0.5 h-5 bg-[#193B68] ml-0.5 animate-pulse align-middle" />}
    </span>
  );
}

function Sidebar({ isOpen, onToggle, onNewChat, isMobile, onClose }) {
  const navigate = useNavigate();

  const navItems = [
    { id: "chat", icon: MessageSquare, label: "Chat", action: onNewChat },
    { id: "reminders", icon: Bell, label: "Reminders", action: () => navigate("/reminders") },
    { id: "learning", icon: BookOpen, label: "Learning" },
    { id: "history", icon: Clock, label: "History" },
    { id: "profile", icon: UserCircle, label: "Profile" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 220 : 64 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "h-full bg-[#F7F8FA] border-r border-[#E5E7EB] flex flex-col overflow-hidden flex-shrink-0",
        isMobile && "absolute left-0 top-0 z-50 shadow-xl"
      )}
      data-testid="sidebar"
    >
      {/* Top: Logo + Toggle */}
      <div className="flex items-center justify-between p-3 border-b border-[#E5E7EB]">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          data-testid="logo-new-chat"
        >
          <img src={LOGO_URL} alt="Finda" className="w-9 h-9 object-contain flex-shrink-0" style={{ background: 'none' }} />
          {isOpen && <span className="text-base font-semibold text-[#111827] whitespace-nowrap">Finda</span>}
        </button>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] transition-all duration-200 cursor-pointer"
          data-testid="sidebar-toggle"
        >
          {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Chat button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className={cn(
            "flex items-center gap-2.5 rounded-xl text-[#111827] hover:bg-[#E5E7EB] transition-all duration-200 cursor-pointer w-full",
            isOpen ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"
          )}
          data-testid="new-chat-button"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">New Chat</span>}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { item.action?.(); if (isMobile) onClose?.(); }}
            className={cn(
              "flex items-center gap-2.5 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] transition-all duration-200 cursor-pointer w-full",
              isOpen ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"
            )}
            data-testid={`nav-${item.id}`}
          >
            <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
            {isOpen && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>
    </motion.aside>
  );
}

function ChatMessage({ message, isLatestAi }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}
      data-testid={`chat-message-${message.role}`}
    >
      {/* AI icon */}
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#193B68]" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] text-[15px] leading-relaxed",
          isUser
            ? "bg-[#193B68] text-white px-5 py-3 rounded-2xl rounded-br-md"
            : "text-[#374151]"
        )}
      >
        {!isUser && isLatestAi && message.isTyping ? (
          <TypingText text={message.content} onComplete={message.onTypingComplete} />
        ) : (
          message.content
        )}
      </div>
    </motion.div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isAiTyping, scrollToBottom]);

  const handleNewChat = () => {
    setMessages([]);
    setIsAiTyping(false);
  };

  const handleSend = () => {
    if (!input.trim() || isAiTyping) return;

    const userMessage = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiTyping(true);

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
    <div className="h-screen flex bg-white overflow-hidden" data-testid="chat-page">
      {/* Mobile overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setShowMobileSidebar(false)} />
      )}

      {/* Sidebar - desktop */}
      <div className="hidden md:block h-full">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onNewChat={handleNewChat} />
      </div>

      {/* Sidebar - mobile */}
      {showMobileSidebar && (
        <div className="md:hidden fixed left-0 top-0 z-50 h-full">
          <Sidebar isOpen={true} onToggle={() => setShowMobileSidebar(false)} onNewChat={() => { handleNewChat(); setShowMobileSidebar(false); }} isMobile onClose={() => setShowMobileSidebar(false)} />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              data-testid="mobile-menu-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-[#111827] font-medium text-base">Finda</span>
          </div>
          <button
            onClick={handleNewChat}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            data-testid="header-new-chat"
          >
            <Plus className="w-5 h-5" />
          </button>
        </header>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            <div className="h-full flex flex-col items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-6 h-6 text-[#193B68]" />
                </div>
                <h2 className="text-[#111827] text-2xl sm:text-3xl font-semibold mb-2">How can I help you today?</h2>
                <p className="text-[#9CA3AF] text-sm">Ask me anything — I'm here to assist.</p>
              </motion.div>

              {/* Centered input */}
              <div className="w-full max-w-2xl">
                <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full px-4 py-3 focus-within:border-[#193B68]/40 focus-within:shadow-sm transition-all duration-200">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent text-[#111827] placeholder-[#9CA3AF] outline-none text-[15px]"
                    data-testid="chat-input"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                      input.trim()
                        ? "bg-[#193B68] text-white hover:bg-[#142f54]"
                        : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                    )}
                    data-testid="chat-send-button"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isLatestAi={message.role === "ai" && index === messages.length - 1}
                  />
                ))}
              </AnimatePresence>

              {/* AI thinking indicator */}
              {isAiTyping && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#193B68]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom input */}
        {hasMessages && (
          <div className="border-t border-[#E5E7EB] px-4 sm:px-6 py-4 bg-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full px-4 py-3 focus-within:border-[#193B68]/40 focus-within:shadow-sm transition-all duration-200">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-[#111827] placeholder-[#9CA3AF] outline-none text-[15px]"
                  data-testid="chat-input-bottom"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isAiTyping}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                    input.trim() && !isAiTyping
                      ? "bg-[#193B68] text-white hover:bg-[#142f54]"
                      : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                  )}
                  data-testid="chat-send-button-bottom"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
