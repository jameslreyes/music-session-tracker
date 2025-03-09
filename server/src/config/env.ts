import dotenv from 'dotenv';
import { Environment } from '../types';
dotenv.config();

export const env: Environment = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
}

export const validateEnv = async (env: Environment): Promise<boolean> => {
  const missingFields = [];

  if (!env.supabaseUrl) {
    missingFields.push('SUPABASE_URL');
  }
  if (!env.supabaseKey) {
    missingFields.push('SUPABASE_SERVICE_ROLE_KEY');
  }
  if (!env.port) {
    missingFields.push('PORT');
  }
  if (!env.nodeEnv) {
    missingFields.push('NODE_ENV');
  }

  if (missingFields.length > 0) {
    console.error('Missing required environment variables:', missingFields.join(', '));
    return false;
  }

  console.success('All environment variables validated successfully');
  return true;
}