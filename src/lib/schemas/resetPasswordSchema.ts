import { ResetPasswordFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';

const schema: ZodType<ResetPasswordFormData> = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default schema;
