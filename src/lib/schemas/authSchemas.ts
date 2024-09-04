import { emailSchema, passwordSchema } from './commonSchemas';
import { z } from 'zod';

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean()
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
