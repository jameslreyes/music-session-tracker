import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import type { Artist } from '@/lib/types';

interface DeleteArtistDialogProps {
  artist: Artist | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (artist: Artist) => Promise<void>;
  isSaving?: boolean;
}

export function DeleteArtistDialog({
  artist,
  isOpen,
  onOpenChange,
  onConfirm,
  isSaving = false
}: DeleteArtistDialogProps) {
  if (!artist) return null;

  const handleConfirm = async () => {
    await onConfirm(artist);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Artist</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-bold">{artist.name}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 