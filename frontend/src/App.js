import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import LandingPage from "@/pages/LandingPage";
import AuthSelectionPage from "@/pages/AuthSelectionPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import ChatPage from "@/pages/ChatPage";
import RemindersPage from "@/pages/RemindersPage";
import FeedbackPage from "@/pages/FeedbackPage";
import "@/App.css";

const ETHEREAL_BG = "https://static.prod-images.emergentagent.com/jobs/720817ff-f226-4e0b-808b-5c8a498f4ec5/images/f9726b97b322dac44ab34b7edb935756c06ea42824c6ded08391e82ce24c42a0.png";

// Pages that should show the sidebar (dashboard pages)
const dashboardRoutes = ["/chat", "/reminders", "/feedback"];

function AppContent() {
  const location = useLocation();
  const showSidebar = dashboardRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      {/* Ethereal Background - only for dashboard pages */}
      {showSidebar && (
        <img 
          src={ETHEREAL_BG} 
          alt="" 
          className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-15 mix-blend-screen"
          aria-hidden="true"
        />
      )}
      
      {showSidebar && <Sidebar />}
      
      <main className={showSidebar ? "ml-20 min-h-screen relative z-10" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthSelectionPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            
            {/* Dashboard routes */}
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Toaster position="top-right" richColors />
    </div>
  );
}

function App() {
  return (
    <TooltipProvider delayDuration={100}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
