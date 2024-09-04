import { SettingsFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';
import { emailSchema, phoneSchema } from './commonSchemas';

const schema: ZodType<SettingsFormData> = z.object({
  name: z.string().min(2, 'Name is required').max(20),
  surname: z.string().min(2, 'Surname is required').max(20),
  email: emailSchema,
  phone: phoneSchema,
});

export default schema;
