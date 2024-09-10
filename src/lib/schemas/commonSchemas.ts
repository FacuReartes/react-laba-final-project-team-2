import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Invalid email address' });

export const passwordSchema = z
  .string()
  .min(1, { message: 'Password is required' })
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(50, { message: 'Password must be less than 50 characters long' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/\d/, { message: 'Password must contain at least one number' })
  .regex(/[@$!%?&]/, {
    message: 'Password must contain at least one special character: @$!%?&',
  })
  .regex(/^\S*$/, { message: 'Password cannot contain spaces' });

export const phoneSchema = z
  .string()
  .min(1, { message: 'Phone number is required' })
  .min(10, { message: 'Phone number must be at least 10 characters long' })
  .regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
    message: 'Phone number must be in the format: (949) 354-2574',
  });

export const searchSchema = z
  .string()
  .trim()
  .min(1, { message: 'Search term must to be at least 1 characters long' })
  .max(20, { message: 'Search term must be less than 20 characters long' });
