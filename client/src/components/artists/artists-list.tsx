import type { Artist } from '@/lib/types';
import { ArtistCard } from './artist-card';

interface ArtistsListProps {
  artists: Artist[];
  onEdit: (artist: Artist) => void;
  onDelete: (artist: Artist) => void;
}

export function ArtistsList({ artists, onEdit, onDelete }: ArtistsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {artists.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
} 