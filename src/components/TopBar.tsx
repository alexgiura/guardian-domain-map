import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import dnscLogo from "@/assets/dnsc-logo.webp";

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

      <div className="flex bg-topbar-foreground/10 rounded-md p-0.5">
        <button
          onClick={() => onTabChange("dashboard")}
          className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-colors ${
            activeTab === "dashboard"
              ? "bg-topbar-foreground text-topbar"
              : "text-topbar-foreground/70 hover:text-topbar-foreground"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onTabChange("domains")}
          className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-colors ${
            activeTab === "domains"
              ? "bg-topbar-foreground text-topbar"
              : "text-topbar-foreground/70 hover:text-topbar-foreground"
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
