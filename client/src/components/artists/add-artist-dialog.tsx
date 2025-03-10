import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { ArtistForm } from './artist-form';

interface AddArtistDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; email: string | null; hourly_rate: string }) => Promise<void>;
  isSaving?: boolean;
}

export function AddArtistDialog({ isOpen, onOpenChange, onSubmit, isSaving = false }: AddArtistDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Artist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
          <DialogDescription>
            Add a new artist to start tracking their sessions.
          </DialogDescription>
        </DialogHeader>
        <ArtistForm onSubmit={onSubmit} isSaving={isSaving} />
      </DialogContent>
    </Dialog>
  );
} 