import { useState } from "react";
import { ChevronDown, ChevronRight, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TrafficGroup, TrafficEvent } from "@/data/mockTraffic";

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

const groupByAgent = (events: TrafficEvent[]): Record<string, TrafficEvent[]> => {
  return events.reduce((acc, ev) => {
    if (!acc[ev.agent_id]) acc[ev.agent_id] = [];
    acc[ev.agent_id].push(ev);
    return acc;
  }, {} as Record<string, TrafficEvent[]>);
};

const TrafficRow = ({ group }: TrafficRowProps) => {
  const [expanded, setExpanded] = useState(false);

  const inbound = group.events.filter((e) => e.direction === "inbound").length;
  const outbound = group.events.filter((e) => e.direction === "outbound").length;
  const lastSeen = group.events[0]?.timestamp;
  const totalBytes = group.events.reduce((sum, e) => sum + e.packet_size, 0);
  const byAgent = groupByAgent(group.events);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full grid grid-cols-[1fr_70px_70px_70px_90px_140px] gap-3 items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
          <span className="font-mono text-xs">{group.ip}</span>
        </span>

        <span className="flex justify-center items-center gap-1 text-xs">
          <ArrowDownLeft className="h-3 w-3 text-blue-500" />
          {inbound}
        </span>

        <span className="flex justify-center items-center gap-1 text-xs">
          <ArrowUpRight className="h-3 w-3 text-orange-500" />
          {outbound}
        </span>

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
        <div className="animate-slide-down bg-muted/30 border-t border-border p-4 space-y-3">
          {Object.entries(byAgent).map(([agentId, events]) => (
            <div key={agentId} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="px-4 py-2.5 border-b border-border bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">Agent</span>
                  <span className="font-mono text-xs">{agentId}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {events.length} {events.length === 1 ? "eveniment" : "evenimente"}
                </span>
              </div>

              <div className="grid grid-cols-[80px_140px_70px_140px_70px_80px_80px_70px_80px_150px] gap-2 px-4 py-2 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/20">
                <span>Direcție</span>
                <span>IP Sursă</span>
                <span>Port S</span>
                <span>IP Destinație</span>
                <span>Port D</span>
                <span>Serviciu</span>
                <span>Protocol</span>
                <span>Flags</span>
                <span>Bytes</span>
                <span>Timestamp</span>
              </div>

              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="grid grid-cols-[80px_140px_70px_140px_70px_80px_80px_70px_80px_150px] gap-2 px-4 py-2 text-xs border-b border-border/50 last:border-b-0 hover:bg-muted/40"
                >
                  <span className="flex items-center">
                    {ev.direction === "inbound" ? (
                      <Badge variant="outline" className="text-[10px] gap-1 text-blue-600 border-blue-300">
                        <ArrowDownLeft className="h-3 w-3" /> Inbound
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] gap-1 text-orange-600 border-orange-300">
                        <ArrowUpRight className="h-3 w-3" /> Outbound
                      </Badge>
                    )}
                  </span>
                  <span className="font-mono truncate" title={ev.src_ip}>{ev.src_ip}</span>
                  <span className="text-muted-foreground font-mono">{ev.src_port}</span>
                  <span className="font-mono truncate" title={ev.dst_ip}>{ev.dst_ip}</span>
                  <span className="text-muted-foreground font-mono">{ev.dst_port}</span>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default TrafficRow;
