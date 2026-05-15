import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/context/AppContext";
import LandingPage from "@/pages/LandingPage";
import AuthSelectionPage from "@/pages/AuthSelectionPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import ChatPage from "@/pages/ChatPage";
import RemindersPage from "@/pages/RemindersPage";
import FeedbackPage from "@/pages/FeedbackPage";
import ProfilePage from "@/pages/ProfilePage";
import LearningPage from "@/pages/LearningPage";
import "@/App.css";

function AppContent() {
  const location = useLocation();
  const { isRTL } = useApp();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }} dir={isRTL ? "rtl" : "ltr"}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthSelectionPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/learning" element={<LearningPage />} />
        </Routes>
      </AnimatePresence>
      <Toaster position="top-center" />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <TooltipProvider delayDuration={100}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  );
}

export default App;
