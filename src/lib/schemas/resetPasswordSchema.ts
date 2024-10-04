import { ResetPasswordFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';
import { passwordSchema } from './commonSchemas';

const schema: ZodType<ResetPasswordFormData> = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
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
  password: string;
  passwordConfirmation: string;
}

export default schema;
