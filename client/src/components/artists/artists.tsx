import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Loader2 } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useArtists } from '@/contexts/artists.context';
import type { Artist } from '@/lib/types';
import { ArtistDialog } from './artist-dialog';
import { ArtistsList } from './artists-list';

export function Artists() {
  const { artists, isLoading, error, createArtist, updateArtist, deleteArtist } = useArtists();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleCreate = async (formData: { name: string; email: string; hourly_rate: string }) => {
    try {
      await createArtist({
        name: formData.name,
        email: formData.email,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error('Create failed:', err);
    }
  };

  const handleUpdate = async (formData: { name: string; email: string; hourly_rate: string }) => {
    try {
      if (!selectedArtist) return;
      await updateArtist(selectedArtist.id, {
        name: formData.name,
        email: formData.email,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
      });
      setIsEditDialogOpen(false);
      setSelectedArtist(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async (artist: Artist) => {
    if (!confirm(`Are you sure you want to delete ${artist.name}?`)) return;
    try {
      await deleteArtist(artist.id);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsEditDialogOpen(true);
  };

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
        <h1 className="text-3xl font-bold">Artists</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Artist
            </Button>
          </DialogTrigger>
          <ArtistDialog
            title="Add New Artist"
            onSubmit={handleCreate}
          />
        </Dialog>
      </div>

      <ArtistsList
        artists={artists}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <ArtistDialog
          title="Edit Artist"
          artist={selectedArtist || undefined}
          onSubmit={handleUpdate}
        />
      </Dialog>
    </div>
  );
} 