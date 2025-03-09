import { z } from 'zod';

export const sessionSchema = {
  // GET /?artist_id=
  query: z.object({
    artist_id: z.string().uuid('Invalid artist ID').optional(),
  }),

  // GET /:id, PUT /:id, DELETE /:id
  params: z.object({
    id: z.string().uuid('Invalid session ID'),
  }),

  // POST /
  create: z.object({
    artist_id: z.string().uuid('Invalid artist ID'),
    start_time: z.string().datetime('Invalid start time'),
    notes: z.string().optional().nullable(),
  }),

  // PUT /:id
  update: z.object({
    status: z.enum(['active', 'paused', 'completed']).optional(),
    end_time: z.string().datetime('Invalid end time').optional(),
    duration: z.number().min(0, 'Duration must be positive').optional(),
    cost: z.number().min(0, 'Cost must be positive').optional(),
    notes: z.string().optional().nullable(),
  }),

  // POST /:id/breaks
  addBreak: z.object({
    start_time: z.string().datetime('Invalid start time'),
  }),

  // PUT /:sessionId/breaks/:breakId
  endBreak: z.object({
    params: z.object({
      sessionId: z.string().uuid('Invalid session ID'),
      breakId: z.string().uuid('Invalid break ID'),
    }),
    body: z.object({
      end_time: z.string().datetime('Invalid end time'),
      duration: z.number().min(0, 'Duration must be positive'),
    }),
  }),
}; 