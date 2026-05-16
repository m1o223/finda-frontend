import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bell, BookOpen, Clock, UserCircle, Plus, Send, Menu, Sparkles, PanelLeftClose, PanelLeft, MessageCircleHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

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
    indexRef.current = 0; setDisplayedText(""); setIsComplete(false);
    const interval = setInterval(() => {
      if (indexRef.current < text.length) { setDisplayedText(text.slice(0, indexRef.current + 1)); indexRef.current++; }
      else { setIsComplete(true); onComplete?.(); clearInterval(interval); }
    }, 18);
    return () => clearInterval(interval);
  }, [text, onComplete]);
  return <span>{displayedText}{!isComplete && <span className="inline-block w-0.5 h-5 ml-0.5 animate-pulse align-middle" style={{ backgroundColor: 'var(--text-primary)' }} />}</span>;
}

function Sidebar({ isOpen, onToggle, onNewChat, isMobile, onClose }) {
  const navigate = useNavigate();
  const { t } = useApp();
  const navItems = [
    { id: "chat", icon: MessageSquare, label: t("chat"), action: onNewChat },
    { id: "reminders", icon: Bell, label: t("reminders"), action: () => navigate("/reminders") },
    { id: "learning", icon: BookOpen, label: t("learning"), action: () => navigate("/learning") },
    { id: "history", icon: Clock, label: t("history") },
    { id: "feedback", icon: MessageCircleHeart, label: "Feedback", action: () => navigate("/feedback") },
    { id: "profile", icon: UserCircle, label: t("profile"), action: () => navigate("/profile") },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 220 : 64 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn("h-full border-r flex flex-col overflow-hidden flex-shrink-0", isMobile && "absolute left-0 top-0 z-50 shadow-xl")}
      style={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border-main)' }}
      data-testid="sidebar"
    >
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'var(--border-main)' }}>
        <button onClick={onNewChat} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" data-testid="logo-new-chat">
          <img src={LOGO_URL} alt="Finda" className="w-9 h-9 object-contain flex-shrink-0" style={{ background: 'none' }} />
          {isOpen && <span className="text-base font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Finda</span>}
        </button>
        <button onClick={onToggle} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer" style={{ color: 'var(--text-muted)' }} data-testid="sidebar-toggle">
          {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-3">
        <button onClick={onNewChat} className={cn("flex items-center gap-2.5 rounded-xl transition-all duration-200 cursor-pointer w-full", isOpen ? "px-3 py-2.5" : "px-0 py-2.5 justify-center")} style={{ color: 'var(--text-primary)' }} data-testid="new-chat-button">
          <Plus className="w-4 h-4 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">{t("newChat")}</span>}
        </button>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => { item.action?.(); if (isMobile) onClose?.(); }} className={cn("flex items-center gap-2.5 rounded-xl transition-all duration-200 cursor-pointer w-full", isOpen ? "px-3 py-2.5" : "px-0 py-2.5 justify-center")} style={{ color: 'var(--text-secondary)' }} data-testid={`nav-${item.id}`}>
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={cn("flex w-full mb-4 sm:mb-6", isUser ? "justify-end" : "justify-start")} data-testid={`chat-message-${message.role}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ backgroundColor: 'var(--accent-light)' }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
        </div>
      )}
      <div className={cn("max-w-[75%] text-[15px] leading-relaxed", isUser ? "text-white px-5 py-3 rounded-2xl rounded-br-md" : "")} style={isUser ? { backgroundColor: 'var(--chat-color)' } : { color: 'var(--text-primary)' }}>
        {!isUser && isLatestAi && message.isTyping ? <TypingText text={message.content} onComplete={message.onTypingComplete} /> : message.content}
      </div>
    </motion.div>
  );
}

function ChatInput({ input, setInput, onSend, disabled, testId }) {
  const { t } = useApp();
  return (
    <div className="flex items-center gap-2 border rounded-full px-4 py-3 transition-all duration-200" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-main)' }}>
      <button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{ color: 'var(--text-muted)' }}>
        <Plus className="w-4 h-4" />
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
        placeholder={t("askAnything")}
        className="flex-1 bg-transparent outline-none text-[15px]"
        style={{ color: 'var(--text-primary)' }}
        data-testid={testId}
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
        style={!disabled ? { backgroundColor: 'var(--accent)', color: '#fff' } : { backgroundColor: 'var(--border-main)', color: 'var(--text-muted)', cursor: 'not-allowed' }}
        data-testid={`${testId}-send`}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useApp();

  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);
  useEffect(() => { scrollToBottom(); }, [messages, isAiTyping, scrollToBottom]);

  const handleNewChat = () => { setMessages([]); setIsAiTyping(false); };

  const handleSend = () => {
    if (!input.trim() || isAiTyping) return;
    const userMessage = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiTyping(true);
    setTimeout(() => {
      const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMessage = { id: Date.now() + 1, role: "ai", content: response, isTyping: true,
        onTypingComplete: () => { setMessages((prev) => prev.map((m) => (m.id === aiMessage.id ? { ...m, isTyping: false } : m))); setIsAiTyping(false); },
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }} data-testid="chat-page">
      {showMobileSidebar && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setShowMobileSidebar(false)} />}
      <div className="hidden md:block h-full">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onNewChat={handleNewChat} />
      </div>
      {showMobileSidebar && (
        <div className="md:hidden fixed left-0 top-0 z-50 h-full">
          <Sidebar isOpen={true} onToggle={() => setShowMobileSidebar(false)} onNewChat={() => { handleNewChat(); setShowMobileSidebar(false); }} isMobile onClose={() => setShowMobileSidebar(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col h-full min-w-0">
        <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b" style={{ borderColor: 'var(--border-main)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMobileSidebar(true)} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer" style={{ color: 'var(--text-muted)' }} data-testid="mobile-menu-btn"><Menu className="w-5 h-5" /></button>
            <span className="font-medium text-base" style={{ color: 'var(--text-primary)' }}>Finda</span>
          </div>
          <button onClick={handleNewChat} className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer" style={{ color: 'var(--text-muted)' }} data-testid="header-new-chat"><Plus className="w-5 h-5" /></button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            <div className="h-full flex flex-col items-center justify-center px-3 sm:px-6">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5" style={{ backgroundColor: 'var(--accent-light)' }}>
                  <Sparkles className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t("howCanIHelp")}</h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t("askMeAnything")}</p>
              </motion.div>
              <div className="w-full max-w-2xl px-0">
                <ChatInput input={input} setInput={setInput} onSend={handleSend} disabled={!input.trim()} testId="chat-input" />
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-0 sm:px-6 py-5 sm:py-8">
              <AnimatePresence>
                {messages.map((message, index) => <ChatMessage key={message.id} message={message} isLatestAi={message.role === "ai" && index === messages.length - 1} />)}
              </AnimatePresence>
              {isAiTyping && messages[messages.length - 1]?.role === "user" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-light)' }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {hasMessages && (
          <div className="border-t px-3 sm:px-6 py-3 sm:py-4" style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-page)' }}>
            <div className="max-w-3xl mx-auto">
              <ChatInput input={input} setInput={setInput} onSend={handleSend} disabled={!input.trim() || isAiTyping} testId="chat-input-bottom" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
