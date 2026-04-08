import { AlertTriangle, RotateCcw, Clock, Hash, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FailedImport } from "@/data/mockData";

interface FailedImportListProps {
  imports: FailedImport[];
  onReimport: (ticketId: string) => void;
}

const FailedImportList = ({ imports, onReimport }: FailedImportListProps) => {
  if (imports.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
        Nu există importuri eșuate.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-[100px_1fr_1fr_140px_140px_90px] gap-4 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
        <span>Ticket ID</span>
        <span>Sursă</span>
        <span>Eroare</span>
        <span>Data ticket</span>
        <span>Ultima sincr.</span>
        <span className="text-center">Acțiuni</span>
      </div>

      {imports.map((item) => (
        <div
          key={item.ticketId}
          className="grid grid-cols-[100px_1fr_1fr_140px_140px_90px] gap-4 items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
        >
          {/* Ticket ID */}
          <div className="flex items-center gap-1.5">
            <Hash className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">{item.ticketId}</span>
          </div>

          {/* Source */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Server className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <Badge variant="secondary" className="text-[11px] font-mono truncate">
              {item.source}
            </Badge>
          </div>

          {/* Error */}
          <div className="flex items-center gap-1.5 min-w-0">
            <AlertTriangle className="h-3 w-3 text-destructive flex-shrink-0" />
            <span className="text-xs text-destructive font-medium truncate">{item.errorMessage}</span>
          </div>

          {/* Date */}
          <span className="text-xs text-muted-foreground">{item.date}</span>

          {/* Last sync try */}
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground">{item.lastSyncTry}</span>
          </div>

          {/* Reimport button */}
          <div className="flex justify-center">
            <Button
              size="sm"
              variant="outline"
              className="text-xs gap-1.5 h-7"
              onClick={() => onReimport(item.ticketId)}
            >
              <RotateCcw className="h-3 w-3" />
              Reimport
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FailedImportList;
