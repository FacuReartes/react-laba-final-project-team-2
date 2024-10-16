import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';

interface Props {
  matches: number;
}

export const FilterHead = ({ matches }: Props) => {
  const searchTerm = useSearchParams().get('search');
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '320px',
        height: '115px',
        padding: '28px 40px',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ mb: 1 }} variant="subtitle1">
        Shoes / {searchTerm ? searchTerm : ''}
      </Typography>
      <Typography variant="h3">
        {searchTerm ? `${searchTerm} (${matches})` : ''}
      </Typography>
    </Box>
  );
};
