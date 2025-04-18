import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function calculateSessionCost(
  durationInMinutes: number,
  hourlyRate: number,
  taxPercentage: number = 0
): number {
  const hours = durationInMinutes / 60;
  const subtotal = hours * hourlyRate;
  const tax = subtotal * (taxPercentage / 100);
  return subtotal + tax;
}