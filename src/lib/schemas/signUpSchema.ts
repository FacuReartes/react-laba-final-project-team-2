import { SignUpFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';
import { emailSchema, passwordSchema } from './commonSchemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema: ZodType<SignUpFormData> = z
  .object({
    username: z.string().min(2, 'Name is required').max(20),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const useSignupForm = () => {
  return useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });
};

export default schema;
