import { Router } from 'express';
import { settingsController } from '../controllers/settings.controller';
import { validate } from '../middleware/validate';
import { settingsSchema } from '../schemas/settings.schema';
import { z } from 'zod';

const router = Router();

router.get('/', settingsController.get);
router.put('/', validate(z.object({ body: settingsSchema.update })), settingsController.update);

export default router; 