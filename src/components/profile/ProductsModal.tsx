import { useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, Button } from '@mui/material';
import Link from 'next/link';
import EditProductForm from '../AddProductForm/EditProductForm';
import { ProductType } from '@/lib/definitions';

interface ProductsModalProps {
  open: boolean;
  id: string | number;
  product: ProductType;
}

export default function ProductsModal({
  open,
  id,
  product
}: ProductsModalProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = () => setIsEditOpen(true);
  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'common.white',
            top: '44px',
            right: '24px',
            width: '112px',
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0, 0, 0, .6)',
            padding: '8px',
          }}
        >
          <Button sx={{ py: 0.5, width: '100%' }}>
            <Link
              href={`/profile/products/${id}`}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              View
            </Link>
          </Button>
          <Divider />
          <Button onClick={handleEditOpen} sx={{ py: 0.5, cursor: 'pointer', width: '100%' }}>Edit</Button>
          <Divider />
          <Button sx={{ py: 0.5, cursor: 'pointer', width: '100%' }}>Delete</Button>
        </Box>  
      )}
      {isEditOpen && <EditProductForm product={product} open={isEditOpen} onClose={() => setIsEditOpen(false)} />}
    </>
  );
}
