import { useState } from "react";
import { ChevronDown, ChevronRight, Globe, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { WhitelistDomain } from "@/data/mockData";
import WhitelistRequestList from "./WhitelistRequestList";

interface WhitelistRowProps {
  domain: WhitelistDomain;
}

const statusConfig = {
  pending: { label: "În așteptare", variant: "outline" as const, className: "border-yellow-500 text-yellow-600 bg-yellow-50" },
  approved: { label: "Aprobat", variant: "trusted" as const, className: "" },
  rejected: { label: "Respins", variant: "threat" as const, className: "" },
};

const WhitelistRow = ({ domain }: WhitelistRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[domain.status];

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full grid grid-cols-[1fr_80px_100px_80px] gap-4 items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
          {domain.type === "IP" ? <Server className="h-3.5 w-3.5 text-muted-foreground" /> : <Globe className="h-3.5 w-3.5 text-muted-foreground" />}
          <span className="font-mono text-xs">{domain.value}</span>
        </span>

        <span className="flex justify-center">
          <Badge variant="outline" className="justify-center text-[10px] uppercase">
            {domain.type}
          </Badge>
        </span>

        <span className="flex justify-center">
          <Badge variant={config.variant} className={`justify-center text-[10px] uppercase ${config.className}`}>
            {config.label}
          </Badge>
        </span>

        <span className="text-xs text-muted-foreground text-center">
          {domain.requests.length}
        </span>
      </button>

      {expanded && (
        <div className="animate-slide-down bg-muted/30 border-t border-border">
          <WhitelistRequestList requests={domain.requests} />
        </div>
      )}
    </div>
  );
};

export default WhitelistRow;
