import { Box } from '@mui/material';
import Image from 'next/image';

type ImageT = string;

export default function ProductDetailsImageSlider({
  imageUrls,
}: {
  imageUrls: ImageT[];
}) {
  return (
    <Box sx={{ display: 'flex', gap: 1, height: '628px', width: '60%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '76px',
          gap: 2,
        }}
      >
        {imageUrls.map(img => (
          <Image
            src={img}
            alt={'product-img'}
            key={img}
            width={76}
            height={76}
            style={{ flexGrow: 1, objectFit: 'cover', height: '100%' }}
          />
        ))}
      </Box>
      <Image
        src={imageUrls[0]}
        alt="product-img"
        width={588}
        height={628}
        style={{ maxWidth: '588px', objectFit: 'cover', height: '100%' }}
      />
    </Box>
  );
}
