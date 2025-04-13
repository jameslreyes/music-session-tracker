import dotenv from 'dotenv';
import { Environment } from '../types';
dotenv.config();

export const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
]

export const env: Environment = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
}

export const validateEnv = async (requiredEnvVars: string[]): Promise<boolean> => {
  const missingFields = requiredEnvVars.filter((envVar => !process.env[envVar]));

  if (missingFields.length > 0) {
    console.error(`config/env.ts --> validateEnv() --> Missing required environment variables:\n${missingFields.join('\n')}`);
    return false;
  }

  console.success('config/env.ts --> validateEnv() --> All environment variables validated successfully');
  return true;
}