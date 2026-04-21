import { ShieldAlert, ShieldCheck, Activity, Clock, XCircle, Globe, Server, CalendarDays, Tag, TrendingUp } from "lucide-react";
import { mockDomains } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const total = mockDomains.length;
  const blacklistCount = mockDomains.filter((d) => d.status === "threat").length;
  const whitelistCount = mockDomains.filter((d) => d.status === "trusted").length;
  const pendingCount = mockDomains.filter((d) => d.status === "pending").length;
  const rejectedCount = mockDomains.filter((d) => d.status === "rejected").length;

  const stats = [
    {
      label: "Total Domenii",
      value: total,
      icon: Activity,
      iconBg: "bg-muted",
      iconColor: "text-foreground",
      accent: "border-l-foreground",
    },
    {
      label: "Blacklist",
      value: blacklistCount,
      icon: ShieldAlert,
      iconBg: "bg-threat/10",
      iconColor: "text-threat",
      accent: "border-l-threat",
    },
    {
      label: "Whitelist",
      value: whitelistCount,
      icon: ShieldCheck,
      iconBg: "bg-trusted/10",
      iconColor: "text-trusted",
      accent: "border-l-trusted",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: Clock,
      iconBg: "bg-pending/10",
      iconColor: "text-pending",
      accent: "border-l-pending",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      iconBg: "bg-rejected/10",
      iconColor: "text-rejected",
      accent: "border-l-rejected",
    },
  ];

  // --- Status badge mapping ---
  const statusConfig: Record<string, { label: string; variant: "threat" | "trusted" | "pending" | "rejected" }> = {
    threat: { label: "Blacklist", variant: "threat" },
    trusted: { label: "Whitelist", variant: "trusted" },
    pending: { label: "Pending", variant: "pending" },
    rejected: { label: "Rejected", variant: "rejected" },
  };

  // --- Tags distribution ---
  const tagCounts: Record<string, number> = {};
  mockDomains.forEach((d) =>
    d.tickets.forEach((t) =>
      t.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      })
    )
  );
  const tagsData = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));
  const maxTagCount = Math.max(...tagsData.map((t) => t.value), 1);

  // --- Recent domains ---
  const recentDomains = [...mockDomains]
    .sort((a, b) => b.addedDate.localeCompare(a.addedDate))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Privire de ansamblu asupra domeniilor și IP-urilor monitorizate</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-card border border-border border-l-4 ${stat.accent} rounded-lg p-5 transition-all hover:shadow-md flex items-center gap-3`}
          >
            <div className={`${stat.iconBg} ${stat.iconColor} h-10 w-10 rounded-full flex items-center justify-center shrink-0`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <p className="text-2xl font-bold tracking-tight leading-none">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium mt-1 truncate">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout: Recent domains + Top tags */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent domains table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Ultimele domenii adăugate</h3>
            </div>
            <Badge variant="outline" className="text-[10px] uppercase">
              {recentDomains.length} intrări
            </Badge>
          </div>
          <div className="grid grid-cols-[1fr_70px_100px_90px] gap-3 px-5 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/40">
            <span>Valoare</span>
            <span className="text-center">Tip</span>
            <span className="text-center">Status</span>
            <span className="text-center">Dată</span>
          </div>
          {recentDomains.map((d) => {
            const cfg = statusConfig[d.status];
            return (
              <div
                key={d.id}
                className="grid grid-cols-[1fr_70px_100px_90px] gap-3 items-center px-5 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <span className="flex items-center gap-2 min-w-0">
                  {d.type === "IP" ? (
                    <Server className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  ) : (
                    <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                  <span className="font-mono text-xs truncate">{d.value}</span>
                </span>
                <span className="flex justify-center">
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {d.type}
                  </Badge>
                </span>
                <span className="flex justify-center">
                  <Badge variant={cfg.variant} className="text-[10px] uppercase">
                    {cfg.label}
                  </Badge>
                </span>
                <span className="text-xs text-muted-foreground text-center font-medium">
                  {d.addedDate}
                </span>
              </div>
            );
          })}
        </div>

        {/* Top tags */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Top etichete</h3>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {tagsData.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">Nu există etichete</p>
            )}
            {tagsData.map((tag, idx) => {
              const pct = (tag.value / maxTagCount) * 100;
              return (
                <div key={tag.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-muted-foreground w-4">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <Tag className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-xs font-medium truncate">{tag.name}</span>
                    </div>
                    <span className="text-xs font-semibold tabular-nums">{tag.value}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground/80 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
