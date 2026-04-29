import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Account created successfully!");
    setIsLoading(false);
    navigate("/chat");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#212121] text-white flex items-center justify-center p-6"
      data-testid="register-page"
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
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-[#b4b4b4] text-sm mt-2">Join Finda today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#b4b4b4] mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b4b4b4]" />
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your name"
                  className="pl-10 py-5 bg-[#303030] border-[#4a4a4a] text-white placeholder-[#6b6b6b] rounded-lg focus:border-[#10a37f] focus:ring-[#10a37f]"
                  data-testid="fullname-input"
                />
              </div>
            </div>

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
                  placeholder="Create password"
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
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      <Check className={cn("w-3 h-3", req.met ? "text-[#10a37f]" : "text-[#6b6b6b]")} />
                      <span className={req.met ? "text-[#10a37f]" : "text-[#6b6b6b]"}>{req.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-[#b4b4b4] mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b4b4b4]" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className={cn(
                    "pl-10 pr-10 py-5 bg-[#303030] border-[#4a4a4a] text-white placeholder-[#6b6b6b] rounded-lg focus:border-[#10a37f] focus:ring-[#10a37f]",
                    formData.confirmPassword && formData.password !== formData.confirmPassword && "border-red-500"
                  )}
                  data-testid="confirm-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b4b4b4] hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-6 text-base bg-[#10a37f] hover:bg-[#0e8f70] text-white rounded-xl disabled:opacity-50 mt-4 transition-all duration-200 hover:scale-[1.01]"
              data-testid="register-submit-button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </span>
              ) : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-[#b4b4b4] text-sm mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-[#10a37f] hover:underline"
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
