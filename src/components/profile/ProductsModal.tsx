import { useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, Button } from '@mui/material';
import Link from 'next/link';
import EditProductForm from '../Product/Form/EditProductForm';
import { ProductType } from '@/lib/definitions';
import DeleteProductForm from '../Product/Form/DeleteProductForm';

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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditOpen = () => setIsEditOpen(true);
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
            onClick={handleDeleteOpen}
            sx={{ py: 0.5, cursor: 'pointer', width: '100%' }}
          >
            Delete
          </Button>
        </Box>
      )}
      {isEditOpen && (
        <EditProductForm
          product={product}
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
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
