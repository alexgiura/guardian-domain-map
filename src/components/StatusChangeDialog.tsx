import { useState } from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface StatusChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domainValue: string;
  currentStatus: "threat" | "trusted";
  targetStatus: "threat" | "trusted";
  onConfirm: (comment: string) => void;
}

const StatusChangeDialog = ({
  open,
  onOpenChange,
  domainValue,
  currentStatus,
  targetStatus,
  onConfirm,
}: StatusChangeDialogProps) => {
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    if (comment.trim()) {
      onConfirm(comment.trim());
      setComment("");
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) setComment("");
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Schimbare status</DialogTitle>
          <DialogDescription className="text-xs">
            Adaugă un motiv pentru schimbarea statusului.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-xs text-muted-foreground">{domainValue}</span>
          <span className="text-muted-foreground">:</span>
          <Badge variant={currentStatus === "trusted" ? "trusted" : "threat"} className="text-[10px] uppercase">
            {currentStatus}
          </Badge>
          <span className="text-muted-foreground">→</span>
          <Badge variant={targetStatus === "trusted" ? "trusted" : "threat"} className="text-[10px] uppercase">
            {targetStatus}
          </Badge>
        </div>

        <Textarea
          placeholder="Motivul schimbării statusului... (obligatoriu)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px] text-sm"
          autoFocus
        />

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => handleClose(false)}>
            Anulează
          </Button>
          <Button
            size="sm"
            disabled={!comment.trim()}
            onClick={handleConfirm}
            className={targetStatus === "trusted" ? "bg-trusted hover:bg-trusted/90 text-white" : "bg-threat hover:bg-threat/90 text-white"}
          >
            {targetStatus === "trusted" ? (
              <><ShieldCheck className="h-4 w-4" /> Marchează Trusted</>
            ) : (
              <><ShieldAlert className="h-4 w-4" /> Marchează Threat</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeDialog;
