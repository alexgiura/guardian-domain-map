import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import WhitelistRow from "./WhitelistRow";
import { mockWhitelistDomains, type WhitelistDomain } from "@/data/mockData";

type FilterTab = "all" | "pending" | "approved" | "rejected";

const WhitelistTable = () => {
  const [domains] = useState<WhitelistDomain[]>(mockWhitelistDomains);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filtered = domains.filter((d) => {
    const matchesSearch = d.value.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || d.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = domains.filter((d) => d.status === "pending").length;
  const approvedCount = domains.filter((d) => d.status === "approved").length;
  const rejectedCount = domains.filter((d) => d.status === "rejected").length;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "Toate", count: domains.length },
    { key: "pending", label: "În așteptare", count: pendingCount },
    { key: "approved", label: "Aprobate", count: approvedCount },
    { key: "rejected", label: "Respinse", count: rejectedCount },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-70">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută domeniu sau IP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_80px_100px_80px] gap-4 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span className="pl-6">Valoare</span>
          <span className="text-center">Tip</span>
          <span className="text-center">Status</span>
          <span className="text-center">Cereri</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Nicio cerere găsită.
          </div>
        ) : (
          filtered.map((domain) => (
            <WhitelistRow key={domain.id} domain={domain} />
          ))
        )}
      </div>
    </div>
  );
};

export default WhitelistTable;
