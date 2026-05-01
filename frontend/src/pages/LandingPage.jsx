import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Play, Bell, UserPlus, LayoutGrid, Sparkles, ArrowRight, Send, CheckCircle } from "lucide-react";

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
  return (
    <nav className="w-full px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between border-b border-[#E5E7EB]" data-testid="landing-navbar">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-[#193B68] flex items-center justify-center">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <span className="text-lg font-semibold text-[#111827]">Finda</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-[#6B7280] hover:text-[#111827] transition-colors text-sm font-medium">Features</a>
        <a href="#how-it-works" className="text-[#6B7280] hover:text-[#111827] transition-colors text-sm font-medium">How it Works</a>
        <a href="#about" className="text-[#6B7280] hover:text-[#111827] transition-colors text-sm font-medium">About Us</a>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/auth/login")}
          className="text-[#6B7280] hover:text-[#111827] transition-colors text-sm font-medium hidden sm:block"
          data-testid="nav-login"
        >
          Log in
        </button>
        <button
          onClick={() => navigate("/auth/register")}
          className="bg-[#193B68] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#142f54] transition-all duration-200 hover:scale-[1.02]"
          data-testid="nav-get-started"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

function HeroMockUI() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-lg shadow-[#193B68]/5 overflow-hidden w-full max-w-md" data-testid="hero-mock-ui">
      <div className="flex">
        {/* Sidebar icons */}
        <div className="w-14 border-r border-[#E5E7EB] flex flex-col items-center py-4 gap-4 bg-[#F9FAFB]">
          <div className="w-8 h-8 rounded-lg bg-[#193B68] flex items-center justify-center">
            <span className="text-white font-bold text-xs">F</span>
          </div>
          <MessageSquare className="w-5 h-5 text-[#6B7280]" />
          <Sparkles className="w-5 h-5 text-[#6B7280]" />
          <Bell className="w-5 h-5 text-[#6B7280]" />
          <Play className="w-5 h-5 text-[#6B7280]" />
          <div className="mt-auto">
            <Sparkles className="w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">
          <p className="text-[#111827] font-medium mb-4 text-sm">
            <span className="mr-1">👋</span> Hello! How can I help you today?
          </p>

          {/* Input */}
          <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-full px-4 py-2.5 mb-5">
            <span className="text-[#9CA3AF] text-sm flex-1">Ask me anything...</span>
            <div className="w-8 h-8 rounded-full bg-[#193B68] flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Mini feature cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl p-3 text-center">
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-4 h-4 text-[#193B68]" />
              </div>
              <p className="text-xs font-medium text-[#111827]">AI Chat</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">Talk with AI naturally</p>
            </div>
            <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl p-3 text-center">
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mx-auto mb-2">
                <Play className="w-4 h-4 text-[#193B68]" />
              </div>
              <p className="text-xs font-medium text-[#111827]">AI Learning</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">Watch and learn with AI</p>
            </div>
            <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl p-3 text-center">
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mx-auto mb-2">
                <Bell className="w-4 h-4 text-[#193B68]" />
              </div>
              <p className="text-xs font-medium text-[#111827]">Smart Reminders</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">Organize your tasks easily</p>
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
    <section ref={ref} className="landing-section px-6 md:px-12 lg:px-20 py-16 md:py-24" data-testid="hero-section">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left */}
        <div className="flex-1 max-w-xl">
          <span className="inline-block bg-[#EEF2FF] text-[#193B68] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            AI Assistant for Everyday Life
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] leading-tight mb-6">
            Your AI assistant for learning, chatting, and staying organized
          </h1>
          <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
            Finda brings the power of AI to your fingertips. Chat, learn, set reminders, and get things done smarter and faster.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <button
              onClick={() => navigate("/auth/register")}
              className="bg-[#193B68] text-white px-7 py-3.5 rounded-lg font-medium hover:bg-[#142f54] transition-all duration-200 hover:scale-[1.02]"
              data-testid="hero-get-started"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/chat")}
              className="border border-[#E5E7EB] text-[#111827] px-7 py-3.5 rounded-lg font-medium hover:bg-[#F5F7FA] transition-all duration-200"
              data-testid="hero-try-demo"
            >
              Try Demo
            </button>
          </div>
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <CheckCircle className="w-4 h-4 text-[#10a37f]" />
            <span>No credit card required</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center lg:justify-end">
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
    <section ref={ref} id="features" className="landing-section px-6 md:px-12 lg:px-20 py-20 bg-white" data-testid="features-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Everything you need in one place</h2>
          <p className="text-[#6B7280] text-lg">Powerful features to simplify your day-to-day life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-2xl p-8 hover:-translate-y-1 transition-all duration-200"
              data-testid={`feature-card-${feature.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-[#193B68]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">{feature.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{feature.description}</p>
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
    <section ref={ref} id="how-it-works" className="landing-section px-6 md:px-12 lg:px-20 py-20 bg-[#F9FAFB]" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">How it works</h2>
          <p className="text-[#6B7280] text-lg">Get started in just 3 simple steps.</p>
        </div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-center gap-12 md:gap-0">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-[60%] h-px bg-[#E5E7EB]" />

          {steps.map((step, index) => (
            <div key={step.num} className="flex-1 flex flex-col items-center text-center relative z-10">
              {/* Number circle */}
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] border-2 border-[#193B68] flex items-center justify-center mb-4">
                <span className="text-[#193B68] font-bold text-sm">{step.num}</span>
              </div>
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-[#193B68]" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-1">{step.title}</h3>
              <p className="text-sm text-[#6B7280] max-w-[200px]">{step.description}</p>
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
    <section ref={ref} id="about" className="landing-section px-6 md:px-12 lg:px-20 py-16" data-testid="bottom-cta-section">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#193B68] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#111827]">Start using Finda today</h3>
              <p className="text-[#6B7280] text-sm mt-1">Your AI assistant for a smarter and more productive life.</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/auth/register")}
            className="bg-[#193B68] text-white px-7 py-3.5 rounded-lg font-medium hover:bg-[#142f54] transition-all duration-200 hover:scale-[1.02] flex items-center gap-2 whitespace-nowrap"
            data-testid="cta-get-started"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
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
