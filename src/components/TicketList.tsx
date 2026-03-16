import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag, ExternalLink } from "lucide-react";
import type { Ticket } from "@/data/mockData";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList = ({ tickets }: TicketListProps) => {
  // Group tickets by source
  const grouped = tickets.reduce<Record<string, Ticket[]>>((acc, ticket) => {
    if (!acc[ticket.source]) acc[ticket.source] = [];
    acc[ticket.source].push(ticket);
    return acc;
  }, {});

  return (
    <div className="p-4 pl-10 flex gap-3 overflow-x-auto">
      {Object.entries(grouped).map(([source, sourceTickets]) => (
        <div
          key={source}
          className="min-w-[220px] max-w-[260px] flex-shrink-0 bg-muted/50 rounded-md border border-border"
        >
          <div className="px-3 py-2 border-b border-border flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <ExternalLink className="h-3 w-3" />
              {source}
            </span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {sourceTickets.length}
            </Badge>
          </div>
          <div className="p-2 flex flex-col gap-2">
            {sourceTickets.map((ticket) => (
              <div
                key={ticket.ticketId}
                className="bg-card border border-border rounded-sm p-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {ticket.ticketId}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <CalendarDays className="h-2.5 w-2.5" />
                    {ticket.date}
                  </span>
                </div>
                <p className="text-xs text-foreground leading-snug mb-2 line-clamp-3">
                  {ticket.description}
                </p>
                <div className="flex gap-1 flex-wrap">
                  {ticket.tags.map((tag) => (
                    <Badge key={tag} variant="tag" className="text-[9px] px-1.5 py-0">
                      <Tag className="h-2 w-2 mr-0.5" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
