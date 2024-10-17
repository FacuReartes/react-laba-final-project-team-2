import { useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, Button } from '@mui/material';
import Link from 'next/link';
import { ProductType } from '@/lib/definitions';
import DeleteProductForm from '../Product/Form/DeleteProductForm';
import ProductUpdateForm from '../Product/Form/ProductUpdateForm';
import { useEditProduct } from '@/hooks/products/useEditProduct';
import { useDuplicateProduct } from '@/hooks/products/useDuplicateProduct';

interface ProductsModalProps {
  open: boolean;
  id: number;
  product: ProductType;
}

export default function ProductsModal({
  open,
  id,
  product,
}: ProductsModalProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditOpen = () => setIsEditOpen(true);
  const handleDuplicateOpen = () => setIsDuplicateOpen(true);
  const handleDeleteOpen = () => setIsDeleteOpen(true);

  const handleDeleteProduct = (deletedProduct: ProductType) => {
    console.log('Product deleted:', deletedProduct);
    setIsDeleteOpen(false);
  };

  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'common.white',
            top: '44px',
            right: '24px',
            width: '150px',
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)',
            padding: '8px',
            zIndex: 1000,
          }}
        >
            <Link
              href={`/profile/products/${id}`}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button sx={{ py: 0.5, width: '100%' }}>
                  View
              </Button>
            </Link>
          <Divider />
          <Button
            onClick={handleEditOpen}
            sx={{ py: 0.5, cursor: 'pointer', width: '100%' }}
          >
            Edit
          </Button>
          <Divider />
          <Button
            onClick={handleDuplicateOpen}
            sx={{ py: 0.5, cursor: 'pointer', width: '100%' }}
          >
            Duplicate
          </Button>
          <Divider />
          <Button
            onClick={handleDeleteOpen}
            sx={{ py: 0.5, cursor: 'pointer', width: '100%' }}
          >
            Delete
          </Button>
        </Box>
      )}
      {isEditOpen && (
        <ProductUpdateForm
          title='Edit Product'
          product={product}
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          useUpdateHook={useEditProduct}
        />
      )}
      {isDuplicateOpen && (
        <ProductUpdateForm
          title='Duplicate Product'
          product={product}
          open={isDuplicateOpen}
          onClose={() => setIsDuplicateOpen(false)}
          useUpdateHook={useDuplicateProduct}
        />
      )}
      {isDeleteOpen && (
        <DeleteProductForm
          product={product}
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </>
  );
}
