import { ImageType } from '@/lib/definitions';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function ProductDetailsImageSlider({
  imageUrls,
}: {
  imageUrls: ImageType[];
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
            src={img.attributes.url}
            alt={'product-img'}
            key={img.attributes.name}
            width={76}
            height={76}
            style={{ flexGrow: 1, objectFit: 'cover', height: '100%' }}
          />
        ))}
      </Box>
      <Image
        src={imageUrls[0].attributes.url}
        alt={imageUrls[0].attributes.name}
        width={588}
        height={628}
        style={{ maxWidth: '588px', objectFit: 'cover', height: '100%' }}
      />
    </Box>
  );
}
