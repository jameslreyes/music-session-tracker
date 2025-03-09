import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Artist } from '@/lib/types';

interface ArtistFormData {
  name: string;
  email: string;
  hourly_rate: string;
}

interface ArtistFormProps {
  artist?: Artist;
  onSubmit: (data: ArtistFormData) => Promise<void>;
}

export function ArtistForm({ artist, onSubmit }: ArtistFormProps) {
  const [formData, setFormData] = useState<ArtistFormData>({
    name: '',
    email: '',
    hourly_rate: '',
  });

  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name,
        email: artist.email || '',
        hourly_rate: artist.hourly_rate?.toString() || '',
      });
    }
  }, [artist]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!artist) {
      // Only reset form for new artists
      setFormData({ name: '', email: '', hourly_rate: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter artist name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter artist email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
          <Input
            id="hourlyRate"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter hourly rate"
            value={formData.hourly_rate}
            onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">
          {artist ? 'Update Artist' : 'Add Artist'}
        </Button>
      </div>
    </form>
  );
} 