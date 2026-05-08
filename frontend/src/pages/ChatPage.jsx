import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bell, BookOpen, Clock, UserCircle, Plus, Send, Menu, X, Sparkles, PanelLeftClose, PanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { sendMessageToAI } from "../services/authService";


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
  const { prefs, t } = useApp();
  const isDark = prefs.theme === "dark";

  const navItems = [
    { id: "chat", icon: MessageSquare, label: t("chat"), action: onNewChat },
    { id: "reminders", icon: Bell, label: t("reminders"), action: () => navigate("/reminders") },
    { id: "learning", icon: BookOpen, label: t("learning"), action: () => navigate("/learning") },
    { id: "history", icon: Clock, label: t("history") },
    { id: "profile", icon: UserCircle, label: t("profile"), action: () => navigate("/profile") },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 220 : 64 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "h-full border-r flex flex-col overflow-hidden flex-shrink-0",
        isDark ? "bg-[#1e1e1e] border-[#333]" : "bg-[#F7F8FA] border-[#E5E7EB]",
        isMobile && "absolute left-0 top-0 z-50 shadow-xl"
      )}
      data-testid="sidebar"
    >
      {/* Top: Logo + Toggle */}
      <div className={cn("flex items-center justify-between p-3 border-b", isDark ? "border-[#333]" : "border-[#E5E7EB]")}>
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          data-testid="logo-new-chat"
        >
          <img src={LOGO_URL} alt="Finda" className="w-9 h-9 object-contain flex-shrink-0" style={{ background: 'none' }} />
          {isOpen && <span className={cn("text-base font-semibold whitespace-nowrap", isDark ? "text-white" : "text-[#111827]")}>Finda</span>}
        </button>
        <button
          onClick={onToggle}
          className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer", isDark ? "text-[#888] hover:text-white hover:bg-[#333]" : "text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB]")}
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
  const { prefs } = useApp();
  const isDark = prefs.theme === "dark";

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
        <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ backgroundColor: prefs.accentColor + '15' }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: prefs.accentColor }} />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] text-[15px] leading-relaxed",
          isUser
            ? "text-white px-5 py-3 rounded-2xl rounded-br-md"
            : (isDark ? "text-[#e0e0e0]" : "text-[#374151]")
        )}
        style={isUser ? { backgroundColor: prefs.chatColor } : {}}
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
  const { prefs, t } = useApp();
  const isDark = prefs.theme === "dark";

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isAiTyping, scrollToBottom]);

  const handleNewChat = () => {
    setMessages([]);
    setIsAiTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isAiTyping) return;

    const userMessage = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiTyping(true);

try {
  const response = await sendMessageToAI(input);

  const aiMessage = {
    id: Date.now() + 1,
    role: "ai",
    content: response.reply,
    isTyping: false,
  };

  setMessages((prev) => [...prev, aiMessage]);

} catch (error) {

  const errorMessage = {
    id: Date.now() + 1,
    role: "ai",
    content: "AI failed to respond",
    isTyping: false,
  };

  setMessages((prev) => [...prev, errorMessage]);

} finally {
  setIsAiTyping(false);
}
  };

  const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};

  const hasMessages = messages.length > 0;

  return (
    <div className={cn("h-screen flex overflow-hidden", isDark ? "bg-[#1a1a1a]" : "bg-white")} data-testid="chat-page">
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
        <header className={cn("flex items-center justify-between px-4 sm:px-6 py-3.5 border-b", isDark ? "border-[#333]" : "border-[#E5E7EB]")}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className={cn("md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer", isDark ? "text-[#999] hover:text-white hover:bg-[#333]" : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]")}
              data-testid="mobile-menu-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className={cn("font-medium text-base", isDark ? "text-white" : "text-[#111827]")}>Finda</span>
          </div>
          <button
            onClick={handleNewChat}
            className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer", isDark ? "text-[#999] hover:text-white hover:bg-[#333]" : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]")}
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
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: prefs.accentColor + '15' }}>
                  <Sparkles className="w-6 h-6" style={{ color: prefs.accentColor }} />
                </div>
                <h2 className={cn("text-2xl sm:text-3xl font-semibold mb-2", isDark ? "text-white" : "text-[#111827]")}>{t("howCanIHelp")}</h2>
                <p className={cn("text-sm", isDark ? "text-[#888]" : "text-[#9CA3AF]")}>{t("askMeAnything")}</p>
              </motion.div>

              {/* Centered input */}
              <div className="w-full max-w-2xl">
                <div className={cn("flex items-center gap-2 border rounded-full px-4 py-3 transition-all duration-200", isDark ? "bg-[#2a2a2a] border-[#3a3a3a] focus-within:border-[#555]" : "bg-[#F9FAFB] border-[#E5E7EB] focus-within:border-[#193B68]/40 focus-within:shadow-sm")}>
                  <button className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer", isDark ? "text-[#666] hover:text-white hover:bg-[#333]" : "text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6]")}>
                    <Plus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("askAnything")}
                    className={cn("flex-1 bg-transparent outline-none text-[15px]", isDark ? "text-white placeholder-[#666]" : "text-[#111827] placeholder-[#9CA3AF]")}
                    data-testid="chat-input"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                      input.trim()
                        ? "text-white hover:opacity-90"
                        : (isDark ? "bg-[#333] text-[#555] cursor-not-allowed" : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed")
                    )}
                    style={input.trim() ? { backgroundColor: prefs.accentColor } : {}}
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
          <div className={cn("border-t px-4 sm:px-6 py-4", isDark ? "border-[#333] bg-[#1a1a1a]" : "border-[#E5E7EB] bg-white")}>
            <div className="max-w-3xl mx-auto">
              <div className={cn("flex items-center gap-2 border rounded-full px-4 py-3 transition-all duration-200", isDark ? "bg-[#2a2a2a] border-[#3a3a3a] focus-within:border-[#555]" : "bg-[#F9FAFB] border-[#E5E7EB] focus-within:border-[#193B68]/40 focus-within:shadow-sm")}>
                <button className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer", isDark ? "text-[#666] hover:text-white hover:bg-[#333]" : "text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6]")}>
                  <Plus className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("askAnything")}
                  className={cn("flex-1 bg-transparent outline-none text-[15px]", isDark ? "text-white placeholder-[#666]" : "text-[#111827] placeholder-[#9CA3AF]")}
                  data-testid="chat-input-bottom"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isAiTyping}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                    input.trim() && !isAiTyping
                      ? "text-white hover:opacity-90"
                      : (isDark ? "bg-[#333] text-[#555] cursor-not-allowed" : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed")
                  )}
                  style={input.trim() && !isAiTyping ? { backgroundColor: prefs.accentColor } : {}}
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
