import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const isFormValid = formData.email.trim() && formData.password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Welcome back!");
    setIsLoading(false);
    navigate("/chat");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-[#111827] flex items-center justify-center p-6"
      data-testid="login-page"
    >
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="fixed top-6 left-6 text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F7FA]"
        data-testid="back-button"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#193B68] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h1 className="text-xl font-semibold text-[#111827]">Welcome back</h1>
          <p className="text-[#6B7280] text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-[#111827] mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9CA3AF]" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="pl-11 py-6 bg-white border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] rounded-xl text-sm focus:border-[#193B68] focus:ring-1 focus:ring-[#193B68]"
                data-testid="email-input"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#111827] mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9CA3AF]" />
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="pl-11 pr-11 py-6 bg-white border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] rounded-xl text-sm focus:border-[#193B68] focus:ring-1 focus:ring-[#193B68]"
                data-testid="password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="border-[#E5E7EB] data-[state=checked]:bg-[#193B68] data-[state=checked]:border-[#193B68]"
                data-testid="remember-checkbox"
              />
              <label htmlFor="remember" className="text-sm text-[#6B7280] cursor-pointer">Remember me</label>
            </div>
            <button type="button" className="text-sm text-[#193B68] hover:underline" data-testid="forgot-password-link">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full py-6 text-base bg-[#193B68] hover:bg-[#142f54] text-white rounded-xl font-medium disabled:opacity-50"
            data-testid="login-submit-button"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-[#6B7280] text-sm mt-8">
          Don't have an account?{" "}
          <button onClick={() => navigate("/auth/register")} className="text-[#193B68] font-medium hover:underline" data-testid="register-link">
            Create one
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
}
