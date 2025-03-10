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