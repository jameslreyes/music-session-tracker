import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ArtistForm } from './artist-form';
import type { Artist } from '@/lib/types';

interface ArtistDialogProps {
  title: string;
  artist?: Artist;
  onSubmit: (data: { name: string; email: string; hourly_rate: string }) => Promise<void>;
}

export function ArtistDialog({ title, artist, onSubmit }: ArtistDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {artist
            ? "Update the artist's information below."
            : "Add a new artist to start tracking their sessions."}
        </DialogDescription>
      </DialogHeader>
      <ArtistForm artist={artist} onSubmit={onSubmit} />
    </DialogContent>
  );
} 