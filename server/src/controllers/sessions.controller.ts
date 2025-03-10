import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { Session, Break } from '../types';
import { AppError } from '../middleware/error';

export const sessionsController = {
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('sessionsController --> getAll() --> Getting all sessions');
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
        console.log(`sessionsController --> getAll() --> Filtering by artist_id: ${artist_id}`);
        query = query.eq('artist_id', artist_id);
      }

      const { data, error } = await query;

      if (error) throw new AppError(error.message, 500);
      console.log(`sessionsController --> getAll() --> Found ${data?.length || 0} sessions`);
      res.json(data);
    } catch (err) {
      console.error(`sessionsController --> getAll() --> Error getting all sessions: ${err}`);
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`sessionsController --> getById() --> Getting session with id: ${req.params.id}`);
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

      console.log(`sessionsController --> getById() --> Found session: ${data}`);
      res.json(data);
    } catch (err) {
      console.error(`sessionsController --> getById() --> Error getting session ${req.params.id}: ${err}`);
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`sessionsController --> create() --> Creating new session: ${JSON.stringify(req.body)}`);
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
      console.log('sessionsController --> create() --> Created session:', data);
      res.status(201).json(data);
    } catch (err) {
      console.error(`sessionsController --> create() --> Error creating session: ${err}`);
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`sessionsController --> update() --> Updating session ${req.params.id}:`, req.body);
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

      console.log(`sessionsController --> update() --> Updated session: ${JSON.stringify(data)}`);
      res.json(data);
    } catch (err) {
      console.error(`sessionsController --> update() --> Error updating session: ${err}`);
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`sessionsController --> delete() --> Deleting session ${req.params.id}`);
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', req.params.id);

      if (error) throw new AppError(error.message, 500);
      console.log(`sessionsController --> delete() --> Successfully deleted session ${req.params.id}`);
      res.status(204).send();
    } catch (err) {
      console.error(`sessionsController --> delete() --> Error deleting session: ${err}`);
      next(err);
    }
  },

  addBreak: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`sessionsController --> addBreak() --> Adding break to session ${req.params.id}:`, req.body);
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
      console.log(`sessionsController --> addBreak() --> Added break: ${JSON.stringify(data)}`);
      res.status(201).json(data);
    } catch (err) {
      console.error(`sessionsController --> addBreak() --> Error adding break: ${err}`);
      next(err);
    }
  },

  endBreak: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(`sessionsController --> endBreak() --> Ending break ${req.params.breakId} for session ${req.params.sessionId}:`, req.body);
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

      console.log(`sessionsController --> endBreak() --> Updated break: ${JSON.stringify(data)}`);
      res.json(data);
    } catch (err) {
      console.error(`sessionsController --> endBreak() --> Error ending break: ${err}`);
      next(err);
    }
  },
}; 