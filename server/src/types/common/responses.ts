export interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
} 