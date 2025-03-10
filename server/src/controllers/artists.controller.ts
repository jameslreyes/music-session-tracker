import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { Artist } from '../types';
import { AppError } from '../middleware/error';

export const artistsController = {
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('artistsController --> getAll() --> Getting all artists');
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name');

      if (error) throw new AppError(error.message, 500);
      console.log(`artistsController --> getAll() --> Found ${data?.length || 0} artists`);
      console.log(`artistsController --> getAll() --> Found artists:\n${JSON.stringify(data, null, 2)}`);
      res.json(data);
    } catch (err) {
      console.error(`artistsController --> getAll() --> Error getting all artists: ${err}`);
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`artistsController --> getById() --> Getting artist with id: ${req.params.id}`);
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) throw new AppError(error.message, 500);
      if (!data) throw new AppError('Artist not found', 404);

      console.log(`artistsController --> getById() --> Found artist:\n${JSON.stringify(data, null, 2)}`);
      res.json(data);
    } catch (err) {
      console.error(`artistsController --> getById() --> Error getting artist ${req.params.id}: ${err}`);
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`artistsController --> create() --> Creating new artist: ${JSON.stringify(req.body, null, 2)}`);
    try {
      const { name, email, hourly_rate }: Partial<Artist> = req.body;

      if (!name) throw new AppError('Name is required', 400);

      const { data, error } = await supabase
        .from('artists')
        .insert([{ name, email, hourly_rate }])
        .select()
        .single();

      if (error) throw new AppError(error.message, 500);
      console.log(`artistsController --> create() --> Created artist:\n${JSON.stringify(data, null, 2)}`);
      res.status(201).json(data);
    } catch (err) {
      console.error(`artistsController --> create() --> Error creating artist: ${err}`);
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`artistsController --> update() --> Updating artist ${req.params.id}:`, req.body);
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

      console.log(`artistsController --> update() --> Updated artist:\n${JSON.stringify(data, null, 2)}`);
      res.json(data);
    } catch (err) {
      console.error(`artistsController --> update() --> Error updating artist: ${err}`);
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`artistsController --> delete() --> Deleting artist ${req.params.id}`);
    try {
      const { error } = await supabase
        .from('artists')
        .delete()
        .eq('id', req.params.id);

      if (error) throw new AppError(error.message, 500);
      console.log(`artistsController --> delete() --> Successfully deleted artist ${req.params.id}`);
      res.status(204).send();
    } catch (err) {
      console.error(`artistsController --> delete() --> Error deleting artist: ${err}`);
      next(err);
    }
  },
}; 