import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ETHEREAL_BG = "https://static.prod-images.emergentagent.com/jobs/720817ff-f226-4e0b-808b-5c8a498f4ec5/images/f9726b97b322dac44ab34b7edb935756c06ea42824c6ded08391e82ce24c42a0.png";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(formData.password) },
    { label: "Contains uppercase", met: /[A-Z]/.test(formData.password) },
  ];

  const isFormValid = 
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Account created successfully!", {
      description: "Welcome to BlueMind AI",
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
      data-testid="register-page"
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
            <h1 className="text-2xl font-bold font-['Outfit'] text-white">Create Account</h1>
            <p className="text-zinc-400 mt-1">Join BlueMind AI today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="pl-12 py-6 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                  data-testid="fullname-input"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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
              {/* Password requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      <Check className={cn("w-3 h-3", req.met ? "text-emerald-400" : "text-zinc-600")} />
                      <span className={req.met ? "text-emerald-400" : "text-zinc-500"}>{req.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className={cn(
                    "pl-12 pr-12 py-6 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20 transition-all",
                    formData.confirmPassword && formData.password !== formData.confirmPassword && "border-rose-500/50"
                  )}
                  data-testid="confirm-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-rose-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              data-testid="register-submit-button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-zinc-500 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              data-testid="login-link"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
