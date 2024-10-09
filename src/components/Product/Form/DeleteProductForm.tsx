import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ProductType } from '@/lib/definitions';
import DeleteDialog from '../Dialogs/DeleteDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteProductFormProps {
  product: ProductType;
  open: boolean;
  onClose: () => void;
  onDeleteProduct: (deletedProduct: ProductType) => void;
}

export default function DeleteProductForm({
  product,
  open,
  onClose,
}: DeleteProductFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const token = session?.user.jwt;

  const { mutate } = useMutation({
    mutationFn: async (productId: number) => {
      return await axios.delete(
        `https://shoes-shop-strapi.herokuapp.com/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      setError('Failed to delete product. Please try again.');
    },
  });

  const handleDeleteProduct = async () => {
    setError(null);
    mutate(product.id);
  };

  return (
    <DeleteDialog
      open={open}
      onClose={onClose}
      onConfirm={handleDeleteProduct}
      message="Are you sure to delete selected item?"
    />
  );
}
