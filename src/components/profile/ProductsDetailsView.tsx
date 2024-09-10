import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

type SizeT = number;
type ImagesT = string;

export default function ProductDetailsView({
  id,
  sizes,
  title,
  price,
  genre,
  imageUrls,
  description,
}: {
  id: string | number;
  sizes: SizeT[];
  title: string;
  price: string;
  genre: string;
  imageUrls: ImagesT[];
  description: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h3" sx={{ fontSize: '45px' }}>
          {title} - (id #{id})
        </Typography>
        <Typography sx={{ fontWeight: 500, alignContent: 'end' }}>
          ${price}
        </Typography>
      </Box>

      <Typography sx={{ mt: 2, fontWeight: 500 }}>
        {genre}&apos;s shoes
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
        {imageUrls.map(img => (
          <Image
            src={img}
            alt="product-img"
            key={img}
            width={80}
            height={80}
            style={{ borderRadius: '8px' }}
          />
        ))}
      </Box>
      <Typography sx={{ fontWeight: 500, my: 2 }}>Select Size</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          maxWidth: '550px',
        }}
      >
        {sizes.map(size => (
          <Box
            key={size}
            sx={{
              width: '85px',
              height: '55px',
              borderRadius: '8px',
              border: '1px solid #494949',
              textAlign: 'center',
              alignContent: 'center',
            }}
          >
            EU-{size}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            width: '248px',
            borderColor: 'secondary.light',
            color: 'secondary.light',
            ':hover': { borderColor: 'inherit' },
          }}
        >
          Favorite
        </Button>
        <Button
          variant="contained"
          sx={{
            width: '248px',
            bgcolor: 'secondary.light',
            ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
          }}
        >
          Add to Bag
        </Button>
      </Box>

      <Typography sx={{ fontWeight: 500, mt: 4 }}>Description</Typography>
      <Box sx={{ width: '522px', mt: 1 }}>{description}</Box>
    </Box>
  );
}
