import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DomainRow from "./DomainRow";
import AddDomainDialog from "./AddDomainDialog";
import { mockDomains, type Domain } from "@/data/mockData";

type FilterTab = "all" | "blacklist" | "whitelist";

const DomainTable = () => {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const setStatus = (id: string, status: "whitelist" | "blacklist") => {
    setDomains((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const filtered = domains.filter((d) => {
    const matchesSearch =
      d.value.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || d.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const blacklistCount = domains.filter((d) => d.status === "blacklist").length;
  const whitelistCount = domains.filter((d) => d.status === "whitelist").length;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "Toate", count: domains.length },
    { key: "blacklist", label: "Blacklist", count: blacklistCount },
    { key: "whitelist", label: "Whitelist", count: whitelistCount },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs outside the card */}
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

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Search row */}
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

        {/* Table header */}
        <div className="grid grid-cols-[1fr_80px_100px_80px_44px] gap-4 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span>Valoare</span>
          <span>Tip</span>
          <span>Status</span>
          <span>Raportări</span>
          <span className="text-right">Acțiuni</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Niciun domeniu găsit.
          </div>
        ) : (
          filtered.map((domain) => (
            <DomainRow key={domain.id} domain={domain} onSetStatus={setStatus} />
          ))
        )}
      </div>
    </div>
  );
};

export default DomainTable;
