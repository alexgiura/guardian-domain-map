import { User, ArrowRight, Clock } from "lucide-react";
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
    <div className="p-3 pl-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {history.map((entry) => {
        const isThreat = entry.toStatus === "threat";
        return (
          <div
            key={entry.id}
            className="bg-card border border-border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-2"
          >
            {/* Header: datetime + new status */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {entry.changedAt}
              </span>
              <Badge
                variant={isThreat ? "threat" : "trusted"}
                className="text-[9px] uppercase px-1.5 py-0"
              >
                {entry.toStatus}
              </Badge>
            </div>

            {/* Comment */}
            <p className="text-xs text-foreground leading-snug">{entry.comment}</p>

            {/* Footer: user + status transition */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <User className="h-3 w-3" />
                <span className="font-medium text-foreground">{entry.changedBy}</span>
              </span>
              <span className="flex items-center gap-1.5 text-[9px]">
                <Badge variant={entry.fromStatus === "trusted" ? "trusted" : "threat"} className="text-[8px] uppercase px-1 py-0">
                  {entry.fromStatus}
                </Badge>
                <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
                <Badge variant={isThreat ? "threat" : "trusted"} className="text-[8px] uppercase px-1 py-0">
                  {entry.toStatus}
                </Badge>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusHistory;
