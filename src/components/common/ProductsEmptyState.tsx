import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ProductsEmptyState({
  text,
  path,
  buttonText,
}: {
  text: string;
  path: string;
  buttonText: string;
}) {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>
        {text}
      </Typography>
      <Button
        onClick={() => router.push(path)}
        variant="contained"
        disableElevation
        size="large"
        sx={{
          bgcolor: 'secondary.light',
          color: 'common.white',
          height: '40px',
          transition: 'opacity .2s ease',
          ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
          borderRadius: 2,
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}