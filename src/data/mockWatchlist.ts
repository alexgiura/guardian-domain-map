export interface WatchlistEntry {
  id: string;
  value: string;
  type: "IP" | "Domain";
  description?: string;
  addedDate: string;
}

export const mockWatchlist: WatchlistEntry[] = [
  {
    id: "wl-001",
    value: "80.241.218.175",
    type: "IP",
    description: "Suspect C2 server observat în logs",
    addedDate: "2026-04-10",
  },
  {
    id: "wl-002",
    value: "192.168.100.124",
    type: "IP",
    description: "Host intern monitorizat",
    addedDate: "2026-04-12",
  },
  {
    id: "wl-003",
    value: "10.0.0.2",
    type: "IP",
    description: "",
    addedDate: "2026-04-14",
  },
  {
    id: "wl-004",
    value: "172.16.0.12",
    type: "IP",
    description: "DNS resolver suspect",
    addedDate: "2026-04-15",
  },
  {
    id: "wl-005",
    value: "45.33.32.156",
    type: "IP",
    description: "",
    addedDate: "2026-04-15",
  },
];
