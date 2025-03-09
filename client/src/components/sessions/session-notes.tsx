import { Textarea } from '@/components/ui/textarea';

interface SessionNotesProps {
  notes: string;
  onChange: (notes: string) => void;
  disabled?: boolean;
}

export function SessionNotes({ notes, onChange, disabled }: SessionNotesProps) {
  return (
    <Textarea
      placeholder="Add session notes here..."
      className="min-h-[200px]"
      value={notes}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
} 