'use client';
import { CartContext, ICartContext } from '@/context/CartContext';
import { APIProductsType } from '@/lib/apiDataTypes';
import { Box, Button, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';

export default function ProductDetailsView({
  id,
  attributes,
}: APIProductsType) {
  const path = usePathname();
  const { handleAddToCart } = useContext(CartContext) as ICartContext;
  const [selectedSize, setSelectedSize] = useState<number | string>('');

  function handleClick() {
    const pathName = path.split('/');

    if (pathName.includes('product') && selectedSize) {
      handleAddToCart({ id, attributes }, selectedSize);
      setSelectedSize('');
    }
  }

  console.log(selectedSize);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: { xs: 4, md: 0 },
        width: { xs: 1 },
        maxWidth: { xs: 'none', sm: '600px' },
        mx: { md: 'auto' },
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

      <Box sx={{ mt: 2, mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {attributes?.categories?.data?.map(cat => (
          <Typography
            key={cat.id}
            sx={{
              display: 'inline',
              p: 1,
              borderRadius: '6px',
              border: '1px solid',
              borderColor: 'common.black',
              color: 'common.black',
            }}
          >
            {cat.attributes?.name}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          my: 2,
          width: '80px',
          height: '80px',
          border: '2px solid',
          borderColor: 'common.black',
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
              border: '1px solid',
              borderColor:
                selectedSize === size.attributes.value
                  ? 'secondary.light'
                  : 'grey.200',
              textAlign: 'center',
              alignContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedSize(size.attributes.value)}
          >
            EU-{size?.attributes?.value}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          mt: 4,
          justifyContent: { xs: 'center' },
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: '248px',
            bgcolor: 'secondary.light',
            ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
          }}
          onClick={handleClick}
        >
          Add to Cart
        </Button>
      </Box>

      <Typography sx={{ fontWeight: 500, mt: 4 }}>Description</Typography>
      <Box sx={{ width: { xs: 1, lg: '522px' }, mt: 1 }}>
        {attributes?.description}
      </Box>
    </Box>
  );
}
