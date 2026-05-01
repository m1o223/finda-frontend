import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Play, Bell, UserPlus, LayoutGrid, Sparkles, ArrowRight, Send, CheckCircle, Menu, X } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

function useScrollFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("landing-visible");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between relative" data-testid="landing-navbar">
      <div className="flex items-center gap-3">
        <img src={LOGO_URL} alt="Finda" className="w-11 h-11 rounded-lg object-contain bg-transparent" />
        <span className="text-xl font-semibold text-[#111827]">Finda</span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-[#6B7280] hover:text-[#111827] transition-colors text-sm font-medium">Features</a>
      </div>

      {/* Desktop CTA */}
      <button
        onClick={() => navigate("/auth/register")}
        className="hidden md:block bg-[#193B68] text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-[#142f54] transition-all duration-200 hover:scale-[1.02]"
        data-testid="nav-get-started"
      >
        Get Started
      </button>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#111827] hover:bg-[#F5F7FA] transition-colors"
        data-testid="mobile-menu-toggle"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E5E7EB] shadow-lg z-50 p-6 flex flex-col gap-4 md:hidden" data-testid="mobile-menu">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#6B7280] hover:text-[#111827] transition-colors text-base font-medium py-2"
          >
            Features
          </a>
          <button
            onClick={() => { navigate("/auth/register"); setMobileMenuOpen(false); }}
            className="bg-[#193B68] text-white px-7 py-3.5 rounded-lg text-base font-medium hover:bg-[#142f54] transition-all duration-200 w-full"
            data-testid="mobile-get-started"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroMockUI() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl shadow-[#193B68]/8 overflow-hidden w-full max-w-xl" data-testid="hero-mock-ui">
      <div className="flex">
        {/* Sidebar icons */}
        <div className="w-[72px] border-r border-[#E5E7EB] flex flex-col items-center py-6 gap-6 bg-[#F9FAFB]">
          <img src={LOGO_URL} alt="F" className="w-10 h-10 rounded-lg object-contain bg-transparent" />
          <MessageSquare className="w-[22px] h-[22px] text-[#6B7280]" />
          <Sparkles className="w-[22px] h-[22px] text-[#6B7280]" />
          <Bell className="w-[22px] h-[22px] text-[#6B7280]" />
          <Play className="w-[22px] h-[22px] text-[#6B7280]" />
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <p className="text-[#111827] font-medium mb-6 text-lg">
            <span className="mr-2">👋</span> Hello! How can I help you today?
          </p>

          {/* Input */}
          <div className="flex items-center gap-3 border border-[#E5E7EB] rounded-full px-5 py-3.5 mb-7">
            <span className="text-[#9CA3AF] text-base flex-1">Ask me anything...</span>
            <div className="w-10 h-10 rounded-full bg-[#193B68] flex items-center justify-center">
              <Send className="w-[18px] h-[18px] text-white" />
            </div>
          </div>

          {/* Mini feature cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
              <div className="w-11 h-11 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-[22px] h-[22px] text-[#193B68]" />
              </div>
              <p className="text-sm font-semibold text-[#111827]">AI Chat</p>
              <p className="text-xs text-[#6B7280] mt-1">Talk with AI naturally</p>
            </div>
            <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
              <div className="w-11 h-11 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mx-auto mb-3">
                <Play className="w-[22px] h-[22px] text-[#193B68]" />
              </div>
              <p className="text-sm font-semibold text-[#111827]">AI Learning</p>
              <p className="text-xs text-[#6B7280] mt-1">Watch and learn with AI</p>
            </div>
            <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
              <div className="w-11 h-11 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mx-auto mb-3">
                <Bell className="w-[22px] h-[22px] text-[#193B68]" />
              </div>
              <p className="text-sm font-semibold text-[#111827]">Smart Reminders</p>
              <p className="text-xs text-[#6B7280] mt-1">Organize your tasks easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const ref = useScrollFadeIn();

  return (
    <section ref={ref} className="landing-section px-6 md:px-12 lg:px-20 py-20 md:py-28" data-testid="hero-section">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left */}
        <div className="flex-1 max-w-lg">
          <span className="inline-block bg-[#EEF2FF] text-[#193B68] text-xs font-semibold px-4 py-1.5 rounded-full mb-7 tracking-wide uppercase">
            AI Assistant for Everyday Life
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] leading-tight mb-7">
            Your AI assistant for learning, chatting, and staying organized
          </h1>
          <p className="text-[#6B7280] text-lg leading-relaxed mb-9">
            Finda brings the power of AI to your fingertips. Chat, learn, set reminders, and get things done smarter and faster.
          </p>
          <div className="mb-5">
            <button
              onClick={() => navigate("/auth/register")}
              className="bg-[#193B68] text-white px-9 py-4.5 rounded-xl font-medium text-base hover:bg-[#142f54] transition-all duration-200 hover:scale-[1.02]"
              data-testid="hero-get-started"
            >
              Get Started
            </button>
          </div>
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <CheckCircle className="w-[18px] h-[18px] text-[#10a37f]" />
            <span>No credit card required</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <HeroMockUI />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const ref = useScrollFadeIn();
  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat",
      description: "Talk with AI naturally and get instant, context-aware support whenever you need it.",
    },
    {
      icon: Play,
      title: "AI Learning",
      description: "Watch and learn with AI-powered content tailored to your pace and interests.",
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Organize your tasks and reminders effortlessly and never miss what matters.",
    },
  ];

  return (
    <section ref={ref} id="features" className="landing-section px-6 md:px-12 lg:px-20 py-24 bg-white" data-testid="features-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">Everything you need in one place</h2>
          <p className="text-[#6B7280] text-lg">Powerful features to simplify your day-to-day life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-2xl p-9 hover:-translate-y-1 transition-all duration-200"
              data-testid={`feature-card-${feature.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="w-14 h-14 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5">
                <feature.icon className="w-7 h-7 text-[#193B68]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-3">{feature.title}</h3>
              <p className="text-[#6B7280] text-[15px] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useScrollFadeIn();
  const steps = [
    { num: 1, icon: UserPlus, title: "Sign up", description: "Create your account in seconds." },
    { num: 2, icon: LayoutGrid, title: "Choose a feature", description: "Pick what you need: chat, learn, or reminders." },
    { num: 3, icon: Sparkles, title: "Start using AI", description: "Let AI help you get things done smarter." },
  ];

  return (
    <section ref={ref} id="how-it-works" className="landing-section px-6 md:px-12 lg:px-20 py-24 bg-[#F9FAFB]" data-testid="how-it-works-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">How it works</h2>
          <p className="text-[#6B7280] text-lg">Get started in just 3 simple steps.</p>
        </div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-center gap-12 md:gap-0">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-[55%] h-px bg-[#E5E7EB]" />

          {steps.map((step) => (
            <div key={step.num} className="flex-1 flex flex-col items-center text-center relative z-10">
              <div className="w-11 h-11 rounded-full bg-[#EEF2FF] border-2 border-[#193B68] flex items-center justify-center mb-5">
                <span className="text-[#193B68] font-bold text-sm">{step.num}</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5">
                <step.icon className="w-7 h-7 text-[#193B68]" />
              </div>
              <h3 className="font-semibold text-[#111827] text-base mb-1.5">{step.title}</h3>
              <p className="text-sm text-[#6B7280] max-w-[220px] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  const navigate = useNavigate();
  const ref = useScrollFadeIn();

  return (
    <section ref={ref} className="landing-section px-6 md:px-12 lg:px-20 py-20" data-testid="bottom-cta-section">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-2xl px-8 md:px-14 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <img src={LOGO_URL} alt="Finda" className="w-14 h-14 rounded-xl object-contain bg-transparent flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#111827]">Start using Finda today</h3>
              <p className="text-[#6B7280] text-sm mt-1.5">Your AI assistant for a smarter and more productive life.</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/auth/register")}
            className="bg-[#193B68] text-white px-9 py-4 rounded-xl font-medium hover:bg-[#142f54] transition-all duration-200 hover:scale-[1.02] flex items-center gap-2 whitespace-nowrap"
            data-testid="cta-get-started"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="landing-page">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BottomCTA />
    </div>
  );
}
