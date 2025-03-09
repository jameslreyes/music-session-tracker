import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Session } from '@/lib/types';
import { sessionsApi } from '@/lib/api';

interface SessionsContextType {
  currentSession: Session | null;
  elapsedTime: number;
  notes: string;
  isLoading: boolean;
  error: Error | null;
  startSession: (artistId: string) => Promise<void>;
  pauseSession: () => Promise<void>;
  resumeSession: () => Promise<void>;
  stopSession: () => Promise<void>;
  updateNotes: (notes: string) => Promise<void>;
}

const SessionsContext = createContext<SessionsContextType | null>(null);

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Handle timer updates
  useEffect(() => {
    let interval: number | undefined;

    if (currentSession?.status === 'active') {
      interval = window.setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentSession?.status]);

  const startSession = useCallback(async (artistId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const session = await sessionsApi.create({
        artist_id: artistId,
        start_time: new Date().toISOString(),
        status: 'active',
        notes: '',
      });
      setCurrentSession(session);
      setElapsedTime(0);
      setNotes('');
      toast.success('Session started');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start session'));
      toast.error('Failed to start session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pauseSession = useCallback(async () => {
    if (!currentSession) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedSession = await sessionsApi.update(currentSession.id, {
        status: 'paused',
      });
      setCurrentSession(updatedSession);
      toast.success('Session paused');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to pause session'));
      toast.error('Failed to pause session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

  const resumeSession = useCallback(async () => {
    if (!currentSession) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedSession = await sessionsApi.update(currentSession.id, {
        status: 'active',
      });
      setCurrentSession(updatedSession);
      toast.success('Session resumed');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to resume session'));
      toast.error('Failed to resume session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

  const stopSession = useCallback(async () => {
    if (!currentSession) return;

    try {
      setIsLoading(true);
      setError(null);
      const durationInMinutes = Math.floor(elapsedTime / 60);
      const updatedSession = await sessionsApi.update(currentSession.id, {
        status: 'completed',
        end_time: new Date().toISOString(),
        duration: durationInMinutes,
        notes,
      });
      setCurrentSession(updatedSession);
      toast.success('Session completed');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to stop session'));
      toast.error('Failed to stop session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, elapsedTime, notes]);

  const updateNotes = useCallback(async (newNotes: string) => {
    if (!currentSession) return;
    setNotes(newNotes);

    try {
      const updatedSession = await sessionsApi.update(currentSession.id, {
        notes: newNotes,
      });
      setCurrentSession(updatedSession);
    } catch (err) {
      console.error('Failed to update notes:', err);
      // Don't show toast for notes update failure
    }
  }, [currentSession]);

  return (
    <SessionsContext.Provider
      value={{
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
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSessions() {
  const context = useContext(SessionsContext);
  if (!context) {
    throw new Error('useSessions must be used within a SessionsProvider');
  }
  return context;
} 