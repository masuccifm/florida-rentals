import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), 'MMM dd, yyyy');
}

export function calculateStayDuration(checkIn: Date, checkOut: Date): number {
  return differenceInDays(checkOut, checkIn);
}

export function calculateTotalPrice(
  monthlyPrice: number,
  checkIn: Date,
  checkOut: Date
): number {
  const days = calculateStayDuration(checkIn, checkOut);
  const months = days / 30;
  return Math.round(monthlyPrice * months);
}
