import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, LogOut, Mail, Check, Palette } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import LanguageSelector from "@/components/LanguageSelector";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

const chatColors = [
  { id: "#193B68", label: "Blue" },
  { id: "#10a37f", label: "Green" },
  { id: "#dc2626", label: "Red" },
  { id: "#7c3aed", label: "Purple" },
];

const accentColors = [
  { id: "#193B68", label: "Blue" },
  { id: "#0d9488", label: "Teal" },
  { id: "#4f46e5", label: "Indigo" },
  { id: "#e11d48", label: "Rose" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { prefs, updatePref, t, isDark } = useApp();

  const handleLogout = () => {
    toast.success(t("logout"));
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }} data-testid="profile-page">
      {/* Header */}
      <header className="border-b sticky top-0 z-10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            data-testid="back-button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img src={LOGO_URL} alt="Finda" className="w-8 h-8 object-contain" style={{ background: 'none' }} />
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{t("profile")}</h1>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-3 sm:px-6 py-6 sm:py-8">
        {/* User Info */}
        <section className="rounded-xl border p-5 mb-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-light)' }}>
              <Mail className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t("email")}</p>
              <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>user@example.com</p>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="rounded-xl border p-5 mb-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
          <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{t("appearance")}</h2>

          {/* Theme */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>{t("theme")}</p>
            <div className="grid grid-cols-2 gap-2 rounded-xl p-1" style={{ backgroundColor: 'var(--bg-input)' }}>
              <button
                onClick={() => updatePref("theme", "light")}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                style={prefs.theme === "light" ? { backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' } : { color: 'var(--text-muted)' }}
                data-testid="theme-light"
              >
                <Sun className="w-4 h-4" /> {t("light")}
              </button>
              <button
                onClick={() => updatePref("theme", "dark")}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                style={prefs.theme === "dark" ? { backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' } : { color: 'var(--text-muted)' }}
                data-testid="theme-dark"
              >
                <Moon className="w-4 h-4" /> {t("dark")}
              </button>
            </div>
          </div>

          {/* Chat Color */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>{t("chatColor")}</p>
            <div className="flex items-center gap-3">
              {chatColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => updatePref("chatColor", color.id)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ring-2 ring-offset-2"
                  style={{
                    backgroundColor: color.id,
                    ringColor: prefs.chatColor === color.id ? 'var(--text-primary)' : 'transparent',
                    '--tw-ring-color': prefs.chatColor === color.id ? 'var(--text-primary)' : 'transparent',
                    '--tw-ring-offset-color': 'var(--bg-card)',
                  }}
                  data-testid={`chat-color-${color.label.toLowerCase()}`}
                >
                  {prefs.chatColor === color.id && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{t("appColor")}</p>
            </div>
            <div className="flex items-center gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => updatePref("accentColor", color.id)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ring-2 ring-offset-2"
                  style={{
                    backgroundColor: color.id,
                    '--tw-ring-color': prefs.accentColor === color.id ? 'var(--text-primary)' : 'transparent',
                    '--tw-ring-offset-color': 'var(--bg-card)',
                  }}
                  data-testid={`accent-color-${color.label.toLowerCase()}`}
                >
                  {prefs.accentColor === color.id && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Language */}
        <section className="rounded-xl border p-5 mb-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t("language")}</h2>
          <LanguageSelector
            currentLang={prefs.language}
            onSelect={(code) => updatePref("language", code)}
            isDark={isDark}
          />
        </section>

        {/* Actions */}
        <section className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t("actions")}</h2>
          <div className="space-y-3">
            <button
              onClick={() => toast.info("Coming soon")}
              className="w-full py-3 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer"
              style={{ borderColor: 'var(--border-main)', color: 'var(--text-secondary)' }}
              data-testid="change-email-button"
            >
              {t("changeEmail")}
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
              style={isDark ? { borderColor: '#7f1d1d', color: '#f87171' } : {}}
              data-testid="logout-button"
            >
              {t("logout")}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
