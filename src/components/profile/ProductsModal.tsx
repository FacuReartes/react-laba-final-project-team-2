import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export default function ProductsModal({ open }: { open: boolean }) {
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
          <Typography>View</Typography>
          <Divider></Divider>
          <Typography>Edit</Typography>
          <Divider></Divider>
          <Typography>Delete</Typography>
        </Box>
      )}
    </>
  );
}
