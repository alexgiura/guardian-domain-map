import { useState, useMemo } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DomainRow from "./DomainRow";
import AddDomainDialog from "./AddDomainDialog";
import EditDomainDialog from "./EditDomainDialog";
import StatusChangeDialog from "./StatusChangeDialog";
import { mockDomains, type Domain, type StatusChange } from "@/data/mockData";

type FilterTab = "all" | "threat" | "trusted" | "pending" | "rejected";

const DomainTable = () => {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusDialog, setStatusDialog] = useState<{
    domainId: string;
    domainValue: string;
    currentStatus: "threat" | "trusted";
    targetStatus: "threat" | "trusted";
  } | null>(null);
  const [editDomain, setEditDomain] = useState<Domain | null>(null);

  const addDomain = (domain: Domain) => {
    setDomains((prev) => [domain, ...prev]);
  };

  const requestStatusChange = (id: string, status: "threat" | "trusted") => {
    const domain = domains.find((d) => d.id === id);
    if (!domain) return;
    const current = domain.status === "trusted" ? "trusted" : "threat";
    setStatusDialog({
      domainId: id,
      domainValue: domain.value,
      currentStatus: current,
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

  const handleEditSave = (id: string, updates: { description: string; status: "threat" | "trusted" }) => {
    setDomains((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, description: updates.description, status: updates.status }
          : d
      )
    );
  };

  const filtered = useMemo(() => domains.filter((d) => {
    const matchesSearch = d.value.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || d.status === activeFilter;
    return matchesSearch && matchesFilter;
  }), [domains, search, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedDomains = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  // Reset page when filters change
  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handleFilter = (tab: FilterTab) => { setActiveFilter(tab); setCurrentPage(1); };
  const handlePerPage = (val: string) => { setPerPage(Number(val)); setCurrentPage(1); };

  const threatCount = domains.filter((d) => d.status === "threat").length;
  const trustedCount = domains.filter((d) => d.status === "trusted").length;
  const pendingCount = domains.filter((d) => d.status === "pending").length;
  const rejectedCount = domains.filter((d) => d.status === "rejected").length;

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "Toate", count: domains.length },
    { key: "threat", label: "Blacklist", count: threatCount },
    { key: "trusted", label: "Whitelist", count: trustedCount },
    { key: "pending", label: "Pending", count: pendingCount },
    { key: "rejected", label: "Rejected", count: rejectedCount },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleFilter(tab.key)}
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
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_80px_100px_80px_44px] gap-4 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span className="pl-6">Valoare</span>
          <span>Descriere</span>
          <span className="text-center">Tip</span>
          <span className="text-center">Status</span>
          <span className="text-center">Raportări</span>
          <span className="text-center">Acțiuni</span>
        </div>
        {paginatedDomains.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Niciun domeniu găsit.
          </div>
        ) : (
          paginatedDomains.map((domain) => (
            <DomainRow key={domain.id} domain={domain} onSetStatus={requestStatusChange} onEdit={setEditDomain} />
          ))
        )}

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rânduri per pagină:</span>
            <Select value={String(perPage)} onValueChange={handlePerPage}>
              <SelectTrigger className="h-8 w-[70px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {filtered.length === 0
                ? "0 rezultate"
                : `${(safePage - 1) * perPage + 1}–${Math.min(safePage * perPage, filtered.length)} din ${filtered.length}`}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddDomainDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={addDomain} />

      {editDomain && (
        <EditDomainDialog
          open={!!editDomain}
          onOpenChange={(open) => !open && setEditDomain(null)}
          domain={editDomain}
          onSave={handleEditSave}
        />
      )}

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
