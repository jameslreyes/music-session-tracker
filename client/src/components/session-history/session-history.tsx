import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SessionTable } from './session-table';

export function SessionHistory() {
  // This would be replaced with actual data from your backend
  const sessions = [
    {
      id: '1',
      artistName: 'John Doe',
      date: '2024-03-20',
      duration: 120,
      cost: 200,
      status: 'completed',
    },
    {
      id: '2',
      artistName: 'Jane Smith',
      date: '2024-03-19',
      duration: 180,
      cost: 360,
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Session History</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <SessionTable sessions={sessions} />
        </CardContent>
      </Card>
    </div>
  );
} 