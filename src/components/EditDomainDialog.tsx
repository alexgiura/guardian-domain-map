import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Domain } from "@/data/mockData";

interface EditDomainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domain: Domain;
  onSave: (id: string, updates: { description: string; status: "threat" | "trusted" }) => void;
}

const EditDomainDialog = ({ open, onOpenChange, domain, onSave }: EditDomainDialogProps) => {
  const [description, setDescription] = useState(domain.description || "");
  const [status, setStatus] = useState<"threat" | "trusted">(domain.status);

  useEffect(() => {
    setDescription(domain.description || "");
    setStatus(domain.status);
  }, [domain]);

  const handleSubmit = () => {
    onSave(domain.id, { description: description.trim(), status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editează domeniu</DialogTitle>
          <DialogDescription>
            Modifică descrierea și statusul domeniului.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Value - read only */}
          <div className="flex flex-col gap-1.5">
            <Label>Valoare</Label>
            <Input value={domain.value} disabled className="opacity-60" />
            <span className="text-xs text-muted-foreground">
              Valoarea nu poate fi modificată.
            </span>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-desc">Descriere</Label>
            <Textarea
              id="edit-desc"
              placeholder="Adaugă o descriere..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "threat" | "trusted")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="threat">Threat</SelectItem>
                <SelectItem value="trusted">Trusted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Anulează
          </Button>
          <Button onClick={handleSubmit}>
            <Pencil className="h-4 w-4" />
            Salvează
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDomainDialog;
