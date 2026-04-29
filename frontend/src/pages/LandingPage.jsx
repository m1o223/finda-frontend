import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Bell, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: MessageSquare, title: "Smart Chat", description: "Natural conversations powered by advanced AI" },
  { icon: Bell, title: "Reminders", description: "Organize your tasks and never miss a deadline" },
  { icon: Sparkles, title: "AI-Powered", description: "Intelligent assistance that adapts to you" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#212121] text-white"
      data-testid="landing-page"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#10a37f] flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-lg font-semibold">Finda</span>
        </div>
        <Button
          onClick={() => navigate("/auth/login")}
          variant="ghost"
          className="text-[#b4b4b4] hover:text-white hover:bg-[#303030] px-5 py-2"
          data-testid="header-login-button"
        >
          Login
        </Button>
      </header>

      {/* Hero */}
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-[#10a37f] flex items-center justify-center mx-auto mb-10">
            <span className="text-white font-bold text-3xl">F</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">Finda</h1>
          <p className="text-xl text-[#b4b4b4] mb-3">Your intelligent assistant</p>
          <p className="text-[#b4b4b4] mb-14 max-w-md mx-auto leading-relaxed">
            Chat naturally, manage reminders, and let AI handle the complexity while you focus on what matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/auth/register")}
              className="w-full sm:w-auto px-10 py-6 text-base bg-[#10a37f] hover:bg-[#0e8f70] text-white rounded-xl transition-all duration-200 hover:scale-[1.02]"
              data-testid="get-started-button"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => navigate("/auth/login")}
              variant="outline"
              className="w-full sm:w-auto px-10 py-6 text-base border-[#4a4a4a] text-white hover:bg-[#303030] rounded-xl transition-all duration-200"
              data-testid="login-button"
            >
              Login
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-28"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#2f2f2f] border border-[#4a4a4a] rounded-xl p-7 text-left hover:border-[#5a5a5a] transition-all duration-200 hover:translate-y-[-2px]"
            >
              <feature.icon className="w-6 h-6 text-[#10a37f] mb-4" />
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-[#b4b4b4] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center pb-8">
        <p className="text-[#6b6b6b] text-sm">Simple. Intelligent. Yours.</p>
      </footer>
    </motion.div>
  );
}
