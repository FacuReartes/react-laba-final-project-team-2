import { SettingsFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';
import { emailSchema, phoneSchema } from './commonSchemas';

const schema: ZodType<SettingsFormData> = z.object({
  firstName: z.string().min(2, 'Name is required').max(20),
  lastName: z.string().min(2, 'Surname is required').max(20),
  email: emailSchema,
  phoneNumber: phoneSchema,
});

export default schema;
