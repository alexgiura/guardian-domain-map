export interface TrafficEvent {
  id: string;
  agent_id: string;
  exported_at: string;
  timestamp: string;
  protocol: string;
  src_ip: string;
  src_port: number;
  dst_ip: string;
  dst_port: number;
  watchlist_match: "src" | "dst";
  port_name?: string;
  direction: "inbound" | "outbound";
  tcp_flags: string;
  packet_size: number;
}

export interface TrafficGroup {
  ip: string;
  events: TrafficEvent[];
}

export const mockTrafficEvents: TrafficEvent[] = [
  { id: "T-001", agent_id: "Alexandrus-MacBook-Pro.local", exported_at: "2026-04-16T11:07:09Z", timestamp: "2026-04-16T11:07:09Z", protocol: "TCP", src_ip: "192.168.100.124", src_port: 60469, dst_ip: "80.241.218.175", dst_port: 80, watchlist_match: "dst", port_name: "http", direction: "inbound", tcp_flags: "FA", packet_size: 66 },
  { id: "T-002", agent_id: "Alexandrus-MacBook-Pro.local", exported_at: "2026-04-16T11:07:09Z", timestamp: "2026-04-16T11:07:09Z", protocol: "TCP", src_ip: "80.241.218.175", src_port: 80, dst_ip: "192.168.100.124", dst_port: 60469, watchlist_match: "src", port_name: "http", direction: "outbound", tcp_flags: "A", packet_size: 66 },
  { id: "T-003", agent_id: "test-postman", exported_at: "2026-04-01T12:00:00Z", timestamp: "2026-04-01T12:00:00Z", protocol: "TCP", src_ip: "10.0.0.2", src_port: 443, dst_ip: "10.0.0.2", dst_port: 80, watchlist_match: "src", direction: "outbound", tcp_flags: "S", packet_size: 100 },
  { id: "T-004", agent_id: "Alexandrus-MacBook-Pro.local", exported_at: "2026-04-16T10:45:00Z", timestamp: "2026-04-16T10:45:00Z", protocol: "TCP", src_ip: "192.168.100.124", src_port: 54321, dst_ip: "80.241.218.175", dst_port: 443, watchlist_match: "dst", port_name: "https", direction: "inbound", tcp_flags: "S", packet_size: 74 },
  { id: "T-005", agent_id: "Alexandrus-MacBook-Pro.local", exported_at: "2026-04-16T10:45:01Z", timestamp: "2026-04-16T10:45:01Z", protocol: "TCP", src_ip: "80.241.218.175", src_port: 443, dst_ip: "192.168.100.124", dst_port: 54321, watchlist_match: "src", port_name: "https", direction: "outbound", tcp_flags: "SA", packet_size: 74 },
  { id: "T-006", agent_id: "server-prod-01", exported_at: "2026-04-15T08:30:00Z", timestamp: "2026-04-15T08:30:00Z", protocol: "UDP", src_ip: "172.16.0.12", src_port: 53, dst_ip: "192.168.1.45", dst_port: 12345, watchlist_match: "dst", port_name: "dns", direction: "inbound", tcp_flags: "-", packet_size: 512 },
  { id: "T-007", agent_id: "server-prod-01", exported_at: "2026-04-15T08:30:05Z", timestamp: "2026-04-15T08:30:05Z", protocol: "TCP", src_ip: "192.168.1.45", src_port: 8080, dst_ip: "172.16.0.12", dst_port: 443, watchlist_match: "src", port_name: "https", direction: "outbound", tcp_flags: "PA", packet_size: 1420 },
  { id: "T-008", agent_id: "test-postman", exported_at: "2026-04-14T16:00:00Z", timestamp: "2026-04-14T16:00:00Z", protocol: "TCP", src_ip: "45.33.32.156", src_port: 25, dst_ip: "10.0.0.2", dst_port: 1025, watchlist_match: "dst", port_name: "smtp", direction: "inbound", tcp_flags: "S", packet_size: 60 },
];

export function groupTrafficByIp(events: TrafficEvent[]): TrafficGroup[] {
  const map = new Map<string, TrafficEvent[]>();
  for (const ev of events) {
    // Group by the watchlist-matched IP
    const ip = ev.watchlist_match === "src" ? ev.src_ip : ev.dst_ip;
    if (!map.has(ip)) map.set(ip, []);
    map.get(ip)!.push(ev);
  }
  return Array.from(map.entries())
    .map(([ip, events]) => ({ ip, events: events.sort((a, b) => b.timestamp.localeCompare(a.timestamp)) }))
    .sort((a, b) => b.events.length - a.events.length);
}
