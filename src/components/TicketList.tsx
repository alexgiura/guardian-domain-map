import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag, ExternalLink, Circle } from "lucide-react";
import type { Ticket } from "@/data/mockData";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList = ({ tickets }: TicketListProps) => {
  return (
    <div className="p-4 pl-10">
      <div className="relative border-l-2 border-border ml-3">
        {tickets.map((ticket, index) => (
          <div key={ticket.ticketId} className="relative pl-6 pb-5 last:pb-2">
            {/* Dot on the timeline */}
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />

            <div className="bg-card border border-border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {ticket.ticketId}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {ticket.date}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 ml-auto">
                  <ExternalLink className="h-3 w-3" />
                  {ticket.source}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
