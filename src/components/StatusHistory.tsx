import { User, ArrowRight, Clock, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StatusChange } from "@/data/mockData";

interface StatusHistoryProps {
  history: StatusChange[];
}

const StatusHistory = ({ history }: StatusHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="p-3 pl-10 py-6 text-center text-xs text-muted-foreground">
        Nicio schimbare de status înregistrată.
      </div>
    );
  }

  return (
    <div className="px-3 pb-3 pl-10 pt-1">
      <div className="relative ml-3">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

        {history.map((entry) => {
          const isThreat = entry.toStatus === "threat";
          return (
            <div key={entry.id} className="relative pl-6 pb-3 last:pb-1">
              {/* Node dot */}
              <div
                className={`absolute left-0 top-[18px] h-2.5 w-2.5 rounded-full -translate-x-[4.5px] ring-2 ring-background ${
                  isThreat ? "bg-threat" : "bg-trusted"
                }`}
              />

              {/* Card */}
              <div className="bg-card border border-border rounded-md p-2.5 shadow-sm max-w-md">
                {/* Row 1: fromStatus → toStatus  |  date */}
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <Badge variant={entry.fromStatus === "trusted" ? "trusted" : "threat"} className="text-[9px] uppercase px-1.5 py-0">
                      {entry.fromStatus}
                    </Badge>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <Badge variant={isThreat ? "threat" : "trusted"} className="text-[9px] uppercase px-1.5 py-0">
                      {entry.toStatus}
                    </Badge>
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                    <Clock className="h-2.5 w-2.5" />
                    {entry.changedAt}
                  </span>
                </div>

                {/* Row 2: user */}
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1.5">
                  <User className="h-3 w-3" />
                  <span className="font-medium text-foreground">{entry.changedBy}</span>
                </div>

                {/* Row 3: comment */}
                <div className="flex items-start gap-1 text-[11px] text-foreground mt-1">
                  <MessageSquare className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                  <span>{entry.comment}</span>
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
