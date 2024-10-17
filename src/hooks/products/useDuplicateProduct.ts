import { INewProduct } from '@/hooks/useAddProduct';
import { IProducts } from '@/lib/schemas/addProductSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { env } from '../../../env';
import { UseFormReturn } from 'react-hook-form';

export const useDuplicateProduct = (
  onClose: () => void, 
  methods: UseFormReturn<IProducts, any, undefined>
) => {

  const { data: session } = useSession();
  const userID = session?.user.user.id;
  const token = session?.user.jwt;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (data: any) => {
      const { images, ...rest } = data;
      const newProduct: INewProduct = {
        images,
        product: {
          data: {
            teamName: 'team-2',
            ...rest,
            userID: userID,
          },
        },
      };

      const formData = new FormData();
      newProduct.images.forEach((img: File | { id: number }) => {
        if (img instanceof File) {
          formData.append('files', img);
        }
      });

      // eslint-disable-next-line no-useless-catch
      try {
        let imagesId: number[] = []

        if (formData.has('files')) {
          const imageRes = await fetch(`${env.BASE_URL}/upload`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData
          });

          if (!imageRes.ok) throw new Error('Error uploading images')

          const imageResData = await imageRes.json();
          imagesId = imageResData.map((image: { id: number }) => image.id);
        }

        newProduct.product.data.images = [
          ...newProduct.images.
          filter(img => !(img instanceof File) && 'id' in img)
          .map(img => (img as { id: number }).id),
          ...imagesId
        ];

        const productRes = await fetch(`${env.BASE_URL}/products`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct.product)
        })

        if (!productRes) throw new Error('Error creating product')

      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products-filtered'] });
      methods.reset();
      onClose();
    },
    onError: error => {
      console.log('Error updating product:', error);
    },
  });

  return mutation
  
}