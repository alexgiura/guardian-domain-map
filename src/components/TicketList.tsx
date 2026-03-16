import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag } from "lucide-react";
import type { Ticket } from "@/data/mockData";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList = ({ tickets }: TicketListProps) => {
  return (
    <div className="px-4 py-2 pl-14">
      <div className="grid grid-cols-[80px_1fr_200px_100px_100px] gap-2 text-[10px] uppercase font-semibold text-muted-foreground px-3 py-1.5">
        <span>Ticket ID</span>
        <span>Descriere</span>
        <span>Etichete</span>
        <span>Dată</span>
        <span>Sursă</span>
      </div>
      {tickets.map((ticket) => (
        <div
          key={ticket.ticketId}
          className="grid grid-cols-[80px_1fr_200px_100px_100px] gap-2 items-center px-3 py-2 rounded-sm hover:bg-card transition-colors text-sm"
        >
          <span className="font-mono text-xs text-muted-foreground">{ticket.ticketId}</span>
          <span className="text-foreground truncate pr-4">{ticket.description}</span>
          <div className="flex gap-1 flex-wrap">
            {ticket.tags.map((tag) => (
              <Badge key={tag} variant="tag" className="text-[10px]">
                <Tag className="h-2.5 w-2.5 mr-0.5" />
                {tag}
              </Badge>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            {ticket.date}
          </span>
          <span className="text-xs text-muted-foreground">{ticket.source}</span>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
