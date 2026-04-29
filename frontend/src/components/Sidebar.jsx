import { NavLink, useNavigate } from "react-router-dom";
import { MessageSquare, Bell, MessageCircleHeart, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/chat", icon: MessageSquare, label: "Chat" },
  { to: "/reminders", icon: Bell, label: "Reminders" },
  { to: "/feedback", icon: MessageCircleHeart, label: "Feedback" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-4 border-r border-[#4a4a4a] bg-[#212121]"
      data-testid="sidebar"
    >
      {/* Logo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-lg bg-[#10a37f] flex items-center justify-center mb-6 hover:bg-[#0e8f70] transition-colors"
            data-testid="sidebar-logo"
          >
            <span className="text-white font-bold text-lg">F</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#2f2f2f] text-white border-[#4a4a4a]">
          Finda
        </TooltipContent>
      </Tooltip>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-2" data-testid="sidebar-nav">
        {navItems.map((item) => (
          <Tooltip key={item.to}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.to}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={({ isActive }) =>
                  cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg transition-colors text-[#b4b4b4] hover:text-white hover:bg-[#303030]",
                    isActive && "text-white bg-[#303030]"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#2f2f2f] text-white border-[#4a4a4a]">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>

      {/* Logout */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#b4b4b4] hover:text-white hover:bg-[#303030] transition-colors"
            data-testid="logout-button"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#2f2f2f] text-white border-[#4a4a4a]">
          Logout
        </TooltipContent>
      </Tooltip>
    </aside>
  );
}
