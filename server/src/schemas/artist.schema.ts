import { z } from 'zod';

export const artistSchema = {
  // GET /:id, PUT /:id, DELETE /:id
  params: z.object({
    id: z.string().uuid('Invalid artist ID'),
  }),

  // POST /, PUT /:id
  body: z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
    email: z.string().email('Invalid email').optional().nullable(),
    hourly_rate: z.number().min(0, 'Hourly rate must be positive').optional().nullable(),
  }),
}; 