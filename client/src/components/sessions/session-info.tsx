import { Timer } from 'lucide-react';
import { formatDuration, formatCurrency, calculateSessionCost } from '@/lib/utils';
import { Artist } from '@/lib/types';

interface SessionInfoProps {
  elapsedTime: number;
  selectedArtist: Artist | null;
  isCompleted?: boolean;
}

export function SessionInfo({ elapsedTime, selectedArtist, isCompleted }: SessionInfoProps) {
  const elapsedMinutes = Math.floor(elapsedTime / 60);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <Timer className="h-6 w-6" />
        <span className="text-3xl font-bold">
          {formatDuration(elapsedMinutes)}
        </span>
      </div>

      {!isCompleted && selectedArtist?.hourly_rate && (
        <div className="text-center text-xl">
          Current Cost: {formatCurrency(calculateSessionCost(elapsedMinutes, selectedArtist.hourly_rate))}
        </div>
      )}
    </div>
  );
} 