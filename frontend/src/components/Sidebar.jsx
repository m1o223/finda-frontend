import { NavLink } from "react-router-dom";
import { MessageSquare, Bell, MessageCircleHeart, Sparkles, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const navItems = [
  { to: "/chat", icon: MessageSquare, label: "Chat" },
  { to: "/reminders", icon: Bell, label: "Reminders" },
  { to: "/feedback", icon: MessageCircleHeart, label: "Feedback" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-6 border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl z-50"
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className="mb-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => navigate("/")}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center glow-purple cursor-pointer hover:scale-105 transition-transform"
              data-testid="sidebar-logo"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
            BlueMind AI
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-3" data-testid="sidebar-nav">
        {navItems.map((item) => (
          <Tooltip key={item.to}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.to}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={({ isActive }) =>
                  cn(
                    "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer",
                    isActive && "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>

      {/* Logout button */}
      <div className="mt-auto mb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => navigate("/")}
              className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
              data-testid="logout-button"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
            Logout
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Bottom indicator */}
      <div>
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
      </div>
    </aside>
  );
}
