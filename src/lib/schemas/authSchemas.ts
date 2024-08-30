import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, { message: 'Email is required'}).email({ message: 'Invalid email address' })
});