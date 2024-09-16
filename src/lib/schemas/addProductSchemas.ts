import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IProducts {
  name: string,
  images: File[],
  description: string,
  brand: number,
  categories: number[],
  color: number,
  gender: number,
  sizes: number[],
  price: string,
}

const schema: ZodType<IProducts> = z
  .object({
    name: z.string().min(2, 'Product name is required').max(30),
    price: z.string().min(1),
    gender: z.number(),
    brand: z.number(),
    description: z.string().min(2, 'Description is required').max(300),
    sizes: z.array(z.number()).min(1),
    images: z.array(z.any()),
    color: z.number(),
    categories: z.array(z.number())
  })

export const useAddProductForm = () => {
  return useForm<IProducts>({
    resolver: zodResolver(schema)
  });
};

export default schema;
