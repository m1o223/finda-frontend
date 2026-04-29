import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthSelectionPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#212121] text-white flex items-center justify-center p-6"
      data-testid="auth-selection-page"
    >
      <Button
        onClick={() => navigate("/")}
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
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-xl bg-[#10a37f] flex items-center justify-center mx-auto mb-5">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <p className="text-[#b4b4b4] text-sm mt-2">Choose how you want to continue</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => navigate("/auth/login")}
              className="w-full py-6 text-base bg-[#10a37f] hover:bg-[#0e8f70] text-white rounded-xl transition-all duration-200 hover:scale-[1.01]"
              data-testid="login-option-button"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>

            <Button
              onClick={() => navigate("/auth/register")}
              variant="outline"
              className="w-full py-6 text-base border-[#4a4a4a] text-white hover:bg-[#303030] rounded-xl transition-all duration-200"
              data-testid="register-option-button"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#4a4a4a]" />
            <span className="text-[#b4b4b4] text-sm">or</span>
            <div className="flex-1 h-px bg-[#4a4a4a]" />
          </div>

          <Button
            onClick={() => navigate("/chat")}
            variant="ghost"
            className="w-full text-[#b4b4b4] hover:text-white hover:bg-[#303030]"
            data-testid="guest-button"
          >
            Continue as Guest
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
