import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function ChatrabashDeleteAlert({
  isOpen,
  onOpenChange,
  onDelete,
}: {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  onDelete: () => void;
}) {
  const [input, setInput] = useState("");

  const isConfirmed = input === "DELETE";

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="size-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete all files and
            settings associated with this app.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-2">
          <Label>
            Type <strong>DELETE</strong> to confirm.
          </Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type DELETE"
          />
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={!isConfirmed}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
