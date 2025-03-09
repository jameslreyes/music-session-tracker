import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { Session, Break } from '../types';
import { AppError } from '../middleware/error';

export const sessionsController = {
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { artist_id } = req.query;
      let query = supabase.from('sessions').select(`
        *,
        artists (
          id,
          name,
          hourly_rate
        ),
        breaks (*)
      `).order('start_time', { ascending: false });

      if (artist_id) {
        query = query.eq('artist_id', artist_id);
      }

      const { data, error } = await query;

      if (error) throw new AppError(error.message, 500);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select(`
          *,
          artists (
            id,
            name,
            hourly_rate
          ),
          breaks (*)
        `)
        .eq('id', req.params.id)
        .single();

      if (error) throw new AppError(error.message, 500);
      if (!data) throw new AppError('Session not found', 404);

      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { artist_id, start_time, notes }: Partial<Session> = req.body;

      if (!artist_id) throw new AppError('Artist ID is required', 400);
      if (!start_time) throw new AppError('Start time is required', 400);

      const { data, error } = await supabase
        .from('sessions')
        .insert([{
          artist_id,
          start_time,
          notes,
          status: 'active',
        }])
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
      const updates: Partial<Session> = req.body;

      const { data, error } = await supabase
        .from('sessions')
        .update(updates)
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw new AppError(error.message, 500);
      if (!data) throw new AppError('Session not found', 404);

      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', req.params.id);

      if (error) throw new AppError(error.message, 500);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  addBreak: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { start_time }: Partial<Break> = req.body;

      if (!start_time) throw new AppError('Start time is required', 400);

      const { data, error } = await supabase
        .from('breaks')
        .insert([{
          session_id: req.params.id,
          start_time,
        }])
        .select()
        .single();

      if (error) throw new AppError(error.message, 500);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  endBreak: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { end_time, duration }: Partial<Break> = req.body;

      if (!end_time) throw new AppError('End time is required', 400);
      if (!duration) throw new AppError('Duration is required', 400);

      const { data, error } = await supabase
        .from('breaks')
        .update({ end_time, duration })
        .eq('id', req.params.breakId)
        .eq('session_id', req.params.sessionId)
        .select()
        .single();

      if (error) throw new AppError(error.message, 500);
      if (!data) throw new AppError('Break not found', 404);

      res.json(data);
    } catch (err) {
      next(err);
    }
  },
}; 