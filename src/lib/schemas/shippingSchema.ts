import { z, ZodType } from 'zod';
import { ShippingFormData } from '../definitions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema: ZodType<ShippingFormData> = z.object({
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(2, 'Zip is required'),
  address: z.string().min(2, 'Address is required'),
});

export const useShippingForm = () => {
  return useForm<ShippingFormData>({
    resolver: zodResolver(schema),
  });
};

export default schema;
