import { SignUpFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';

const schema: ZodType<SignUpFormData> = z
  .object({
    name: z.string().min(2, 'Name is required').max(20),
    email: z.string().email('Invalid email'),
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
