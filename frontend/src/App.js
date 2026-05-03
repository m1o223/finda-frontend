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

const dashboardRoutes = ["/reminders", "/feedback"];

function AppContent() {
  const location = useLocation();
  const showSidebar = dashboardRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className={showSidebar ? "min-h-screen bg-[#212121] text-white" : "min-h-screen"}>
      {showSidebar && <Sidebar />}
      
      <main className={showSidebar ? "ml-16 min-h-screen" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthSelectionPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Toaster position="top-center" />
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
