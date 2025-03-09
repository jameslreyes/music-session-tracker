import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ErrorResponse } from '../types';

export class AppError extends Error {
  statusCode: number;
  code?: string;
  details?: unknown;

  constructor(message: string, statusCode: number, code?: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void => {
  console.error(`errorHandler() --> Error: ${err}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        details: err.details,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  });
}; 