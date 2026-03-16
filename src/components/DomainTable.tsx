import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DomainRow from "./DomainRow";
import { mockDomains, type Domain } from "@/data/mockData";

const DomainTable = () => {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [search, setSearch] = useState("");

  const toggleStatus = (id: string) => {
    setDomains((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: d.status === "whitelist" ? "blacklist" : "whitelist" } : d
      )
    );
  };

  const filtered = domains.filter(
    (d) =>
      d.value.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  );

  const blacklistCount = domains.filter((d) => d.status === "blacklist").length;
  const whitelistCount = domains.filter((d) => d.status === "whitelist").length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{domains.length}</span>
          </span>
          <span className="text-muted-foreground">
            Blacklist: <span className="font-semibold text-destructive">{blacklistCount}</span>
          </span>
          <span className="text-muted-foreground">
            Whitelist: <span className="font-semibold text-success">{whitelistCount}</span>
          </span>
        </div>
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

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-[28px_80px_224px_64px_80px_1fr_44px] gap-4 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span></span>
          <span>ID</span>
          <span>Valoare</span>
          <span>Tip</span>
          <span>Status</span>
          <span>Tickete</span>
          <span className="text-right">Acțiune</span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Niciun domeniu găsit.
          </div>
        ) : (
          filtered.map((domain) => (
            <DomainRow key={domain.id} domain={domain} onToggleStatus={toggleStatus} />
          ))
        )}
      </div>
    </div>
  );
};

export default DomainTable;
