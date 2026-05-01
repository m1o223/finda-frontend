import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthSelectionPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-[#111827] flex items-center justify-center p-6"
      data-testid="auth-selection-page"
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
          <h1 className="text-xl font-semibold text-[#111827]">Welcome to Finda</h1>
          <p className="text-[#6B7280] text-sm mt-1">Create an account to get started</p>
        </div>

        <Button
          onClick={() => navigate("/auth/register")}
          className="w-full py-6 text-base bg-[#193B68] hover:bg-[#142f54] text-white rounded-xl"
          data-testid="register-option-button"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Create Account
        </Button>

        <Button
          onClick={() => navigate("/chat")}
          variant="ghost"
          className="w-full mt-3 text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F7FA]"
          data-testid="guest-button"
        >
          Continue as Guest
        </Button>
      </motion.div>
    </motion.div>
  );
}
