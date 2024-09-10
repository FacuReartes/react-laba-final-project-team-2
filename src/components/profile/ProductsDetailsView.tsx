import { ProductType } from '@/lib/definitions';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

export default function ProductDetailsView({ attributes }: ProductType) {
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
          {attributes?.name}
        </Typography>
        <Typography sx={{ fontWeight: 500, alignContent: 'end' }}>
          ${attributes?.price}
        </Typography>
      </Box>

      <Typography sx={{ mt: 2, fontWeight: 500 }}>
        {attributes?.gender?.data?.attributes?.name}&apos;s shoes
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
        {attributes?.images?.data?.map(img => (
          <Image
            src={img.attributes.url}
            alt={img.attributes.name}
            key={img.id}
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
        {attributes?.sizes?.data?.map(size => (
          <Box
            key={size?.attributes?.value}
            sx={{
              width: '85px',
              height: '55px',
              borderRadius: '8px',
              border: '1px solid #494949',
              textAlign: 'center',
              alignContent: 'center',
            }}
          >
            EU-{size?.attributes?.value}
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
      <Box sx={{ width: '522px', mt: 1 }}>{attributes?.description}</Box>
    </Box>
  );
}
