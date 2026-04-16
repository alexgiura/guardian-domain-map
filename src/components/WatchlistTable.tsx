import { useState, useMemo } from "react";
import { Search, Plus, Trash2, ChevronLeft, ChevronRight, Globe, Server } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AddWatchlistDialog from "./AddWatchlistDialog";
import { mockWatchlist, type WatchlistEntry } from "@/data/mockWatchlist";
import { toast } from "sonner";

type TypeFilter = "all" | "IP" | "Domain";

const WatchlistTable = () => {
  const [entries, setEntries] = useState<WatchlistEntry[]>(mockWatchlist);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [addOpen, setAddOpen] = useState(false);
  const [toDelete, setToDelete] = useState<WatchlistEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    let list = entries;
    if (typeFilter !== "all") list = list.filter((e) => e.type === typeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.value.toLowerCase().includes(q) ||
          (e.description ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [entries, typeFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  const ipCount = entries.filter((e) => e.type === "IP").length;
  const domainCount = entries.filter((e) => e.type === "Domain").length;

  const tabs: { key: TypeFilter; label: string; count: number }[] = [
    { key: "all", label: "Toate", count: entries.length },
    { key: "IP", label: "IP", count: ipCount },
    { key: "Domain", label: "Domenii", count: domainCount },
  ];

  const handleAdd = (entry: WatchlistEntry) => {
    setEntries((prev) => [entry, ...prev]);
    toast.success(`${entry.value} a fost adăugat în watchlist`);
  };

  const handleDelete = () => {
    if (!toDelete) return;
    setEntries((prev) => prev.filter((e) => e.id !== toDelete.id));
    toast.success(`${toDelete.value} a fost șters din watchlist`);
    setToDelete(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setTypeFilter(tab.key); setCurrentPage(1); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                typeFilter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-70">{tab.count}</span>
            </button>
          ))}
        </div>
        <Button onClick={() => setAddOpen(true)} size="sm">
          <Plus className="h-4 w-4" />
          Adaugă
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută IP sau descriere..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2fr_100px_140px_80px] gap-3 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span>Valoare</span>
          <span>Descriere</span>
          <span className="text-center">Tip</span>
          <span className="text-center">Adăugat</span>
          <span className="text-center">Acțiuni</span>
        </div>

        {paginated.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Niciun element în watchlist.
          </div>
        ) : (
          paginated.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[1fr_2fr_100px_140px_80px] gap-3 px-4 py-3 items-center border-b border-border last:border-b-0 hover:bg-muted/40 transition-colors"
            >
              <span className="flex items-center gap-2 font-mono text-xs min-w-0">
                {entry.type === "IP" ? (
                  <Server className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
                <span className="truncate">{entry.value}</span>
              </span>
              <span className="text-xs text-muted-foreground truncate" title={entry.description}>
                {entry.description || <span className="italic opacity-50">—</span>}
              </span>
              <span className="flex justify-center">
                <Badge variant="outline" className="text-[10px]">
                  {entry.type}
                </Badge>
              </span>
              <span className="text-xs text-muted-foreground text-center font-mono">
                {entry.addedDate}
              </span>
              <span className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => setToDelete(entry)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </span>
            </div>
          ))
        )}

        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rânduri per pagină:</span>
            <Select value={String(perPage)} onValueChange={(v) => { setPerPage(Number(v)); setCurrentPage(1); }}>
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
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={safePage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={safePage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddWatchlistDialog open={addOpen} onOpenChange={setAddOpen} onAdd={handleAdd} />

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmă ștergerea</AlertDialogTitle>
            <AlertDialogDescription>
              Sigur vrei să ștergi <strong className="font-mono">{toDelete?.value}</strong> din watchlist?
              Această acțiune nu poate fi anulată.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WatchlistTable;
