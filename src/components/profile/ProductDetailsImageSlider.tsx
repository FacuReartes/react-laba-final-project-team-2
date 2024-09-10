import { ImageType } from '@/lib/definitions';
import { Box } from '@mui/material';
import ImageSlider from './ImageSlider';

export default function ProductDetailsImageSlider({
  imageUrls,
}: {
  imageUrls: ImageType[];
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        height: '628px',
      }}
    >
      <ImageSlider imageUrls={imageUrls} />
    </Box>
  );
}
