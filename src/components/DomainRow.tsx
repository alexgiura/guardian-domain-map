import { useState } from "react";
import { ChevronDown, ChevronRight, Globe, Server, MoreVertical, ShieldCheck, ShieldAlert } from "lucide-react";
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
import StatusHistory from "./StatusHistory";
import WhitelistRequestList from "./WhitelistRequestList";
import WhitelistRequestHorizontal from "./WhitelistRequestHorizontal";

interface DomainRowProps {
  domain: Domain;
  onSetStatus: (id: string, status: "threat" | "trusted") => void;
}

type ExpandedTab = "tickets" | "history" | "whitelist" | "whitelist-h";

const DomainRow = ({ domain, onSetStatus }: DomainRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<ExpandedTab>("tickets");
  const isTrusted = domain.status === "trusted";
  const historyCount = (domain.statusHistory || []).length;
  const whitelistCount = (domain.whitelistRequests || []).length;

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

        <span className="flex justify-center">
          <Badge variant="outline" className="justify-center text-[10px] uppercase">
            {domain.type}
          </Badge>
        </span>

        <span className="flex justify-center">
          <Badge variant={isTrusted ? "trusted" : "threat"} className="justify-center text-[10px] uppercase">
            {isTrusted ? "Trusted" : "Threat"}
          </Badge>
        </span>

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
              {isTrusted ? (
                <DropdownMenuItem onClick={() => onSetStatus(domain.id, "threat")}>
                  <ShieldAlert className="h-4 w-4 mr-2 text-threat" />
                  Marchează ca Threat
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onSetStatus(domain.id, "trusted")}>
                  <ShieldCheck className="h-4 w-4 mr-2 text-trusted" />
                  Marchează ca Trusted
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </button>

      {expanded && (
        <div className="animate-slide-down bg-muted/30 border-t border-border">
          <div className="flex items-center gap-1 px-4 pt-3 pl-10">
            <button
              onClick={() => setActiveTab("tickets")}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
                activeTab === "tickets"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Raportări
              <span className="ml-1.5 opacity-70">{domain.tickets.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
                activeTab === "history"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Istoric Status
              {historyCount > 0 && (
                <span className="ml-1.5 opacity-70">{historyCount}</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("whitelist")}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
                activeTab === "whitelist"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Cereri Whitelistare
              {whitelistCount > 0 && (
                <span className="ml-1.5 opacity-70">{whitelistCount}</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("whitelist-h")}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
                activeTab === "whitelist-h"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Cereri (Horizontal)
              {whitelistCount > 0 && (
                <span className="ml-1.5 opacity-70">{whitelistCount}</span>
              )}
            </button>
          </div>

          {activeTab === "tickets" ? (
            <TicketList tickets={domain.tickets} />
          ) : activeTab === "history" ? (
            <StatusHistory history={domain.statusHistory || []} />
          ) : activeTab === "whitelist" ? (
            <WhitelistRequestList requests={domain.whitelistRequests || []} />
          ) : (
            <WhitelistRequestHorizontal requests={domain.whitelistRequests || []} />
          )}
        </div>
      )}
    </div>
  );
};

export default DomainRow;
