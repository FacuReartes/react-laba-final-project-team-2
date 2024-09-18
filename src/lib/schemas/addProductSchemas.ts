import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IProducts {
  name: string,
  images: File[],
  description: string,
  brand: number | string,
  categories: number[] | string[],
  color: number | string,
  gender: number | string,
  sizes: number[],
  price: string,
}

const schema: ZodType<IProducts> = z
  .object({
    name: z.string().min(2, 'Product name is required').max(30),
    price: z.string().min(1),
    gender: z.string().or(z.number()),
    brand: z.string().or(z.number()),
    description: z.string().min(2, 'Description is required').max(300),
    sizes: z.array(z.number()).min(1),
    images: z.array(z.any()),
    color: z.string().or(z.number()),
    categories: z.array(z.string()).or(z.array(z.number()))
  })

export const useAddProductForm = () => {
  return useForm<IProducts>({
    resolver: zodResolver(schema)
  });
};

export default schema;
