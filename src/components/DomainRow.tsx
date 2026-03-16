import { useState } from "react";
import { ChevronDown, ChevronRight, Globe, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import type { Domain } from "@/data/mockData";
import TicketList from "./TicketList";

interface DomainRowProps {
  domain: Domain;
  onToggleStatus: (id: string) => void;
}

const DomainRow = ({ domain, onToggleStatus }: DomainRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const isWhitelisted = domain.status === "whitelist";

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
      >
        <span className="text-muted-foreground">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>

        <span className="font-mono text-xs text-muted-foreground w-20 shrink-0">{domain.id}</span>

        <span className="flex items-center gap-2 w-56 shrink-0">
          {domain.type === "IP" ? <Server className="h-3.5 w-3.5 text-muted-foreground" /> : <Globe className="h-3.5 w-3.5 text-muted-foreground" />}
          <span className="font-mono text-sm">{domain.value}</span>
        </span>

        <Badge variant="outline" className="w-16 justify-center text-[10px] uppercase">
          {domain.type}
        </Badge>

        <Badge variant={isWhitelisted ? "success" : "destructive"} className="w-20 justify-center text-[10px] uppercase">
          {isWhitelisted ? "Whitelist" : "Blacklist"}
        </Badge>

        <span className="text-xs text-muted-foreground ml-auto mr-4">
          {domain.tickets.length} ticket{domain.tickets.length !== 1 ? "e" : ""}
        </span>

        <span onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={isWhitelisted}
            onCheckedChange={() => onToggleStatus(domain.id)}
            className="data-[state=checked]:bg-success data-[state=unchecked]:bg-destructive"
          />
        </span>
      </button>

      {expanded && (
        <div className="animate-slide-down bg-muted/30 border-t border-border">
          <TicketList tickets={domain.tickets} />
        </div>
      )}
    </div>
  );
};

export default DomainRow;
