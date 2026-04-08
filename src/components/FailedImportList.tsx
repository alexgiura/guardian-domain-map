import { AlertTriangle, RotateCcw } from "lucide-react";
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
      <div className="grid grid-cols-[80px_130px_1fr_140px_140px_44px] gap-4 px-4 py-2.5 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border bg-muted/50">
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
          className="grid grid-cols-[80px_130px_1fr_140px_140px_44px] gap-4 items-center px-4 py-2.5 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
        >
          <span className="text-sm font-medium text-foreground">{item.ticketId}</span>

          <span className="text-xs text-muted-foreground truncate">{item.source}</span>

          <span className="text-xs font-semibold text-destructive flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3 flex-shrink-0" />
            {item.errorMessage}
          </span>

          <span className="text-xs text-muted-foreground">{item.date}</span>

          <span className="text-xs text-muted-foreground">{item.lastSyncTry}</span>

          <div className="flex justify-center">
            <button
              onClick={() => onReimport(item.ticketId)}
              className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Reimport"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FailedImportList;
