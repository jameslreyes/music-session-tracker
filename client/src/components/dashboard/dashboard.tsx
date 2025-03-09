import { Button } from '@/components/ui/button';
import { Play, Clock, DollarSign, Users } from 'lucide-react';
import { formatCurrency, formatDuration } from '@/lib/utils';
import { StatsCard } from './stats-card';

export function Dashboard() {
  // This would be replaced with actual data from your backend
  const stats = {
    totalSessions: 156,
    totalHours: 312,
    totalEarnings: 15600,
    activeArtists: 12,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button size="lg">
          <Play className="mr-2 h-4 w-4" />
          Start New Session
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Sessions"
          value={stats.totalSessions.toString()}
          icon={Clock}
        />
        <StatsCard
          title="Total Hours"
          value={formatDuration(stats.totalHours * 60)}
          icon={Clock}
        />
        <StatsCard
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          icon={DollarSign}
        />
        <StatsCard
          title="Active Artists"
          value={stats.activeArtists.toString()}
          icon={Users}
        />
      </div>

      {/* Recent Sessions will be added here */}
    </div>
  );
} 