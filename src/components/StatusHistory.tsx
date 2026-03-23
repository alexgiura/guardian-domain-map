import { Clock, MessageSquare, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StatusChange } from "@/data/mockData";

interface StatusHistoryProps {
  history: StatusChange[];
}

const StatusHistory = ({ history }: StatusHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="px-3 pb-3 pl-10 py-6 text-center text-xs text-muted-foreground">
        Nicio schimbare de status înregistrată.
      </div>
    );
  }

  return (
    <div className="px-3 pb-3 pl-10 pt-1">
      <div className="relative ml-3">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

        {history.map((entry, index) => {
          const isThreat = entry.toStatus === "threat";
          return (
            <div key={entry.id} className="relative pl-6 pb-4 last:pb-1">
              {/* Node dot */}
              <div
                className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full -translate-x-[4.5px] ring-2 ring-background ${
                  isThreat ? "bg-threat" : "bg-trusted"
                }`}
              />

              {/* Content card */}
              <div className="flex flex-col gap-1">
                {/* Top line: datetime + status */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-mono">{entry.changedAt}</span>
                  <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
                  <Badge
                    variant={isThreat ? "threat" : "trusted"}
                    className="text-[9px] uppercase px-1.5 py-0"
                  >
                    {entry.toStatus}
                  </Badge>
                </div>

                {/* User + comment */}
                <div className="flex items-start gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-muted-foreground shrink-0">
                    <User className="h-3 w-3" />
                    <span className="font-medium text-foreground">{entry.changedBy}</span>
                  </span>
                  <span className="text-muted-foreground">—</span>
                  <span className="text-foreground">{entry.comment}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusHistory;
