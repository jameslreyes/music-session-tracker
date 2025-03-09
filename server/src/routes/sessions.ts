import { Router } from 'express';
import { sessionsController } from '../controllers/sessions.controller';
import { validate } from '../middleware/validate';
import { sessionSchema } from '../schemas/session.schema';
import { z } from 'zod';

const router = Router();

// Session management
router.get('/', validate(z.object({ query: sessionSchema.query })), sessionsController.getAll);
router.get('/:id', validate(z.object({ params: sessionSchema.params })), sessionsController.getById);
router.post('/', validate(z.object({ body: sessionSchema.create })), sessionsController.create);
router.put('/:id', validate(z.object({ params: sessionSchema.params, body: sessionSchema.update })), sessionsController.update);
router.delete('/:id', validate(z.object({ params: sessionSchema.params })), sessionsController.delete);

// Break management
router.post('/:id/breaks',
  validate(z.object({ params: sessionSchema.params, body: sessionSchema.addBreak })),
  sessionsController.addBreak
);
router.put('/:sessionId/breaks/:breakId',
  validate(sessionSchema.endBreak),
  sessionsController.endBreak
);

export default router; 