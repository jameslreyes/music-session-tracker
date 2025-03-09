import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useArtists } from '@/contexts/artists.context';
import { useSessions } from '@/contexts/sessions.context';
import { SessionControls } from './session-controls';
import { SessionInfo } from './session-info';
import { SessionNotes } from './session-notes';

export function SessionManagement() {
  const { artists } = useArtists();
  const {
    currentSession,
    elapsedTime,
    notes,
    isLoading,
    error,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    updateNotes,
  } = useSessions();

  const selectedArtist = artists.find(a => a.id === currentSession?.artist_id) || null;
  const isPaused = currentSession?.status === 'paused';
  const isCompleted = currentSession?.status === 'completed';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-destructive">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Session Management</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionControls
              artists={artists}
              selectedArtist={selectedArtist}
              isSessionActive={!!currentSession}
              isPaused={isPaused}
              onArtistSelect={startSession}
              onStart={() => startSession(selectedArtist!.id)}
              onPause={pauseSession}
              onResume={resumeSession}
              onStop={stopSession}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Info</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionInfo
              elapsedTime={elapsedTime}
              selectedArtist={selectedArtist}
              isCompleted={isCompleted}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Session Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionNotes
              notes={notes}
              onChange={updateNotes}
              disabled={!currentSession || isCompleted}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 