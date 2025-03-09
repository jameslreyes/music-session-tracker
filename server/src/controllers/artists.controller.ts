import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { Artist } from '../types';
import { AppError } from '../middleware/error';

export const artistsController = {
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name');

      if (error) throw new AppError(error.message, 500);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) throw new AppError(error.message, 500);
      if (!data) throw new AppError('Artist not found', 404);

      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, hourly_rate }: Partial<Artist> = req.body;

      if (!name) throw new AppError('Name is required', 400);

      const { data, error } = await supabase
        .from('artists')
        .insert([{ name, email, hourly_rate }])
        .select()
        .single();

      if (error) throw new AppError(error.message, 500);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, hourly_rate }: Partial<Artist> = req.body;

      const { data, error } = await supabase
        .from('artists')
        .update({ name, email, hourly_rate })
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw new AppError(error.message, 500);
      if (!data) throw new AppError('Artist not found', 404);

      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error } = await supabase
        .from('artists')
        .delete()
        .eq('id', req.params.id);

      if (error) throw new AppError(error.message, 500);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
}; 