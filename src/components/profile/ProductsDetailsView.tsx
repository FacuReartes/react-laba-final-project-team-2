import { ProductType } from '@/lib/definitions';
import { Box, Button, Typography } from '@mui/material';

export default function ProductDetailsView({ attributes }: ProductType) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: { xs: 4, md: 0 },
        width: { xs: 1, lg: '600px' },
        maxWidth: { xs: 'none', lg: '600px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: '24px', md: '45px' } }}>
          {attributes?.name}
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            alignContent: 'end',
            fontSize: { xs: '18px', md: '24px' },
          }}
        >
          ${attributes?.price}
        </Typography>
      </Box>

      <Typography sx={{ mt: 2, fontWeight: 500 }}>
        {attributes?.gender?.data?.attributes?.name}&apos;s shoes
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          my: 2,
          width: '80px',
          height: '80px',
          border: '4px solid #000',
          borderRadius: 4,
          backgroundColor: attributes?.color?.data?.attributes?.name,
        }}
      ></Box>

      <Typography sx={{ fontWeight: 500, my: 2 }}>Size Availables</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
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

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 4,
          justifyContent: { xs: 'center', lg: 'normal' },
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: { xs: '120px', md: '248px' },
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
            width: { xs: '120px', md: '248px' },
            bgcolor: 'secondary.light',
            ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
          }}
        >
          Add to Bag
        </Button>
      </Box>

      <Typography sx={{ fontWeight: 500, mt: 4 }}>Description</Typography>
      <Box sx={{ width: { xs: 1, lg: '522px' }, mt: 1 }}>
        {attributes?.description}
      </Box>
    </Box>
  );
}
