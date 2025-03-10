import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronUp, ChevronDown, Loader2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Artist } from '@/lib/types';

interface ArtistFormData {
  name: string;
  email: string | null;
  hourly_rate: string;
}

interface ArtistFormProps {
  artist?: Artist;
  isSaving?: boolean;
  onSubmit: (data: ArtistFormData) => Promise<void>;
}

export function ArtistForm({ artist, isSaving = false, onSubmit }: ArtistFormProps) {
  const [formData, setFormData] = useState<ArtistFormData>({
    name: '',
    email: null,
    hourly_rate: '',
  });

  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name,
        email: artist.email || null,
        hourly_rate: artist.hourly_rate?.toString() || '',
      });
    }
  }, [artist]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      // If email is empty string, convert to null
      email: formData.email?.trim() || null,
    });
    if (!artist) {
      // Only reset form for new artists
      setFormData({ name: '', email: null, hourly_rate: '' });
    }
  };

  const handleRateChange = (value: string) => {
    // Only allow numbers and decimal point
    const sanitizedValue = value.replace(/[^\d.]/g, '');
    // Prevent multiple decimal points
    const parts = sanitizedValue.split('.');
    const finalValue = parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
    setFormData({ ...formData, hourly_rate: finalValue });
  };

  const adjustRate = (amount: number) => {
    const currentRate = parseFloat(formData.hourly_rate) || 0;
    const newRate = Math.max(0, currentRate + amount);
    setFormData({ ...formData, hourly_rate: newRate.toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <style>
        {`
          /* Hide default spinners */
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter artist name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isSaving}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">
            Email
            <span className="ml-1 text-sm text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter artist email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSaving}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
          <div className="relative flex items-center">
            <Input
              id="hourlyRate"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter hourly rate"
              value={formData.hourly_rate}
              onChange={(e) => handleRateChange(e.target.value)}
              className="pr-12"
              disabled={isSaving}
            />
            <div className={cn(
              "absolute right-0 flex flex-col border-l h-full",
              isSaving && "opacity-50"
            )}>
              <button
                type="button"
                onClick={() => adjustRate(1)}
                className={cn(
                  "flex-1 px-2 flex items-center justify-center hover:bg-accent",
                  "border-b border-input"
                )}
                disabled={isSaving}
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => adjustRate(-1)}
                className="flex-1 px-2 flex items-center justify-center hover:bg-accent"
                disabled={isSaving}
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {artist ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {artist ? 'Update Artist' : 'Create Artist'}
          </>
        )}
      </Button>
    </form>
  );
} 