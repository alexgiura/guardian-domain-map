import { Badge } from "@/components/ui/badge";
import { Info, ExternalLink } from "lucide-react";
import type { Ticket } from "@/data/mockData";

interface TicketListProps {
  tickets: Ticket[];
}

const tagColors: Record<string, string> = {
  CRITICAL: "border-destructive text-destructive",
  INTERNAL: "border-trusted text-trusted",
  DEVOPS: "border-primary text-primary",
  "UX RESEARCH": "border-trusted text-trusted",
  "HIGH PRIORITY": "border-[hsl(25,95%,53%)] text-[hsl(25,95%,53%)]",
  DATABASE: "border-destructive text-destructive",
  PERFORMANCE: "border-primary text-primary",
};

const getTagColor = (tag: string) => {
  const upper = tag.toUpperCase();
  return tagColors[upper] || "border-muted-foreground text-muted-foreground";
};

const TicketList = ({ tickets }: TicketListProps) => {
  return (
    <div className="p-3 pl-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {tickets.map((ticket) => (
        <div
          key={ticket.ticketId}
          className="bg-card border border-border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
              {ticket.ticketId}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {ticket.date}
            </span>
          </div>

          <p className="text-xs text-foreground leading-snug">
            {ticket.description}
          </p>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5 flex-wrap">
              {ticket.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[9px] font-semibold uppercase tracking-wider border rounded-sm px-1.5 py-px ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
              <Info className="h-3 w-3" />
              <span className="font-medium text-foreground">{ticket.source}</span>
            </span>
          </div>

          <div className="flex justify-end">
            <button className="text-[10px] font-medium text-trusted hover:underline flex items-center gap-1">
              View Details
              <ExternalLink className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
