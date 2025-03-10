export interface Artist {
  id: string;
  name: string;
  email: string | null;
  hourly_rate: number | null;
  total_sessions: number;
  total_earnings: number;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  artist_id: string;
  start_time: string;
  end_time?: string;
  duration: number;
  cost: number;
  notes: string | null;
  status: 'active' | 'paused' | 'completed';
  created_at: string;
  updated_at: string;
  // Joined data
  artist?: Artist;
  breaks?: Break[];
}

export interface Break {
  id: string;
  session_id: string;
  start_time: string;
  end_time?: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  default_hourly_rate: number;
  round_to_nearest: number;
  tax_percentage: number;
  created_at: string;
  updated_at: string;
}