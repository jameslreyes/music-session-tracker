import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error';

import artistRoutes from './routes/artists';
import sessionRoutes from './routes/sessions';
import settingsRoutes from './routes/settings';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/artists', artistRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling
app.use(errorHandler);

export default app;