import { MapPin, Phone, Clock, FileText, Mail } from "lucide-react";
import type { WhitelistRequest } from "@/data/mockData";

interface WhitelistRequestHeaderProps {
  requests: WhitelistRequest[];
}

const WhitelistRequestHeader = ({ requests }: WhitelistRequestHeaderProps) => {
  if (requests.length === 0) {
    return (
      <div className="p-3 pl-10 py-6 text-center text-xs text-muted-foreground">
        Nicio cerere de whitelistare.
      </div>
    );
  }

  return (
    <div className="p-3 pl-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {requests.map((req) => (
        <div
          key={req.id}
          className="bg-card border border-border rounded-md shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
        >
          {/* Colored header */}
          <div className="bg-muted/60 px-3 py-2.5 flex items-center justify-between border-b border-border">
            <span className="text-xs font-semibold text-foreground">
              {req.lastName} {req.firstName}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              {req.requestedAt}
            </span>
          </div>

          {/* Body */}
          <div className="p-3 flex flex-col gap-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {req.email}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              {req.phone}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {req.address}
            </span>
          </div>

          <div className="px-3 pb-3 pt-1 border-t border-border">
            <p className="text-xs text-foreground leading-snug flex items-start gap-1.5 pt-2">
              <FileText className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
              {req.reason}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhitelistRequestHeader;
