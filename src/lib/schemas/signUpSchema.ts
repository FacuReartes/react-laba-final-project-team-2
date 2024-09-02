import { SignUpFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';
import { emailSchema, passwordSchema } from './commonSchemas';

const schema: ZodType<SignUpFormData> = z
  .object({
    name: z.string().min(2, 'Name is required').max(20),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default schema;