import { useState, useMemo } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DomainRow from "./DomainRow";
import AddDomainDialog from "./AddDomainDialog";
import StatusChangeDialog from "./StatusChangeDialog";
import { mockDomains, type Domain, type StatusChange } from "@/data/mockData";

type FilterTab = "all" | "threat" | "trusted";

const DomainTable = () => {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusDialog, setStatusDialog] = useState<{
    domainId: string;
    domainValue: string;
    currentStatus: "threat" | "trusted";
    targetStatus: "threat" | "trusted";
  } | null>(null);

  const addDomain = (domain: Domain) => {
    setDomains((prev) => [domain, ...prev]);
  };

  const requestStatusChange = (id: string, status: "threat" | "trusted") => {
    const domain = domains.find((d) => d.id === id);
    if (!domain) return;
    setStatusDialog({
      domainId: id,
      domainValue: domain.value,
      currentStatus: domain.status,
      targetStatus: status,
    });
  };

  const confirmStatusChange = (comment: string) => {
    if (!statusDialog) return;
    const entry: StatusChange = {
      id: crypto.randomUUID(),
      fromStatus: statusDialog.currentStatus,
      toStatus: statusDialog.targetStatus,
      comment,
      changedBy: "Admin User",
      changedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setDomains((prev) =>
      prev.map((d) =>
        d.id === statusDialog.domainId
          ? {
              ...d,
              status: statusDialog.targetStatus,
              statusHistory: [entry, ...(d.statusHistory || [])],
            }
          : d
      )
    );
    setStatusDialog(null);
  };

  const filtered = domains.filter((d) => {
    const matchesSearch = d.value.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || d.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const threatCount = domains.filter((d) => d.status === "threat").length;
  const trustedCount = domains.filter((d) => d.status === "trusted").length;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "Toate", count: domains.length },
    { key: "threat", label: "Threat", count: threatCount },
    { key: "trusted", label: "Trusted", count: trustedCount },
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
        <Button size="sm" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Adaugă
        </Button>
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

        <div className="grid grid-cols-[1fr_80px_100px_80px_44px] gap-4 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span className="pl-6">Valoare</span>
          <span className="text-center">Tip</span>
          <span className="text-center">Status</span>
          <span className="text-center">Raportări</span>
          <span className="text-center">Acțiuni</span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Niciun domeniu găsit.
          </div>
        ) : (
          filtered.map((domain) => (
            <DomainRow key={domain.id} domain={domain} onSetStatus={requestStatusChange} />
          ))
        )}
      </div>

      <AddDomainDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={addDomain} />

      {statusDialog && (
        <StatusChangeDialog
          open={!!statusDialog}
          onOpenChange={(open) => !open && setStatusDialog(null)}
          domainValue={statusDialog.domainValue}
          currentStatus={statusDialog.currentStatus}
          targetStatus={statusDialog.targetStatus}
          onConfirm={confirmStatusChange}
        />
      )}
    </div>
  );
};

export default DomainTable;
