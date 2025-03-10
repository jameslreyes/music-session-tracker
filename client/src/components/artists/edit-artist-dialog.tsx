import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArtistForm } from './artist-form';
import type { Artist } from '@/lib/types';

interface EditArtistDialogProps {
  artist: Artist | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; email: string | null; hourly_rate: string }) => Promise<void>;
  isSaving?: boolean;
}

export function EditArtistDialog({
  artist,
  isOpen,
  onOpenChange,
  onSubmit,
  isSaving = false
}: EditArtistDialogProps) {
  if (!artist) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Artist</DialogTitle>
          <DialogDescription>
            Update the artist's information below.
          </DialogDescription>
        </DialogHeader>
        <ArtistForm artist={artist} onSubmit={onSubmit} isSaving={isSaving} />
      </DialogContent>
    </Dialog>
  );
} 