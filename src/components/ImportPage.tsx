import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FailedImportList from "./FailedImportList";
import { mockFailedImports, type FailedImport } from "@/data/mockData";

const ImportPage = () => {
  const [failedImports] = useState<FailedImport[]>(mockFailedImports);
  const [search, setSearch] = useState("");

  const filtered = failedImports.filter((item) =>
    item.ticketId.toLowerCase().includes(search.toLowerCase())
  );

  const handleReimport = (ticketId: string) => {
    console.log("Reimport:", ticketId);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-destructive text-destructive-foreground">
            Erori Import
            <span className="ml-1.5 text-xs opacity-70">{failedImports.length}</span>
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută ticket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <FailedImportList imports={filtered} onReimport={handleReimport} />
      </div>
    </div>
  );
};

export default ImportPage;
