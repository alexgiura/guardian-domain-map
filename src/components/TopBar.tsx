import { User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import dnscLogo from "@/assets/dnsc-logo.svg";

interface TopBarProps {
  activeTab: "dashboard" | "domains";
  onTabChange: (tab: "dashboard" | "domains") => void;
}

const TopBar = ({ activeTab, onTabChange }: TopBarProps) => {
  return (
    <header className="h-16 bg-topbar text-topbar-foreground flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2.5">
        <img src={dnscLogo} alt="DNSC" className="h-9 w-9 rounded-full" />
        <span className="font-semibold text-base tracking-wide">DNSC</span>
      </div>

      <nav className="flex items-center gap-1 bg-topbar-foreground/[0.06] rounded-full p-1 border border-topbar-foreground/[0.08]">
        <button
          onClick={() => onTabChange("dashboard")}
          className={`px-6 py-2 text-[13px] font-medium rounded-full transition-all duration-200 ${
            activeTab === "dashboard"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-topbar-foreground/60 hover:text-topbar-foreground/90 hover:bg-topbar-foreground/[0.06]"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onTabChange("domains")}
          className={`px-6 py-2 text-[13px] font-medium rounded-full transition-all duration-200 ${
            activeTab === "domains"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-topbar-foreground/60 hover:text-topbar-foreground/90 hover:bg-topbar-foreground/[0.06]"
          }`}
        >
          Domenii
        </button>
      </nav>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-topbar-foreground/60 hover:text-topbar-foreground hover:bg-topbar-foreground/10"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-topbar" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-topbar-foreground/60 hover:text-topbar-foreground hover:bg-topbar-foreground/10"
        >
          <User className="h-[18px] w-[18px]" />
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
