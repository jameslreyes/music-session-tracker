import { z } from 'zod';

export const settingsSchema = {
  // PUT /
  update: z.object({
    default_hourly_rate: z.number().min(0, 'Default hourly rate must be positive').optional(),
    round_to_nearest: z.number().min(1, 'Round to nearest must be at least 1 minute').optional(),
    tax_percentage: z.number().min(0, 'Tax percentage must be positive').max(100, 'Tax percentage cannot exceed 100').optional(),
  }),
}; 