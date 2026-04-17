import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ETHEREAL_BG = "https://static.prod-images.emergentagent.com/jobs/720817ff-f226-4e0b-808b-5c8a498f4ec5/images/f9726b97b322dac44ab34b7edb935756c06ea42824c6ded08391e82ce24c42a0.png";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function AuthSelectionPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-zinc-950 text-white relative overflow-hidden flex items-center justify-center p-6"
      data-testid="auth-selection-page"
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
      </div>

      {/* Back button */}
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="fixed top-6 left-6 text-zinc-400 hover:text-white hover:bg-white/5 z-20"
        data-testid="back-button"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Button>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-500/10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-['Outfit'] text-white">Welcome</h1>
            <p className="text-zinc-400 mt-1">Choose how you want to continue</p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/auth/login")}
              className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 hover:-translate-y-0.5"
              data-testid="login-option-button"
            >
              <LogIn className="w-5 h-5 mr-3" />
              Login
            </Button>

            <Button
              onClick={() => navigate("/auth/register")}
              variant="outline"
              className="w-full py-6 text-lg border-white/10 text-white hover:bg-white/5 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/20"
              data-testid="register-option-button"
            >
              <UserPlus className="w-5 h-5 mr-3" />
              Create Account
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-zinc-500 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Continue as guest */}
          <Button
            onClick={() => navigate("/chat")}
            variant="ghost"
            className="w-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            data-testid="guest-button"
          >
            Continue as Guest
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
