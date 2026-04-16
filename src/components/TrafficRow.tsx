import { useState } from "react";
import { ChevronDown, ChevronRight, ArrowDownLeft, ArrowUpRight, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TrafficEvent } from "@/data/mockTraffic";
import { groupTrafficByIp } from "@/data/mockTraffic";

interface AgentRowProps {
  agentId: string;
  events: TrafficEvent[];
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

const AgentRow = ({ agentId, events }: AgentRowProps) => {
  const [expanded, setExpanded] = useState(false);

  const ipGroups = groupTrafficByIp(events);
  const totalBytes = events.reduce((s, e) => s + e.packet_size, 0);
  const lastSeen = [...events].sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0]?.timestamp;

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full grid grid-cols-[1fr_100px_100px_100px_140px] gap-3 items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
          <Server className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-mono text-xs">{agentId}</span>
        </span>
        <span className="text-xs text-muted-foreground text-center">{ipGroups.length}</span>
        <span className="text-xs text-muted-foreground text-center">{events.length}</span>
        <span className="text-xs text-muted-foreground text-center font-mono">{formatBytes(totalBytes)}</span>
        <span className="text-xs text-muted-foreground text-center font-mono">
          {lastSeen ? formatTimestamp(lastSeen) : "—"}
        </span>
      </button>

      {expanded && (
        <div className="animate-slide-down bg-muted/30 border-t border-border p-4 space-y-4">
          {ipGroups.map((g) => {
            const ipInbound = g.events.filter((e) => e.direction === "inbound").length;
            const ipOutbound = g.events.filter((e) => e.direction === "outbound").length;
            const ipBytes = g.events.reduce((s, e) => s + e.packet_size, 0);

            return (
              <div key={g.ip} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground">IP Watchlist</span>
                    <span className="font-mono text-xs">{g.ip}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ArrowDownLeft className="h-3 w-3 text-blue-500" />
                      {ipInbound} in
                    </span>
                    <span className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-orange-500" />
                      {ipOutbound} out
                    </span>
                    <span className="font-mono">{formatBytes(ipBytes)}</span>
                    <span>
                      {g.events.length} {g.events.length === 1 ? "eveniment" : "evenimente"}
                    </span>
                  </div>
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

                {g.events.map((ev) => (
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
                    <span className="text-muted-foreground uppercase text-[10px]">{ev.port_name ?? "—"}</span>
                    <span>
                      <Badge variant="outline" className="text-[10px]">{ev.protocol}</Badge>
                    </span>
                    <span className="font-mono text-muted-foreground text-[10px]">{ev.tcp_flags}</span>
                    <span className="text-muted-foreground font-mono">{formatBytes(ev.packet_size)}</span>
                    <span className="text-muted-foreground text-[10px] font-mono">{formatTimestamp(ev.timestamp)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AgentRow;
