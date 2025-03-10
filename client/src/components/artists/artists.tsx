import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useArtists } from '@/contexts/artists.context';
import type { Artist } from '@/lib/types';
import { ArtistsList } from './artists-list';
import { AddArtistDialog } from './add-artist-dialog';
import { EditArtistDialog } from './edit-artist-dialog';
import { DeleteArtistDialog } from './delete-artist-dialog';

export function Artists() {
  const { artists, isLoading, isSaving, error, createArtist, updateArtist, deleteArtist } = useArtists();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleCreate = async (formData: { name: string; email: string | null; hourly_rate: string }) => {
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

  const handleUpdate = async (formData: { name: string; email: string | null; hourly_rate: string }) => {
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
    setSelectedArtist(artist);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async (artist: Artist) => {
    try {
      await deleteArtist(artist.id);
      setSelectedArtist(null);
      setIsDeleteDialogOpen(false);
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
        <AddArtistDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleCreate}
          isSaving={isSaving}
        />
      </div>

      <ArtistsList
        artists={artists}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditArtistDialog
        artist={selectedArtist}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdate}
        isSaving={isSaving}
      />

      <DeleteArtistDialog
        artist={selectedArtist}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isSaving={isSaving}
      />
    </div>
  );
}