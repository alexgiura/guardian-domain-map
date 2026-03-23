export interface Ticket {
  ticketId: string;
  description: string;
  tags: string[];
  date: string;
  source: string;
}

export interface StatusChange {
  id: string;
  fromStatus: "threat" | "trusted";
  toStatus: "threat" | "trusted";
  comment: string;
  changedBy: string;
  changedAt: string;
}

export interface Domain {
  id: string;
  value: string;
  type: "IP" | "Domain";
  status: "threat" | "trusted";
  country?: string;
  addedDate: string;
  tickets: Ticket[];
  statusHistory?: StatusChange[];
}

export interface WhitelistRequest {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  reason: string;
  requestedAt: string;
}

export interface WhitelistDomain {
  id: string;
  value: string;
  type: "IP" | "Domain";
  status: "pending" | "approved" | "rejected";
  requests: WhitelistRequest[];
}

export const mockWhitelistDomains: WhitelistDomain[] = [
  {
    id: "WL-001",
    value: "192.168.1.45",
    type: "IP",
    status: "pending",
    requests: [
      { id: "WR-001", firstName: "Ion", lastName: "Popescu", address: "Str. Victoriei 12, București", phone: "+40 721 123 456", reason: "Server intern folosit pentru monitorizare rețea. A fost identificat eronat ca amenințare.", requestedAt: "2026-03-20 14:32" },
      { id: "WR-002", firstName: "Maria", lastName: "Ionescu", address: "Bd. Unirii 45, Cluj-Napoca", phone: "+40 744 987 654", reason: "IP utilizat de echipa DevOps pentru deployment automat.", requestedAt: "2026-03-19 09:15" },
    ],
  },
  {
    id: "WL-002",
    value: "cdn-provider.com",
    type: "Domain",
    status: "approved",
    requests: [
      { id: "WR-003", firstName: "Andrei", lastName: "Dumitrescu", address: "Str. Libertății 8, Timișoara", phone: "+40 755 222 333", reason: "Furnizor CDN verificat, utilizat pentru servirea conținutului static al platformei interne.", requestedAt: "2026-03-18 11:45" },
    ],
  },
  {
    id: "WL-003",
    value: "10.0.0.88",
    type: "IP",
    status: "rejected",
    requests: [
      { id: "WR-004", firstName: "Elena", lastName: "Marinescu", address: "Str. Rozelor 3, Iași", phone: "+40 733 444 555", reason: "Solicit whitelistarea pentru acces la serviciul de backup intern.", requestedAt: "2026-03-17 16:20" },
    ],
  },
  {
    id: "WL-004",
    value: "internal-api.local",
    type: "Domain",
    status: "pending",
    requests: [
      { id: "WR-005", firstName: "Cristian", lastName: "Stanescu", address: "Bd. Republicii 22, Brașov", phone: "+40 766 111 222", reason: "API intern utilizat pentru integrarea cu sistemul ERP. Necesită acces nerestricționat.", requestedAt: "2026-03-21 08:00" },
      { id: "WR-006", firstName: "Ana", lastName: "Vasilescu", address: "Str. Primăverii 15, Constanța", phone: "+40 722 333 444", reason: "Domeniu intern pentru sincronizarea datelor între departamente.", requestedAt: "2026-03-20 17:30" },
      { id: "WR-007", firstName: "Bogdan", lastName: "Radu", address: "Str. Independenței 7, Sibiu", phone: "+40 711 555 666", reason: "Folosit de echipa QA pentru testare automată.", requestedAt: "2026-03-19 13:10" },
    ],
  },
];

