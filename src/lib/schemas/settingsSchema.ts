import { SettingsFormData } from '@/lib/definitions';
import { z, ZodType } from 'zod';

const schema: ZodType<SettingsFormData> = z.object({
  name: z.string().min(2, 'Name is required').max(20),
  surname: z.string().min(2, 'Surname is required').max(20),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is required'),
});

export default schema;
