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

export interface APISuccessResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface APIErrorResponse {
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
}

export interface ResetPasswordVariables {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export default schema;
