import { ShieldAlert, ShieldCheck, Activity, AlertTriangle, Globe, Server, CalendarDays } from "lucide-react";
import { mockDomains } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const threatCount = mockDomains.filter((d) => d.status === "threat").length;
  const trustedCount = mockDomains.filter((d) => d.status === "trusted").length;
  const totalTickets = mockDomains.reduce((sum, d) => sum + d.tickets.length, 0);

  const stats = [
    { label: "Total Domenii", value: mockDomains.length, icon: Activity, color: "text-foreground" },
    { label: "Threats", value: threatCount, icon: ShieldAlert, color: "text-threat" },
    { label: "Trusted", value: trustedCount, icon: ShieldCheck, color: "text-trusted" },
    { label: "Total Raportări", value: totalTickets, icon: AlertTriangle, color: "text-muted-foreground" },
  ];

  // --- Threat timeline (tickets per day) ---
  const ticketsByDate: Record<string, number> = {};
  mockDomains.forEach((d) =>
    d.tickets.forEach((t) => {
      ticketsByDate[t.date] = (ticketsByDate[t.date] || 0) + 1;
    })
  );
  const timelineData = Object.entries(ticketsByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date: date.slice(5), raportări: count }));

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

  // --- Country distribution ---
  const countryCounts: Record<string, number> = {};
  mockDomains.forEach((d) => {
    const c = d.country || "N/A";
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  });
  const countryData = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }));

  // --- Type split (pie) ---
  const ipCount = mockDomains.filter((d) => d.type === "IP").length;
  const domainCount = mockDomains.filter((d) => d.type === "Domain").length;
  const typeData = [
    { name: "IP", value: ipCount },
    { name: "Domain", value: domainCount },
  ];
  const PIE_COLORS = ["hsl(222, 47%, 11%)", "hsl(214, 32%, 71%)"];

  // --- Recent domains ---
  const recentDomains = [...mockDomains]
    .sort((a, b) => b.addedDate.localeCompare(a.addedDate))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
            <div className={stat.color}>
              <stat.icon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Timeline */}
        <div className="col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Raportări în timp</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(222, 47%, 11%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(222, 47%, 11%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 32%, 91%)",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="raportări"
                stroke="hsl(222, 47%, 11%)"
                strokeWidth={2}
                fill="url(#areaGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Type pie */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Tip intrare</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {typeData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Tags bar chart */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Top etichete amenințări</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={tagsData} layout="vertical">
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} stroke="hsl(215, 16%, 47%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 32%, 91%)",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="hsl(0, 84%, 60%)" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Country bar chart */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Origine pe țară</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={countryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 32%, 91%)",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="hsl(222, 47%, 11%)" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent domains table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">Ultimele domenii adăugate</h3>
        </div>
        <div className="grid grid-cols-[1fr_80px_100px_80px_100px] gap-4 px-5 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span>Valoare</span>
          <span className="text-center">Tip</span>
          <span className="text-center">Status</span>
          <span className="text-center">Țară</span>
          <span className="text-center">Dată</span>
        </div>
        {recentDomains.map((d) => (
          <div
            key={d.id}
            className="grid grid-cols-[1fr_80px_100px_80px_100px] gap-4 items-center px-5 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              {d.type === "IP" ? (
                <Server className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <span className="font-mono text-xs">{d.value}</span>
            </span>
            <span className="flex justify-center">
              <Badge variant="outline" className="text-[10px] uppercase justify-center">
                {d.type}
              </Badge>
            </span>
            <span className="flex justify-center">
              <Badge
                variant={d.status === "trusted" ? "trusted" : "threat"}
                className="text-[10px] uppercase justify-center"
              >
                {d.status === "trusted" ? "Trusted" : "Threat"}
              </Badge>
            </span>
            <span className="text-xs text-muted-foreground text-center font-medium">
              {d.country || "—"}
            </span>
            <span className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              {d.addedDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
