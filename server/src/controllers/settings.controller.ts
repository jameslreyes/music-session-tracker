import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { Settings } from '../types';
import { AppError } from '../middleware/error';

export const settingsController = {
  get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // First try to get all settings ordered by creation date
      const { data: allSettings, error: fetchError } = await supabase
        .from('settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw new AppError(fetchError.message, 500);

      // If no settings exist, create default settings
      if (!allSettings || allSettings.length === 0) {
        const defaultSettings = {
          default_hourly_rate: 100,
          round_to_nearest: 15,
          tax_percentage: 0,
        };

        const { data: newSettings, error: createError } = await supabase
          .from('settings')
          .insert([defaultSettings])
          .select()
          .single();

        if (createError) throw new AppError(createError.message, 500);
        res.json(newSettings);
        return;
      }

      // If settings exist, return the most recent one
      res.json(allSettings[0]);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updates: Partial<Settings> = req.body;

      // Get the most recent settings record
      const { data: currentSettings, error: fetchError } = await supabase
        .from('settings')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError) throw new AppError(fetchError.message, 500);
      if (!currentSettings) throw new AppError('Settings not found', 404);

      const { data, error } = await supabase
        .from('settings')
        .update(updates)
        .eq('id', currentSettings.id)
        .select()
        .single();

      if (error) throw new AppError(error.message, 500);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
}; 