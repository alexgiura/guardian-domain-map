import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TrafficRow from "./TrafficRow";
import { mockTrafficEvents, groupTrafficByIp } from "@/data/mockTraffic";

type DirectionFilter = "all" | "inbound" | "outbound";

const TrafficTable = () => {
  const [search, setSearch] = useState("");
  const [directionFilter, setDirectionFilter] = useState<DirectionFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const groups = useMemo(() => {
    let events = mockTrafficEvents;
    if (directionFilter !== "all") {
      events = events.filter((e) => e.direction === directionFilter);
    }
    const grouped = groupTrafficByIp(events);
    if (!search.trim()) return grouped;
    return grouped.filter((g) => g.ip.includes(search.trim()));
  }, [search, directionFilter]);

  const totalPages = Math.max(1, Math.ceil(groups.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = groups.slice((safePage - 1) * perPage, safePage * perPage);

  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handleFilter = (tab: DirectionFilter) => { setDirectionFilter(tab); setCurrentPage(1); };
  const handlePerPage = (val: string) => { setPerPage(Number(val)); setCurrentPage(1); };

  const totalEvents = mockTrafficEvents.length;
  const inboundCount = mockTrafficEvents.filter((e) => e.direction === "inbound").length;
  const outboundCount = mockTrafficEvents.filter((e) => e.direction === "outbound").length;

  const tabs: { key: DirectionFilter; label: string; count: number }[] = [
    { key: "all", label: "Toate", count: totalEvents },
    { key: "inbound", label: "Inbound", count: inboundCount },
    { key: "outbound", label: "Outbound", count: outboundCount },
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
                directionFilter === tab.key
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
              placeholder="Caută IP..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_90px_70px_70px_70px_90px_120px] gap-3 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span className="pl-6">IP Watchlist</span>
          <span className="text-center">Protocol</span>
          <span className="text-center">Inbound</span>
          <span className="text-center">Outbound</span>
          <span className="text-center">Total</span>
          <span className="text-center">Trafic</span>
          <span className="text-center">Ultima activitate</span>
        </div>

        {paginated.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Niciun trafic găsit.
          </div>
        ) : (
          paginated.map((group) => (
            <TrafficRow key={group.ip} group={group} />
          ))
        )}

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
              {groups.length === 0
                ? "0 rezultate"
                : `${(safePage - 1) * perPage + 1}–${Math.min(safePage * perPage, groups.length)} din ${groups.length}`}
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
    </div>
  );
};

export default TrafficTable;
