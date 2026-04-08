import { AlertTriangle, RotateCcw, FileWarning } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FailedImport } from "@/data/mockData";

interface FailedImportListProps {
  imports: FailedImport[];
  onReimport: (id: string) => void;
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
      {imports.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-4 px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
        >
          <div className="mt-0.5 flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <FileWarning className="h-4 w-4 text-destructive" />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {item.error}
              </span>
              <Badge variant="outline" className="text-[10px]">
                {item.id}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              <span>Sursă: <span className="text-foreground font-medium">{item.source}</span></span>
              <span>Importat: <span className="text-foreground font-medium">{item.importedAt}</span></span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-1">
              {Object.entries(item.rawData).map(([key, val]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  <span className="font-semibold">{key}:</span> {val}
                </span>
              ))}
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0 text-xs gap-1.5"
            onClick={() => onReimport(item.id)}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reimport
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FailedImportList;
