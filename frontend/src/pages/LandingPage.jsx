import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, MessageSquare, Bell, Brain, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const ETHEREAL_BG = "https://static.prod-images.emergentagent.com/jobs/720817ff-f226-4e0b-808b-5c8a498f4ec5/images/f9726b97b322dac44ab34b7edb935756c06ea42824c6ded08391e82ce24c42a0.png";

const features = [
  {
    icon: MessageSquare,
    title: "Smart Chat",
    description: "Engage in intelligent conversations with your AI assistant",
  },
  {
    icon: Bell,
    title: "Reminders",
    description: "Never miss important tasks with smart reminder management",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Powered by advanced AI to understand and assist you better",
  },
];

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-950 text-white relative overflow-hidden"
      data-testid="landing-page"
    >
      {/* Ethereal Background */}
      <img
        src={ETHEREAL_BG}
        alt=""
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-20 mix-blend-screen"
        aria-hidden="true"
      />

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold font-['Outfit'] gradient-text">BlueMind AI</span>
          </div>
          <Button
            onClick={() => navigate("/auth")}
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-white/5"
            data-testid="header-login-button"
          >
            Login
          </Button>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/30"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-['Outfit'] mb-4">
              <span className="gradient-text">BlueMind</span>{" "}
              <span className="text-white">AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-zinc-400 mb-6 font-light">
              Your intelligent assistant
            </p>

            {/* Description */}
            <p className="text-zinc-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Experience the future of productivity with BlueMind AI. Chat naturally, 
              manage reminders effortlessly, and let AI handle the complexity while you focus on what matters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/auth/register")}
                className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-xl shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/40 hover:-translate-y-0.5"
                data-testid="get-started-button"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button
                onClick={() => navigate("/auth/login")}
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-lg border-white/10 text-white hover:bg-white/5 rounded-2xl backdrop-blur-sm transition-all duration-300"
                data-testid="login-button"
              >
                Login
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold font-['Outfit'] text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-zinc-600 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Secure & Private
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
