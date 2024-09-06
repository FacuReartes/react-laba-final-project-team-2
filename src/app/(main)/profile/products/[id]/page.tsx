import { Box } from '@mui/material';

export default function Page({ params }: { params: { id: string | number } }) {
  return <Box>My id: {params.id}</Box>;
}
