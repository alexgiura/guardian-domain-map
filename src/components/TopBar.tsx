import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import dnscLogo from "@/assets/dnsc-logo.svg";

interface TopBarProps {
  activeTab: "dashboard" | "domains";
  onTabChange: (tab: "dashboard" | "domains") => void;
}

const TopBar = ({ activeTab, onTabChange }: TopBarProps) => {
  return (
    <header className="h-16 bg-topbar text-topbar-foreground flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        <img src={dnscLogo} alt="DNSC" className="h-9 w-9 rounded-full" />
        <span className="font-semibold text-sm tracking-wide">DNSC</span>
      </div>

      <div className="flex gap-1 bg-topbar-foreground/[0.08] rounded-lg p-1 backdrop-blur-sm border border-topbar-foreground/[0.06]">
        <button
          onClick={() => onTabChange("dashboard")}
          className={`px-5 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200 ${
            activeTab === "dashboard"
              ? "bg-topbar-foreground/95 text-topbar shadow-sm"
              : "text-topbar-foreground/50 hover:text-topbar-foreground/80 hover:bg-topbar-foreground/[0.06]"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onTabChange("domains")}
          className={`px-5 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200 ${
            activeTab === "domains"
              ? "bg-topbar-foreground/95 text-topbar shadow-sm"
              : "text-topbar-foreground/50 hover:text-topbar-foreground/80 hover:bg-topbar-foreground/[0.06]"
          }`}
        >
          Domenii
        </button>
      </div>

      <Button variant="ghost" size="icon" className="text-topbar-foreground/70 hover:text-topbar-foreground hover:bg-topbar-foreground/10">
        <User className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default TopBar;
