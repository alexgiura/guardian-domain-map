import { useState } from "react";
import { Plus, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import type { Domain } from "@/data/mockData";

const AVAILABLE_TAGS = [
  "malware",
  "phishing",
  "brute-force",
  "ransomware",
  "c2",
  "apt",
  "ddos",
  "dns-tunnel",
  "exfiltration",
  "port-scan",
  "social-engineering",
  "ssh",
  "critical",
  "false-positive",
  "verified",
  "internal",
];

interface AddDomainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (domain: Domain) => void;
}

const AddDomainDialog = ({ open, onOpenChange, onAdd }: AddDomainDialogProps) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(value.trim());

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!value.trim() || !description.trim()) return;

    const newDomain: Domain = {
      id: crypto.randomUUID(),
      value: value.trim(),
      type: isIP ? "IP" : "Domain",
      status: "threat",
      addedDate: new Date().toISOString().split("T")[0],
      tickets: [
        {
          ticketId: `TK-${Date.now()}`,
          description: description.trim(),
          tags: selectedTags,
          date: new Date().toISOString().split("T")[0],
          source: "Manual Entry",
        },
      ],
    };

    onAdd(newDomain);
    setValue("");
    setDescription("");
    setSelectedTags([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adaugă domeniu / IP</DialogTitle>
          <DialogDescription>
            Completează datele pentru a adăuga o nouă intrare în lista de monitorizare.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Value */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="domain-value">Domeniu sau IP</Label>
            <Input
              id="domain-value"
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

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="domain-desc">Descriere</Label>
            <Textarea
              id="domain-desc"
              placeholder="Descrie motivul adăugării..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <Label>Etichete</Label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors border ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {tag}
                    {isSelected && <X className="h-3 w-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Anulează
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!value.trim() || !description.trim()}
          >
            <Plus className="h-4 w-4" />
            Adaugă
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDomainDialog;
