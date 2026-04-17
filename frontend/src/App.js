import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import ChatPage from "@/pages/ChatPage";
import RemindersPage from "@/pages/RemindersPage";
import FeedbackPage from "@/pages/FeedbackPage";
import "@/App.css";

const ETHEREAL_BG = "https://static.prod-images.emergentagent.com/jobs/720817ff-f226-4e0b-808b-5c8a498f4ec5/images/f9726b97b322dac44ab34b7edb935756c06ea42824c6ded08391e82ce24c42a0.png";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ChatPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="min-h-screen bg-zinc-950 text-white relative">
        {/* Ethereal Background */}
        <img 
          src={ETHEREAL_BG} 
          alt="" 
          className="ethereal-bg"
          aria-hidden="true"
        />
        
        <BrowserRouter>
          <Sidebar />
          <main className="ml-20 min-h-screen relative z-10">
            <AnimatedRoutes />
          </main>
        </BrowserRouter>
        
        <Toaster position="top-right" richColors />
      </div>
    </TooltipProvider>
  );
}

export default App;
