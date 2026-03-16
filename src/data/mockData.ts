export interface Ticket {
  ticketId: string;
  description: string;
  tags: string[];
  date: string;
  source: string;
}

export interface Domain {
  id: string;
  value: string;
  type: "IP" | "Domain";
  status: "whitelist" | "blacklist";
  tickets: Ticket[];
}

export const mockDomains: Domain[] = [
  {
    id: "DOM-001",
    value: "192.168.1.45",
    type: "IP",
    status: "blacklist",
    tickets: [
      { ticketId: "TK-1001", description: "Activitate suspectă detectată pe portul 443", tags: ["malware", "port-scan"], date: "2026-03-14", source: "IDS Sentinel" },
      { ticketId: "TK-1002", description: "Tentativă de brute-force pe SSH", tags: ["brute-force", "ssh"], date: "2026-03-12", source: "Firewall Log" },
    ],
  },
  {
    id: "DOM-002",
    value: "malicious-site.xyz",
    type: "Domain",
    status: "blacklist",
    tickets: [
      { ticketId: "TK-1003", description: "Phishing campaign targeting gov employees", tags: ["phishing", "social-engineering"], date: "2026-03-15", source: "CERT Alert" },
    ],
  },
  {
    id: "DOM-003",
    value: "10.0.0.88",
    type: "IP",
    status: "whitelist",
    tickets: [
      { ticketId: "TK-1004", description: "Fals pozitiv confirmat – server intern monitorizare", tags: ["false-positive", "internal"], date: "2026-03-10", source: "SOC Review" },
    ],
  },
  {
    id: "DOM-004",
    value: "suspicious-domain.ru",
    type: "Domain",
    status: "blacklist",
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
    status: "whitelist",
    tickets: [
      { ticketId: "TK-1008", description: "Verificat ca furnizor CDN legitim", tags: ["verified", "cdn"], date: "2026-03-08", source: "Manual Review" },
    ],
  },
  {
    id: "DOM-006",
    value: "172.16.0.12",
    type: "IP",
    status: "blacklist",
    tickets: [
      { ticketId: "TK-1009", description: "DDoS amplification source", tags: ["ddos", "amplification"], date: "2026-03-14", source: "ISP Report" },
    ],
  },
];
