export interface Artist {
  id: string;
  name: string;
  email?: string;
  hourly_rate: number | null;
  total_sessions: number;
  total_earnings: number;
  created_at: Date;
  updated_at: Date;
} 