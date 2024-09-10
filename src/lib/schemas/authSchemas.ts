import { useForm } from 'react-hook-form';
import { emailSchema, passwordSchema } from './commonSchemas';
import { z } from 'zod';
import { SignInFormInputs } from '../definitions';
import { zodResolver } from '@hookform/resolvers/zod';

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const useSignInForm = () => {
  return useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
  });
};
