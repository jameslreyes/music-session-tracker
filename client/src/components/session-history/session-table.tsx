import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency, formatDuration } from '@/lib/utils';

interface Session {
  id: string;
  artistName: string;
  date: string;
  duration: number;
  cost: number;
  status: string;
}

interface SessionTableProps {
  sessions: Session[];
}

export function SessionTable({ sessions }: SessionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell>{session.date}</TableCell>
            <TableCell>{session.artistName}</TableCell>
            <TableCell>{formatDuration(session.duration)}</TableCell>
            <TableCell>{formatCurrency(session.cost)}</TableCell>
            <TableCell className="capitalize">{session.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 