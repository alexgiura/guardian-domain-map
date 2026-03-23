import { Clock, MessageSquare, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StatusChange } from "@/data/mockData";

interface StatusHistoryProps {
  history: StatusChange[];
}

const StatusHistory = ({ history }: StatusHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="px-3 pb-3 pl-10">
      <div className="flex items-center gap-1.5 mb-2">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Istoric Statusuri ({history.length})
        </span>
      </div>
      <div className="relative ml-1.5 border-l-2 border-border pl-4 space-y-3">
        {history.map((entry) => (
          <div key={entry.id} className="relative">
            <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-muted-foreground/40" />
            <div className="bg-card border border-border rounded-md p-2.5 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={entry.fromStatus === "trusted" ? "trusted" : "threat"} className="text-[9px] uppercase">
                  {entry.fromStatus}
                </Badge>
                <span className="text-[10px] text-muted-foreground">→</span>
                <Badge variant={entry.toStatus === "trusted" ? "trusted" : "threat"} className="text-[9px] uppercase">
                  {entry.toStatus}
                </Badge>
                <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {entry.changedAt}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <User className="h-3 w-3" />
                <span className="font-medium text-foreground">{entry.changedBy}</span>
              </div>
              <div className="flex items-start gap-1 text-[11px] text-foreground">
                <MessageSquare className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                <span>{entry.comment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusHistory;
