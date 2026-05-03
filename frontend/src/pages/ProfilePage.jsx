import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, LogOut, Mail, Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

const chatColors = [
  { id: "blue", label: "Blue", value: "#193B68", ring: "ring-[#193B68]" },
  { id: "green", label: "Green", value: "#10a37f", ring: "ring-[#10a37f]" },
  { id: "red", label: "Red", value: "#dc2626", ring: "ring-[#dc2626]" },
  { id: "purple", label: "Purple", value: "#7c3aed", ring: "ring-[#7c3aed]" },
];

const accentColors = [
  { id: "blue", label: "Blue", value: "#193B68" },
  { id: "teal", label: "Teal", value: "#0d9488" },
  { id: "indigo", label: "Indigo", value: "#4f46e5" },
  { id: "rose", label: "Rose", value: "#e11d48" },
];

function getStoredPrefs() {
  try {
    const stored = localStorage.getItem("finda_profile_prefs");
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function storePrefs(prefs) {
  localStorage.setItem("finda_profile_prefs", JSON.stringify(prefs));
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const stored = getStoredPrefs();

  const [theme, setTheme] = useState(stored?.theme || "light");
  const [chatColor, setChatColor] = useState(stored?.chatColor || "blue");
  const [accentColor, setAccentColor] = useState(stored?.accentColor || "blue");

  // Save prefs on change
  useEffect(() => {
    storePrefs({ theme, chatColor, accentColor });
  }, [theme, chatColor, accentColor]);

  const handleThemeToggle = (newTheme) => {
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 500);
  };

  const handleChangeEmail = () => {
    toast.info("Email change coming soon");
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4 py-10" data-testid="profile-page">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 flex items-center gap-1.5 text-[#6B7280] hover:text-[#111827] transition-colors duration-200 cursor-pointer z-10"
        data-testid="back-button"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 sm:p-8"
        data-testid="profile-card"
      >
        {/* Header */}
        <div className="text-center mb-7">
          <img src={LOGO_URL} alt="Finda" className="w-10 h-10 object-contain mx-auto mb-3" style={{ background: 'none' }} />
          <h1 className="text-xl font-semibold text-[#111827]">Profile</h1>
        </div>

        {/* User Info */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-[#193B68]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#9CA3AF] mb-0.5">Email</p>
              <p className="text-sm text-[#111827] font-medium truncate">user@example.com</p>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#374151] mb-3">Theme</p>
          <div className="grid grid-cols-2 gap-2 bg-[#F3F4F6] rounded-xl p-1">
            <button
              onClick={() => handleThemeToggle("light")}
              className={cn(
                "flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                theme === "light"
                  ? "bg-white text-[#111827] shadow-sm"
                  : "text-[#6B7280] hover:text-[#111827]"
              )}
              data-testid="theme-light"
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => handleThemeToggle("dark")}
              className={cn(
                "flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                theme === "dark"
                  ? "bg-white text-[#111827] shadow-sm"
                  : "text-[#6B7280] hover:text-[#111827]"
              )}
              data-testid="theme-dark"
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </div>
        </div>

        {/* Chat Color */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#374151] mb-3">Chat Color</p>
          <div className="flex items-center gap-3">
            {chatColors.map((color) => (
              <button
                key={color.id}
                onClick={() => { setChatColor(color.id); toast.success(`Chat color set to ${color.label}`); }}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ring-2 ring-offset-2",
                  chatColor === color.id ? color.ring : "ring-transparent"
                )}
                style={{ backgroundColor: color.value }}
                data-testid={`chat-color-${color.id}`}
              >
                {chatColor === color.id && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* App Accent Color */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-[#6B7280]" />
            <p className="text-sm font-medium text-[#374151]">App Color</p>
          </div>
          <div className="flex items-center gap-3">
            {accentColors.map((color) => (
              <button
                key={color.id}
                onClick={() => { setAccentColor(color.id); toast.success(`App color set to ${color.label}`); }}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ring-2 ring-offset-2",
                  accentColor === color.id ? "ring-[#111827]" : "ring-transparent"
                )}
                style={{ backgroundColor: color.value }}
                data-testid={`accent-color-${color.id}`}
              >
                {accentColor === color.id && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E5E7EB] mb-6" />

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleChangeEmail}
            className="w-full py-3 border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all duration-200 cursor-pointer"
            data-testid="change-email-button"
          >
            Change Email
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 border border-red-200 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-200 cursor-pointer"
            data-testid="logout-button"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
