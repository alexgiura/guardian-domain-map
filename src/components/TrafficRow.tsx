import { useState } from "react";
import { ChevronDown, ChevronRight, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import type { TrafficGroup } from "@/data/mockTraffic";

interface TrafficRowProps {
  group: TrafficGroup;
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatTimestamp = (ts: string): string => {
  const d = new Date(ts);
  return d.toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const TrafficRow = ({ group }: TrafficRowProps) => {
  const [expanded, setExpanded] = useState(false);

  const inbound = group.events.filter((e) => e.direction === "inbound").length;
  const outbound = group.events.filter((e) => e.direction === "outbound").length;
  const protocols = [...new Set(group.events.map((e) => e.protocol))];
  const lastSeen = group.events[0]?.timestamp;
  const agents = [...new Set(group.events.map((e) => e.agent_id))];
  const totalBytes = group.events.reduce((sum, e) => sum + e.packet_size, 0);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full grid grid-cols-[1fr_90px_70px_70px_70px_90px_120px] gap-3 items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
          <span className="font-mono text-xs">{group.ip}</span>
        </span>

        <span className="text-xs text-muted-foreground text-center">
          {protocols.join(", ")}
        </span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex justify-center items-center gap-1 text-xs cursor-help">
                <ArrowDownLeft className="h-3 w-3 text-blue-500" />
                {inbound}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">IN = match către IP-ul din watchlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex justify-center items-center gap-1 text-xs cursor-help">
                <ArrowUpRight className="h-3 w-3 text-orange-500" />
                {outbound}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">OUT = match dinspre IP-ul din watchlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span className="text-xs text-muted-foreground text-center">
          {group.events.length}
        </span>

        <span className="text-xs text-muted-foreground text-center font-mono">
          {formatBytes(totalBytes)}
        </span>

        <span className="text-xs text-muted-foreground text-center truncate" title={lastSeen}>
          {lastSeen ? formatTimestamp(lastSeen) : "—"}
        </span>
      </button>

      {expanded && (
        <div className="animate-slide-down bg-muted/30 border-t border-border">
          <div className="px-4 py-2 pl-10">
            <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1">
              Agent(i) ({agents.length}): {agents.join(", ")}
            </div>
          </div>
          <div className="grid grid-cols-[70px_130px_60px_130px_60px_70px_70px_60px_70px_140px] gap-2 px-4 py-2 pl-10 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
            <span>Direcție</span>
            <span>Sursă</span>
            <span>Port S</span>
            <span>Destinație</span>
            <span>Port D</span>
            <span>Serviciu</span>
            <span>Protocol</span>
            <span>Flags</span>
            <span>Bytes</span>
            <span>Timestamp</span>
          </div>
          {group.events.map((ev) => (
            <div
              key={ev.id}
              className="grid grid-cols-[70px_130px_60px_130px_60px_70px_70px_60px_70px_140px] gap-2 px-4 py-2 pl-10 text-xs border-b border-border/50 last:border-b-0 hover:bg-muted/40"
            >
              <span className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {ev.direction === "inbound" ? (
                        <Badge variant="outline" className="text-[10px] gap-1 text-blue-600 border-blue-300 cursor-help">
                          <ArrowDownLeft className="h-3 w-3" /> IN
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] gap-1 text-orange-600 border-orange-300 cursor-help">
                          <ArrowUpRight className="h-3 w-3" /> OUT
                        </Badge>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {ev.direction === "inbound"
                          ? "IN = match către IP-ul din watchlist"
                          : "OUT = match dinspre IP-ul din watchlist"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              <span className="font-mono truncate" title={ev.src_ip}>{ev.src_ip}</span>
              <span className="text-muted-foreground">{ev.src_port}</span>
              <span className="font-mono truncate" title={ev.dst_ip}>{ev.dst_ip}</span>
              <span className="text-muted-foreground">{ev.dst_port}</span>
              <span className="text-muted-foreground uppercase text-[10px]">
                {ev.port_name ?? "—"}
              </span>
              <span>
                <Badge variant="outline" className="text-[10px]">
                  {ev.protocol}
                </Badge>
              </span>
              <span className="font-mono text-muted-foreground text-[10px]">{ev.tcp_flags}</span>
              <span className="text-muted-foreground font-mono">{formatBytes(ev.packet_size)}</span>
              <span className="text-muted-foreground text-[10px] font-mono">
                {formatTimestamp(ev.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrafficRow;
