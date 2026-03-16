import { ShieldAlert, ShieldCheck, Activity, AlertTriangle } from "lucide-react";
import { mockDomains } from "@/data/mockData";

const Dashboard = () => {
  const blacklistCount = mockDomains.filter((d) => d.status === "blacklist").length;
  const whitelistCount = mockDomains.filter((d) => d.status === "whitelist").length;
  const totalTickets = mockDomains.reduce((sum, d) => sum + d.tickets.length, 0);

  const stats = [
    { label: "Total Domenii", value: mockDomains.length, icon: Activity, color: "text-foreground" },
    { label: "Blacklisted", value: blacklistCount, icon: ShieldAlert, color: "text-destructive" },
    { label: "Whitelisted", value: whitelistCount, icon: ShieldCheck, color: "text-success" },
    { label: "Total Tickete", value: totalTickets, icon: AlertTriangle, color: "text-muted-foreground" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
          <div className={`${stat.color}`}>
            <stat.icon className="h-8 w-8" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
