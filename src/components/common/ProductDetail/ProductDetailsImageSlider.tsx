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
        flexDirection: { xs: 'column', md: 'row' },
        gap: 1,
        alignItems: 'center'
      }}
    >
      <ImageSlider imageUrls={imageUrls} />
    </Box>
  );
}
