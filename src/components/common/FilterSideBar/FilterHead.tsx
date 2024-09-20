import { Box, Typography } from '@mui/material';

interface FilterHeadProps {
  searchTerm?: string;
  matches: number;
}

export const FilterHead = ({ searchTerm, matches }: FilterHeadProps) => {
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
