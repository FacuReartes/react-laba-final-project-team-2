import { IProducts } from '@/lib/schemas/addProductSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { env } from '../../../env';
import { UseFormReturn } from 'react-hook-form';
import { ProductType } from '@/lib/definitions';

export const useEditProduct = (
  onClose: () => void, 
  methods: UseFormReturn<IProducts, any, undefined>, 
  product: ProductType
) => {

  const { data: session } = useSession();
  const token = session?.user.jwt;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (updatedProductData: any) => {
      const formData = new FormData();
      methods.getValues('images').forEach((img: File | { id: number }) => {
        if (img instanceof File) {
          formData.append('files', img);
        }
      });

      let imagesId: number[] = [];
      if (formData.has('files')) {

        const imageRes = await fetch(`${env.BASE_URL}/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })

        if (!imageRes) throw new Error('Error uploading images')

        const imageResData = await imageRes.json();
        imagesId = imageResData.map((image: { id: number }) => image.id);
      }

      const updatedProduct = {
        data: {
          name: methods.getValues('name'),
          price: methods.getValues('price'),
          description: methods.getValues('description'),
          categories: methods.getValues('categories'),
          color: methods.getValues('color'),
          gender: methods.getValues('gender'),
          brand: methods.getValues('brand'),
          sizes: methods.getValues('sizes'),
          images: [
            ...methods
              .getValues('images')
              .filter(img => !(img instanceof File) && 'id' in img)
              .map(img => (img as { id: number }).id),
            ...imagesId,
          ],
        },
      };

      const productRes = await fetch(`${env.BASE_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!productRes.ok) throw new Error('Error updating product')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products-filtered'] });
      queryClient.invalidateQueries({ queryKey: [`product-${product.id}`] });
      queryClient.invalidateQueries({ queryKey: ['product', product.id] });
      methods.reset();
      onClose();
    },
    onError: error => {
      console.log('Error updating product:', error);
    },
  });

  return mutation
}