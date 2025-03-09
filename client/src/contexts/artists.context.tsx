import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Artist } from '@/lib/types';
import { artistsApi } from '@/lib/api';

interface ArtistsContextType {
  artists: Artist[];
  isLoading: boolean;
  error: Error | null;
  createArtist: (artist: Partial<Artist>) => Promise<void>;
  updateArtist: (id: string, updates: Partial<Artist>) => Promise<void>;
  deleteArtist: (id: string) => Promise<void>;
  refreshArtists: () => Promise<void>;
}

const ArtistsContext = createContext<ArtistsContextType | null>(null);

export function ArtistsProvider({ children }: { children: ReactNode }) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadArtists = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await artistsApi.getAll();
      setArtists(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load artists'));
      toast.error('Failed to load artists');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createArtist = useCallback(async (artist: Partial<Artist>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newArtist = await artistsApi.create(artist);
      setArtists(prev => [...prev, newArtist]);
      toast.success('Artist created successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create artist'));
      toast.error('Failed to create artist');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateArtist = useCallback(async (id: string, updates: Partial<Artist>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedArtist = await artistsApi.update(id, updates);
      setArtists(prev => prev.map(artist =>
        artist.id === id ? updatedArtist : artist
      ));
      toast.success('Artist updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update artist'));
      toast.error('Failed to update artist');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteArtist = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await artistsApi.delete(id);
      setArtists(prev => prev.filter(artist => artist.id !== id));
      toast.success('Artist deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete artist'));
      toast.error('Failed to delete artist');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArtists();
  }, [loadArtists]);

  return (
    <ArtistsContext.Provider
      value={{
        artists,
        isLoading,
        error,
        createArtist,
        updateArtist,
        deleteArtist,
        refreshArtists: loadArtists,
      }}
    >
      {children}
    </ArtistsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useArtists() {
  const context = useContext(ArtistsContext);
  if (!context) {
    throw new Error('useArtists must be used within an ArtistsProvider');
  }
  return context;
} 