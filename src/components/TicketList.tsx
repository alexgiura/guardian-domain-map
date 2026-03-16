import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag, ExternalLink } from "lucide-react";
import type { Ticket } from "@/data/mockData";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList = ({ tickets }: TicketListProps) => {
  return (
    <div className="p-4 pl-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
      {tickets.map((ticket) => (
        <div
          key={ticket.ticketId}
          className="bg-card border border-border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {ticket.ticketId}
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
              <ExternalLink className="h-3 w-3" />
              {ticket.source}
            </span>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground ml-auto">
              <CalendarDays className="h-3 w-3" />
              {ticket.date}
            </span>
          </div>
          <p className="text-sm text-foreground leading-snug mb-2">
            {ticket.description}
          </p>
          <div className="flex gap-1 flex-wrap">
            {ticket.tags.map((tag) => (
              <Badge key={tag} variant="tag" className="text-[10px]">
                <Tag className="h-2.5 w-2.5 mr-0.5" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
