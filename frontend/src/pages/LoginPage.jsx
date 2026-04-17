import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const ETHEREAL_BG = "https://static.prod-images.emergentagent.com/jobs/720817ff-f226-4e0b-808b-5c8a498f4ec5/images/f9726b97b322dac44ab34b7edb935756c06ea42824c6ded08391e82ce24c42a0.png";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isFormValid = formData.email.trim() && formData.password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Welcome back!", {
      description: "You've successfully logged in",
    });
    
    setIsLoading(false);
    navigate("/chat");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-zinc-950 text-white relative overflow-hidden flex items-center justify-center p-6"
      data-testid="login-page"
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
        onClick={() => navigate("/auth")}
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-['Outfit'] text-white">Welcome Back</h1>
            <p className="text-zinc-400 mt-1">Login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="pl-12 py-6 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                  data-testid="email-input"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 py-6 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                  data-testid="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  data-testid="remember-checkbox"
                />
                <label htmlFor="remember" className="text-sm text-zinc-400 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                data-testid="forgot-password-link"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              data-testid="login-submit-button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Register link */}
          <p className="text-center text-zinc-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/auth/register")}
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              data-testid="register-link"
            >
              Create one
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
