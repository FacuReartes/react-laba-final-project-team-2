import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Link from 'next/link';

export default function ProductsModal({
  open,
  id,
}: {
  open: boolean;
  id: string | number;
}) {
  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: '#FFF',
            top: '44px',
            right: '24px',
            width: '112px',
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0, 0, 0, .6)',
            padding: '8px',
          }}
        >
          <Typography sx={{ py: 0.5 }}>
            <Link
              href={`/profile/products/${id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              View
            </Link>
          </Typography>
          <Divider></Divider>
          <Typography sx={{ py: 0.5, cursor: 'pointer' }}>Edit</Typography>
          <Divider></Divider>
          <Typography sx={{ py: 0.5, cursor: 'pointer' }}>Delete</Typography>
        </Box>
      )}
    </>
  );
}