export const mockDomains: Domain[] = [
  {
    id: "DOM-001",
    value: "192.168.1.45",
    type: "IP",
    status: "threat",
    country: "RU",
    addedDate: "2026-03-14",
    tickets: [
      { ticketId: "TK-1001", description: "Activitate suspectă detectată pe portul 443", tags: ["malware", "port-scan"], date: "2026-03-14", source: "IDS Sentinel" },
      { ticketId: "TK-1002", description: "Tentativă de brute-force pe SSH", tags: ["brute-force", "ssh"], date: "2026-03-12", source: "Firewall Log" },
    ],
  },
  {
    id: "DOM-002",
    value: "malicious-site.xyz",
    type: "Domain",
    status: "threat",
    country: "CN",
    addedDate: "2026-03-15",
    tickets: [
      { ticketId: "TK-1003", description: "Phishing campaign targeting gov employees", tags: ["phishing", "social-engineering"], date: "2026-03-15", source: "CERT Alert" },
    ],
  },
  {
    id: "DOM-003",
    value: "10.0.0.88",
    type: "IP",
    status: "trusted",
    country: "RO",
    addedDate: "2026-03-10",
    tickets: [
      { ticketId: "TK-1004", description: "Fals pozitiv confirmat – server intern monitorizare", tags: ["false-positive", "internal"], date: "2026-03-10", source: "SOC Review" },
    ],
  },
  {
    id: "DOM-004",
    value: "suspicious-domain.ru",
    type: "Domain",
    status: "threat",
    country: "RU",
    addedDate: "2026-03-13",
    tickets: [
      { ticketId: "TK-1005", description: "C2 server communication detected", tags: ["c2", "apt", "critical"], date: "2026-03-13", source: "Threat Intel" },
      { ticketId: "TK-1006", description: "DNS tunneling activity observed", tags: ["dns-tunnel", "exfiltration"], date: "2026-03-11", source: "DNS Monitor" },
      { ticketId: "TK-1007", description: "Associated with ransomware campaign", tags: ["ransomware"], date: "2026-03-09", source: "CERT Alert" },
    ],
  },
  {
    id: "DOM-005",
    value: "cdn-provider.com",
    type: "Domain",
    status: "trusted",
    country: "US",
    addedDate: "2026-03-08",
    tickets: [
      { ticketId: "TK-1008", description: "Verificat ca furnizor CDN legitim", tags: ["verified", "cdn"], date: "2026-03-08", source: "Manual Review" },
    ],
  },
  {
    id: "DOM-006",
    value: "172.16.0.12",
    type: "IP",
    status: "threat",
    country: "KP",
    addedDate: "2026-03-14",
    tickets: [
      { ticketId: "TK-1009", description: "DDoS amplification source", tags: ["ddos", "amplification"], date: "2026-03-14", source: "ISP Report" },
    ],
  },
  {
    id: "DOM-007",
    value: "dark-market.onion.ly",
    type: "Domain",
    status: "threat",
    country: "UA",
    addedDate: "2026-03-11",
    tickets: [
      { ticketId: "TK-1010", description: "Marketplace for stolen credentials", tags: ["credential-theft", "dark-web"], date: "2026-03-11", source: "Threat Intel" },
    ],
  },
  {
    id: "DOM-008",
    value: "45.33.32.156",
    type: "IP",
    status: "threat",
    country: "IR",
    addedDate: "2026-03-12",
    tickets: [
      { ticketId: "TK-1011", description: "Spam relay server", tags: ["spam", "relay"], date: "2026-03-12", source: "Mail Gateway" },
      { ticketId: "TK-1012", description: "Malware distribution endpoint", tags: ["malware", "distribution"], date: "2026-03-10", source: "Sandbox Analysis" },
    ],
  },
  {
    id: "DOM-009",
    value: "gov-update.info",
    type: "Domain",
    status: "threat",
    country: "CN",
    addedDate: "2026-03-16",
    tickets: [
      { ticketId: "TK-1013", description: "Impersonare site guvernamental", tags: ["phishing", "impersonation", "critical"], date: "2026-03-16", source: "CERT Alert" },
    ],
  },
  {
    id: "DOM-010",
    value: "internal-monitor.local",
    type: "Domain",
    status: "trusted",
    country: "RO",
    addedDate: "2026-03-07",
    tickets: [
      { ticketId: "TK-1014", description: "Server intern de monitorizare rețea", tags: ["internal", "verified"], date: "2026-03-07", source: "IT Department" },
    ],
  },
];
