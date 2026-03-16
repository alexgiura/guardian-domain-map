import { useState } from "react";
import { ChevronDown, ChevronRight, Globe, Server, MoreVertical, ShieldCheck, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Domain } from "@/data/mockData";
import TicketList from "./TicketList";

interface DomainRowProps {
  domain: Domain;
  onSetStatus: (id: string, status: "whitelist" | "blacklist") => void;
}

const DomainRow = ({ domain, onSetStatus }: DomainRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const isWhitelisted = domain.status === "whitelist";

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full grid grid-cols-[1fr_80px_100px_80px_44px] gap-4 items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
          {domain.type === "IP" ? <Server className="h-3.5 w-3.5 text-muted-foreground" /> : <Globe className="h-3.5 w-3.5 text-muted-foreground" />}
          <span className="font-mono text-xs">{domain.value}</span>
        </span>

        <Badge variant="outline" className="w-16 justify-center text-[10px] uppercase">
          {domain.type}
        </Badge>

        <Badge variant={isWhitelisted ? "success" : "destructive"} className="w-20 justify-center text-[10px] uppercase">
          {isWhitelisted ? "Whitelist" : "Blacklist"}
        </Badge>

        <span className="text-xs text-muted-foreground text-center">
          {domain.tickets.length}
        </span>

        <span className="flex justify-center" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isWhitelisted ? (
                <DropdownMenuItem onClick={() => onSetStatus(domain.id, "blacklist")}>
                  <ShieldOff className="h-4 w-4 mr-2 text-destructive" />
                  Trece pe Blacklist
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onSetStatus(domain.id, "whitelist")}>
                  <ShieldCheck className="h-4 w-4 mr-2 text-success" />
                  Trece pe Whitelist
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
