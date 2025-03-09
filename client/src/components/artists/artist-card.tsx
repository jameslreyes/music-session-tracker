import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Artist } from '@/lib/types';

interface ArtistCardProps {
  artist: Artist;
  onEdit: (artist: Artist) => void;
  onDelete: (artist: Artist) => void;
}

export function ArtistCard({ artist, onEdit, onDelete }: ArtistCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{artist.name}</span>
          <div className="space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(artist)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(artist)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {artist.email && (
            <p className="text-sm text-muted-foreground">{artist.email}</p>
          )}
          <p className="text-sm">
            Rate: {artist.hourly_rate ? formatCurrency(artist.hourly_rate) : 'Not set'}/hr
          </p>
          <p className="text-sm">Total Sessions: {artist.total_sessions}</p>
          <p className="text-sm">
            Total Earnings: {formatCurrency(artist.total_earnings)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 