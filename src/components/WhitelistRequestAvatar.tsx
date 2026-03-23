import { MapPin, Phone, Clock, FileText, Mail } from "lucide-react";
import type { WhitelistRequest } from "@/data/mockData";

interface WhitelistRequestAvatarProps {
  requests: WhitelistRequest[];
}

const getInitials = (first: string, last: string) =>
  `${last.charAt(0)}${first.charAt(0)}`.toUpperCase();

const avatarColors = [
  "bg-primary text-primary-foreground",
  "bg-trusted text-white",
  "bg-destructive text-destructive-foreground",
  "bg-accent-foreground text-accent",
];

const WhitelistRequestAvatar = ({ requests }: WhitelistRequestAvatarProps) => {
  if (requests.length === 0) {
    return (
      <div className="p-3 pl-10 py-6 text-center text-xs text-muted-foreground">
        Nicio cerere de whitelistare.
      </div>
    );
  }

  return (
    <div className="p-3 pl-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {requests.map((req, i) => (
        <div
          key={req.id}
          className="bg-card border border-border rounded-md shadow-sm hover:shadow-md transition-shadow flex overflow-hidden"
        >
          {/* Avatar sidebar */}
          <div className="flex flex-col items-center justify-start gap-1.5 px-3 py-3 border-r border-border bg-muted/50">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${avatarColors[i % avatarColors.length]}`}
            >
              {getInitials(req.firstName, req.lastName)}
            </div>
            <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground whitespace-nowrap">
              <Clock className="h-2 w-2" />
              {req.requestedAt.split(" ")[0]}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground">
              {req.lastName} {req.firstName}
            </span>

            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                {req.email}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="h-3 w-3" />
                {req.phone}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {req.address}
              </span>
            </div>

            <div className="pt-1.5 border-t border-border mt-auto">
              <p className="text-xs text-foreground leading-snug flex items-start gap-1.5 pt-1">
                <FileText className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                {req.reason}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhitelistRequestAvatar;
