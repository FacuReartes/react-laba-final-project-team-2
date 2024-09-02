import { z } from 'zod';
import { emailSchema } from './commonSchemas';

export const signInSchema = z.object({
  email: emailSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
