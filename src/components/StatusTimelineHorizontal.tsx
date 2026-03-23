import { ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { StatusChange } from "@/data/mockData";

interface StatusTimelineHorizontalProps {
  history: StatusChange[];
}

const StatusTimelineHorizontal = ({ history }: StatusTimelineHorizontalProps) => {
  if (history.length === 0) {
    return (
      <div className="px-3 pb-3 pl-10 py-6 text-center text-xs text-muted-foreground">
        Nicio schimbare de status înregistrată.
      </div>
    );
  }

  // Reverse so oldest is first (left to right chronologically)
  const sorted = [...history].reverse();

  return (
    <TooltipProvider delayDuration={150}>
      <div className="px-3 pb-4 pl-10 pt-3 overflow-x-auto">
        <div className="relative flex items-center gap-0 min-w-max">
          {sorted.map((entry, index) => {
            const isThreat = entry.toStatus === "threat";
            const isLast = index === sorted.length - 1;

            return (
              <div key={entry.id} className="flex items-center">
                {/* Node */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={`relative flex flex-col items-center gap-1.5 group cursor-pointer`}
                    >
                      {/* Date label above */}
                      <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap">
                        {entry.changedAt.split(" ")[0]?.slice(5) || entry.changedAt}
                      </span>

                      {/* Dot */}
                      <div
                        className={`h-3.5 w-3.5 rounded-full ring-2 ring-background shadow-sm transition-transform group-hover:scale-125 ${
                          isThreat ? "bg-threat" : "bg-trusted"
                        }`}
                      />

                      {/* Status label below */}
                      <Badge
                        variant={isThreat ? "threat" : "trusted"}
                        className="text-[8px] uppercase px-1 py-0 leading-tight"
                      >
                        {entry.toStatus}
                      </Badge>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[240px] space-y-1.5 p-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-muted-foreground">{entry.changedAt}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <Badge
                        variant={isThreat ? "threat" : "trusted"}
                        className="text-[9px] uppercase px-1.5 py-0"
                      >
                        {entry.toStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-[11px]">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{entry.changedBy}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{entry.comment}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Connecting line */}
                {!isLast && (
                  <div className="w-12 h-px bg-border mx-1 mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StatusTimelineHorizontal;
