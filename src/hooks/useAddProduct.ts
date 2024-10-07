import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../../env';
import { IProducts } from '@/lib/schemas/addProductSchemas';
import { UseFormReturn } from 'react-hook-form';

interface ICompletedProduct {
  teamName: string;
  userID?: number;
  name: string;
  images?: number[];
  description: string;
  brand: number | string;
  categories: number[] | string[];
  color: number | string;
  gender: number | string;
  sizes: number[];
  price: number;
}

export interface INewProduct {
  images: File[];
  product: {
    data: ICompletedProduct;
  };
}

export const useAddProduct = (
  token: string | undefined,  
  methods: UseFormReturn<IProducts, any, undefined>, // eslint-disable-line @typescript-eslint/no-unused-vars
  setProductImages: (productImages: File[]) => void,
  setOpenPopup: (isOpenPopup: boolean) => void
) => {

  const queryClient = useQueryClient();

  const { mutate, isSuccess, reset, isPending } = useMutation({
    mutationFn: async (newProduct: INewProduct) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const formData = new FormData();
      newProduct.images.forEach((x: File) => {
        formData.append('files', x);
      });

      // eslint-disable-next-line no-useless-catch
      try {
        const res = await axios.post(`${env.BASE_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const imagesId = res.data.map((image: { id: number }) => image.id);
        newProduct.product.data.images = imagesId;

        axios.post(`${env.BASE_URL}/products`, newProduct.product, config);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products-filtered'] });
      methods.reset();
      setProductImages([]);
    },
    onError: error => {
      setOpenPopup(true);
      console.log(error);
    },
  });

  return {
    mutate, isSuccess, reset, isPending
  }
}