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

export interface Session {
  id: string;
  artist_id: string;
  start_time: Date;
  end_time?: Date;
  duration: number;
  cost: number;
  notes: string | null;
  status: 'active' | 'paused' | 'completed';
  created_at: Date;
  updated_at: Date;
}

export interface Break {
  id: string;
  session_id: string;
  start_time: Date;
  end_time?: Date;
  duration: number;
  created_at: Date;
  updated_at: Date;
}

export interface Settings {
  id: string;
  default_hourly_rate: number;
  round_to_nearest: number;
  tax_percentage: number;
  created_at: Date;
  updated_at: Date;
}

export interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export interface Environment {
    port: number;
    nodeEnv: string;
    supabaseUrl: string;
    supabaseKey: string;
}
