import { Artist } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Play, Pause, Store as Stop } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';

interface SessionControlsProps {
  artists: Artist[];
  selectedArtist: Artist | null;
  isSessionActive: boolean;
  isPaused: boolean;
  onArtistSelect: (artistId: string) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export function SessionControls({
  artists,
  selectedArtist,
  isSessionActive,
  isPaused,
  onArtistSelect,
  onStart,
  onPause,
  onResume,
  onStop,
}: SessionControlsProps) {
  return (
    <div className="space-y-4">
      <Select
        value={selectedArtist?.id}
        onValueChange={onArtistSelect}
        disabled={isSessionActive}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an artist" />
        </SelectTrigger>
        <SelectContent>
          {artists.map((artist) => (
            <SelectItem key={artist.id} value={artist.id}>
              {artist.name} - {artist.hourly_rate ? formatCurrency(artist.hourly_rate) : 'No rate'}/hr
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex justify-center space-x-4">
        {!isSessionActive && (
          <Button size="lg" onClick={onStart}>
            <Play className="mr-2 h-4 w-4" />
            Start Session
          </Button>
        )}

        {isSessionActive && !isPaused && (
          <>
            <Button size="lg" variant="secondary" onClick={onPause}>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
            <Button size="lg" variant="destructive" onClick={onStop}>
              <Stop className="mr-2 h-4 w-4" />
              Stop
            </Button>
          </>
        )}

        {isSessionActive && isPaused && (
          <>
            <Button size="lg" variant="secondary" onClick={onResume}>
              <Play className="mr-2 h-4 w-4" />
              Resume
            </Button>
            <Button size="lg" variant="destructive" onClick={onStop}>
              <Stop className="mr-2 h-4 w-4" />
              Stop
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 