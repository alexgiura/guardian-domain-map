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
    <div className="p-4 pl-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.ticketId}
          className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-[11px] font-mono px-2.5 py-1 rounded-full">
                ID: {ticket.ticketId}
              </Badge>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {ticket.date}
              </span>
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Description
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {ticket.description}
            </p>

            <div className="flex gap-2 flex-wrap mb-4">
              {ticket.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] font-semibold uppercase tracking-wider border rounded-sm px-2 py-0.5 ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              Source: <span className="font-semibold text-foreground">{ticket.source}</span>
            </span>
            <button className="text-xs font-medium text-trusted hover:underline flex items-center gap-1">
              View Details
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
