import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { WatchlistEntry } from "@/data/mockWatchlist";

interface AddWatchlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (entry: WatchlistEntry) => void;
}

const AddWatchlistDialog = ({ open, onOpenChange, onAdd }: AddWatchlistDialogProps) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(value.trim());

  const handleSubmit = () => {
    if (!value.trim()) return;
    const entry: WatchlistEntry = {
      id: crypto.randomUUID(),
      value: value.trim(),
      type: isIP ? "IP" : "Domain",
      description: description.trim() || undefined,
      addedDate: new Date().toISOString().split("T")[0],
    };
    onAdd(entry);
    setValue("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adaugă în Watchlist</DialogTitle>
          <DialogDescription>
            Adaugă un IP sau domeniu pe care vrei să-l monitorizezi în trafic.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="wl-value">IP sau domeniu</Label>
            <Input
              id="wl-value"
              placeholder="ex: 192.168.1.1 sau example.com"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value.trim() && (
              <span className="text-xs text-muted-foreground">
                Detectat ca: <strong>{isIP ? "IP" : "Domeniu"}</strong>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="wl-desc">Descriere (opțional)</Label>
            <Textarea
              id="wl-desc"
              placeholder="Motivul adăugării..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[60px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Anulează
          </Button>
          <Button onClick={handleSubmit} disabled={!value.trim()}>
            <Plus className="h-4 w-4" />
            Adaugă
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWatchlistDialog;
