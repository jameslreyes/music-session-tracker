import { setupCustomLogging } from './config/logger';
import { env, requiredEnvVars, validateEnv } from './config/env';
setupCustomLogging(env.nodeEnv === 'development');
import app from './app';


app.listen(env.port, async () => {
  if (!await validateEnv(requiredEnvVars)) process.exit(1);
  console.info(`server.ts --> app.listen() --> Server is running on port [${env.port}]`);
});