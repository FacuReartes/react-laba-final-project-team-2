import { SettingsFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';
import { emailSchema, phoneSchema } from './commonSchemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const schema: ZodType<SettingsFormData> = z.object({
  firstName: z.string().min(2, 'Name is required').max(20),
  lastName: z.string().min(2, 'Surname is required').max(20),
  email: emailSchema,
  phoneNumber: phoneSchema,
});

export const useSettingsForm = (user: SettingsFormData) => {
  return useForm<SettingsFormData>({
    resolver: zodResolver(schema),
    defaultValues: user || {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });
};

export const useInitializeForm = (user: SettingsFormData, reset: any) => {
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [user, reset]);
};

export default schema;
