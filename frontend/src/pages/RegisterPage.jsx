import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Include a number", met: /\d/.test(formData.password) },
    { label: "Include an uppercase letter", met: /[A-Z]/.test(formData.password) },
  ];

  const isFormValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.password.length >= 8;

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
      className="min-h-screen bg-white flex"
      data-testid="register-page"
    >
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#F0F4F8] flex-col items-center justify-between p-10 relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2 self-start">
          <div className="w-10 h-10 rounded-lg bg-[#193B68] flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-lg font-semibold text-[#111827]">Finda</span>
        </div>

        {/* Title */}
        <div className="text-center -mt-10">
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Create account</h1>
          <p className="text-[#6B7280] text-base">Join Finda and start your journey</p>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-sm mx-auto">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Plant */}
            <g>
              <rect x="50" y="220" width="12" height="40" rx="2" fill="#8B9EAF" opacity="0.5"/>
              <ellipse cx="56" cy="210" rx="20" ry="25" fill="#4CAF50" opacity="0.6"/>
              <ellipse cx="46" cy="200" rx="12" ry="18" fill="#66BB6A" opacity="0.5"/>
              <ellipse cx="66" cy="195" rx="10" ry="15" fill="#81C784" opacity="0.5"/>
            </g>
            {/* Chair */}
            <g>
              <path d="M120 260 L130 180 Q135 155 165 150 L260 150 Q290 155 295 180 L305 260" fill="#B0BEC5" opacity="0.3"/>
              <path d="M140 260 L145 200 Q150 175 180 172 L245 172 Q275 175 280 200 L285 260" fill="#CFD8DC" opacity="0.5"/>
              <rect x="135" y="258" width="155" height="6" rx="3" fill="#90A4AE"/>
              {/* Chair legs */}
              <rect x="145" y="264" width="6" height="30" rx="2" fill="#78909C"/>
              <rect x="275" y="264" width="6" height="30" rx="2" fill="#78909C"/>
              {/* Chair arm */}
              <path d="M130 190 Q125 185 128 175 L132 170" stroke="#90A4AE" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M295 190 Q300 185 297 175 L293 170" stroke="#90A4AE" strokeWidth="4" fill="none" strokeLinecap="round"/>
            </g>
            {/* Person */}
            <g>
              {/* Legs */}
              <path d="M200 245 L185 280 L180 290" stroke="#546E7A" strokeWidth="6" fill="none" strokeLinecap="round"/>
              <path d="M220 245 L240 275 L250 285" stroke="#546E7A" strokeWidth="6" fill="none" strokeLinecap="round"/>
              {/* Shoes */}
              <ellipse cx="177" cy="292" rx="10" ry="5" fill="#37474F"/>
              <ellipse cx="253" cy="287" rx="10" ry="5" fill="#37474F"/>
              {/* Body */}
              <path d="M190 185 Q195 220 200 240 Q205 250 220 245" fill="#B0BEC5"/>
              <rect x="180" y="175" width="50" height="55" rx="8" fill="#B0BEC5"/>
              {/* Shirt collar */}
              <path d="M195 175 L205 185 L215 175" stroke="#90A4AE" strokeWidth="2" fill="none"/>
              {/* Arms */}
              <path d="M182 190 L160 210 L170 230" stroke="#FFCCBC" strokeWidth="5" fill="none" strokeLinecap="round"/>
              <path d="M228 190 L250 205 L245 225" stroke="#FFCCBC" strokeWidth="5" fill="none" strokeLinecap="round"/>
              {/* Head */}
              <circle cx="205" cy="158" r="22" fill="#FFCCBC"/>
              {/* Hair */}
              <path d="M185 150 Q190 130 205 128 Q220 130 225 150" fill="#37474F"/>
              <path d="M183 155 Q185 145 190 142" stroke="#37474F" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Laptop */}
              <rect x="165" y="220" width="60" height="4" rx="2" fill="#1E3A5F"/>
              <rect x="170" y="200" width="50" height="20" rx="3" fill="#1E3A5F"/>
              <rect x="173" y="203" width="44" height="14" rx="2" fill="#4FC3F7" opacity="0.5"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-lg bg-[#193B68] flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-lg font-semibold text-[#111827]">Finda</span>
          </div>

          {/* Mobile title */}
          <div className="mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-[#111827] mb-1">Create account</h1>
            <p className="text-[#6B7280] text-sm">Join Finda and start your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label className="text-sm font-medium text-[#111827] mb-2 block">Full name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9CA3AF]" />
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="pl-11 py-6 bg-white border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] rounded-xl text-sm focus:border-[#193B68] focus:ring-1 focus:ring-[#193B68]"
                  data-testid="fullname-input"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-[#111827] mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9CA3AF]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a password"
                  className="pl-11 pr-11 py-6 bg-white border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] rounded-xl text-sm focus:border-[#193B68] focus:ring-1 focus:ring-[#193B68]"
                  data-testid="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>

              {/* Password requirements */}
              <div className="mt-3 space-y-1.5">
                {passwordRequirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-2">
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center border",
                      req.met ? "border-[#193B68] bg-[#193B68]" : "border-[#D1D5DB]"
                    )}>
                      {req.met && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className={cn(
                      "text-sm",
                      req.met ? "text-[#111827]" : "text-[#6B7280]"
                    )}>{req.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-6 text-base bg-[#193B68] hover:bg-[#142f54] text-white rounded-xl font-medium disabled:opacity-50 transition-all duration-200"
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

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[#9CA3AF] text-sm">or continue with</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 py-3.5 border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors"
              data-testid="google-login"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium text-[#111827]">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 py-3.5 border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors"
              data-testid="apple-login"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#111827">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm font-medium text-[#111827]">Apple</span>
            </button>
          </div>

          {/* Bottom text */}
          <p className="text-center text-[#6B7280] text-sm mt-8">
            Already have an account?{" "}
            <span className="text-[#193B68] font-medium cursor-pointer hover:underline" data-testid="signin-link">Sign in</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
