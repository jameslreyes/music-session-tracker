import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from './error';

export const validate = (schema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next(new AppError(err.errors[0].message, 400, 'VALIDATION_ERROR', err.errors));
    } else {
      next(err);
    }
  }
}; 