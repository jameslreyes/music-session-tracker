import { Router } from 'express';
import { artistsController } from '../controllers/artists.controller';
import { validate } from '../middleware/validate';
import { artistSchema } from '../schemas/artist.schema';
import { z } from 'zod';

const router = Router();

router.get('/', artistsController.getAll);
router.get('/:id', validate(z.object({ params: artistSchema.params })), artistsController.getById);
router.post('/', validate(z.object({ body: artistSchema.body })), artistsController.create);
router.put('/:id', validate(z.object({ params: artistSchema.params, body: artistSchema.body })), artistsController.update);
router.delete('/:id', validate(z.object({ params: artistSchema.params })), artistsController.delete);

export default router; 