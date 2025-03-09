import { setupCustomLogging } from './config/logger';
import { env, validateEnv } from './config/env';
setupCustomLogging(env.nodeEnv === 'development');
import app from './app';


app.listen(env.port, async () => {
  const isValid = await validateEnv(env);
  if (!isValid) {
    console.error('Environment variables validation failed');
    process.exit(1);
  }
  console.log(`Server is running on port ${env.port}`);
});