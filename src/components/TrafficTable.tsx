import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AgentRow from "./TrafficRow";
import { mockTrafficEvents, type TrafficEvent } from "@/data/mockTraffic";

const TrafficTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const agents = useMemo(() => {
    const map = new Map<string, TrafficEvent[]>();
    for (const ev of mockTrafficEvents) {
      if (!map.has(ev.agent_id)) map.set(ev.agent_id, []);
      map.get(ev.agent_id)!.push(ev);
    }
    let list = Array.from(map.entries()).map(([agentId, events]) => ({ agentId, events }));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.agentId.toLowerCase().includes(q) ||
          a.events.some((e) => e.src_ip.includes(q) || e.dst_ip.includes(q))
      );
    }
    return list.sort((a, b) => b.events.length - a.events.length);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(agents.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = agents.slice((safePage - 1) * perPage, safePage * perPage);

  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handlePerPage = (val: string) => { setPerPage(Number(val)); setCurrentPage(1); };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută agent sau IP..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_100px_100px_100px_140px] gap-3 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
          <span className="pl-6">Agent</span>
          <span className="text-center">IP-uri Watchlist</span>
          <span className="text-center">Evenimente</span>
          <span className="text-center">Bytes</span>
          <span className="text-center">Ultima activitate</span>
        </div>

        {paginated.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Niciun agent găsit.
          </div>
        ) : (
          paginated.map((a) => <AgentRow key={a.agentId} agentId={a.agentId} events={a.events} />)
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
              {agents.length === 0
                ? "0 rezultate"
                : `${(safePage - 1) * perPage + 1}–${Math.min(safePage * perPage, agents.length)} din ${agents.length}`}
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
