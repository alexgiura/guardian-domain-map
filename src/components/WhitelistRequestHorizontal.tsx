import { User, MapPin, Phone, Clock, FileText, Mail } from "lucide-react";
import type { WhitelistRequest } from "@/data/mockData";

interface WhitelistRequestHorizontalProps {
  requests: WhitelistRequest[];
}

const WhitelistRequestHorizontal = ({ requests }: WhitelistRequestHorizontalProps) => {
  if (requests.length === 0) {
    return (
      <div className="p-3 pl-10 py-6 text-center text-xs text-muted-foreground">
        Nicio cerere de whitelistare.
      </div>
    );
  }

  return (
    <div className="p-3 pl-10 flex flex-col gap-2.5">
      {requests.map((req) => (
        <div
          key={req.id}
          className="bg-card border border-border rounded-md shadow-sm hover:shadow-md transition-shadow flex items-stretch overflow-hidden"
        >
          {/* Persoană */}
          <div className="flex flex-col justify-center gap-1 px-4 py-3 min-w-[180px] border-r border-border">
            <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              {req.lastName} {req.firstName}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              {req.requestedAt}
            </span>
          </div>

          {/* Contact */}
          <div className="flex flex-col justify-center gap-1.5 px-4 py-3 min-w-[220px] border-r border-border">
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

          {/* Motiv */}
          <div className="flex items-center gap-1.5 px-4 py-3 flex-1">
            <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <p className="text-xs text-foreground leading-snug">{req.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhitelistRequestHorizontal;
