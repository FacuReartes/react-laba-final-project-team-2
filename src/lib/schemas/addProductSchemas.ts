import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IProducts {
  name: string;
  images: File[];
  description: string;
  brand: number | string;
  categories: number[] | string[];
  color: number | string;
  gender: number | string;
  sizes: number[];
  price: number;
}

const schema: ZodType<IProducts> = z.object({
  name: z.string().min(2, { message: 'Product name is required' }).max(30, { message: 'Product name is too long' }),
  price: z.number({ message: 'Price is required' }).nonnegative({ message: 'Price must be positive' }).gt(0, 'Price is required'),
  gender: z.string({ message: 'Gender is required' }).or(z.number({ message: 'Gender is required' })),
  brand: z.string({ message: 'Brand is required' }).or(z.number({ message: 'Brand is required' })),
  description: z.string().min(2, { message: 'Description is required' }).max(300, { message: 'Description is too long' }),
  sizes: z.array(z.number({ message: 'Size is required' })).min(1, { message: 'Size is required' }),
  images: z.array(z.any({ message: 'Image is required' })).min(1, { message: 'Image is required' }),
  color: z.string({ message: 'Color is required' }).or(z.number({ message: 'Color is required' })),
  categories: z.array(z.string()).min(1, { message: 'Category is required' }).or(z.array(z.number()).min(1, { message: 'Category is required' })),
});

export const useAddProductForm = () => {
  return useForm<IProducts>({
    resolver: zodResolver(schema),
  });
};

export default schema;
