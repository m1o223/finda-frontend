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
      className="min-h-screen bg-[#212121] text-white flex items-center justify-center p-6"
      data-testid="login-page"
    >
      <Button
        onClick={() => navigate("/auth")}
        variant="ghost"
        className="fixed top-6 left-6 text-[#b4b4b4] hover:text-white hover:bg-[#303030]"
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
        <div className="bg-[#2f2f2f] border border-[#4a4a4a] rounded-2xl p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-[#10a37f] flex items-center justify-center mx-auto mb-5">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-[#b4b4b4] text-sm mt-2">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#b4b4b4] mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b4b4b4]" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="pl-10 py-5 bg-[#303030] border-[#4a4a4a] text-white placeholder-[#6b6b6b] rounded-lg focus:border-[#10a37f] focus:ring-[#10a37f]"
                  data-testid="email-input"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#b4b4b4] mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b4b4b4]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 py-5 bg-[#303030] border-[#4a4a4a] text-white placeholder-[#6b6b6b] rounded-lg focus:border-[#10a37f] focus:ring-[#10a37f]"
                  data-testid="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b4b4b4] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="border-[#4a4a4a] data-[state=checked]:bg-[#10a37f] data-[state=checked]:border-[#10a37f]"
                  data-testid="remember-checkbox"
                />
                <label htmlFor="remember" className="text-sm text-[#b4b4b4] cursor-pointer">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-[#10a37f] hover:underline"
                data-testid="forgot-password-link"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-6 text-base bg-[#10a37f] hover:bg-[#0e8f70] text-white rounded-xl disabled:opacity-50 transition-all duration-200 hover:scale-[1.01]"
              data-testid="login-submit-button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : "Login"}
            </Button>
          </form>

          <p className="text-center text-[#b4b4b4] text-sm mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/auth/register")}
              className="text-[#10a37f] hover:underline"
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
