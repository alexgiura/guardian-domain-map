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

interface IpSubRowProps {
  ip: string;
  events: TrafficEvent[];
}

const IpSubRow = ({ ip, events }: IpSubRowProps) => {
  const [open, setOpen] = useState(false);
  const inbound = events.filter((e) => e.direction === "inbound").length;
  const outbound = events.filter((e) => e.direction === "outbound").length;
  const totalBytes = events.reduce((s, e) => s + e.packet_size, 0);
  const lastSeen = events[0]?.timestamp;

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full grid grid-cols-[1fr_70px_70px_70px_90px_150px] gap-3 items-center px-4 py-2.5 hover:bg-muted/40 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </span>
          <span className="font-mono text-xs">{ip}</span>
        </span>
        <span className="flex justify-center items-center gap-1 text-xs">
          <ArrowDownLeft className="h-3 w-3 text-blue-500" />
          {inbound}
        </span>
        <span className="flex justify-center items-center gap-1 text-xs">
          <ArrowUpRight className="h-3 w-3 text-orange-500" />
          {outbound}
        </span>
        <span className="text-xs text-muted-foreground text-center">{events.length}</span>
        <span className="text-xs text-muted-foreground text-center font-mono">{formatBytes(totalBytes)}</span>
        <span className="text-xs text-muted-foreground text-center font-mono">
          {lastSeen ? formatTimestamp(lastSeen) : "—"}
        </span>
      </button>

      {open && (
        <div className="bg-muted/20 border-t border-border p-3">
          <div className="bg-card border border-border rounded-md overflow-hidden">
            <div className="grid grid-cols-[80px_140px_70px_140px_70px_80px_80px_70px_80px_150px] gap-2 px-3 py-2 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/30">
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
                className="grid grid-cols-[80px_140px_70px_140px_70px_80px_80px_70px_80px_150px] gap-2 px-3 py-2 text-xs border-b border-border/50 last:border-b-0 hover:bg-muted/40"
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
        </div>
      )}
    </div>
  );
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
        <div className="animate-slide-down bg-muted/30 border-t border-border p-4">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="grid grid-cols-[1fr_70px_70px_70px_90px_150px] gap-3 px-4 py-2 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/40">
              <span className="pl-6">IP Watchlist</span>
              <span className="text-center">Inbound</span>
              <span className="text-center">Outbound</span>
              <span className="text-center">Total</span>
              <span className="text-center">Bytes</span>
              <span className="text-center">Ultima activitate</span>
            </div>
            {ipGroups.map((g) => (
              <IpSubRow key={g.ip} ip={g.ip} events={g.events} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentRow;
