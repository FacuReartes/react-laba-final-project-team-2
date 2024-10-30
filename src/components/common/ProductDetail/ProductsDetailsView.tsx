'use client';
import WishlistPopup from '@/components/wishList/WishlistPopup';
import { CartContext, ICartContext } from '@/context/cart/CartContext';
import {
  IWishListContext,
  WishListContext,
} from '@/context/wishlist/WishListContext';
import { APIProductsType } from '@/lib/apiDataTypes';
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ProductDetailsView({
  id,
  attributes,
}: APIProductsType) {
  const path = usePathname();
  const { handleAddToCart } = useContext(CartContext) as ICartContext;
  const { wishList, removeWish, addWish } = useContext(
    WishListContext
  ) as IWishListContext;
  const [selectedSize, setSelectedSize] = useState<number | string>('');
  const [openWishDialog, setOpenWishDialog] = useState(false);
  const { data: session } = useSession();

  function handleChangeSize(
    event: React.MouseEvent<HTMLElement>,
    newSize: number | string
  ) {
    setSelectedSize(newSize);
  }

  function handleClick() {
    const pathName = path.split('/');

    if (pathName.includes('product') && selectedSize) {
      handleAddToCart({ id, attributes }, selectedSize);
      setSelectedSize('');
    }
  }

  const isInWishlist = wishList?.some(wish => wish.id === id);

  function handleAddToWish() {
    if (session === undefined || session === null) {
      setOpenWishDialog(true);
      return;
    }
    if (isInWishlist) {
      removeWish(id);
    } else {
      addWish({ id, attributes });
    }
  }

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
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: '24px', md: '45px' } }}>
          {attributes?.name}
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            alignContent: 'end',
            fontSize: { xs: '18px', md: '36px' },
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
      <ToggleButtonGroup
        value={selectedSize}
        onChange={handleChangeSize}
        aria-label="size selection"
        exclusive
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'normal' },
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {attributes?.sizes?.data
          .sort((a, b) => (a.attributes.value > b.attributes.value ? 1 : -1))
          ?.map(size => (
            <ToggleButton
              key={size?.attributes?.value}
              value={size?.attributes?.value}
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.12) !important',
                borderRadius: '4px !important',
                height: '55px',
                width: '85px',
              }}
              color="secondary"
            >
              {size?.attributes?.value}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          mt: 4,
          justifyContent: { xs: 'center' },
          alignItems: { xs: 'center', md: 'normal' },
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: '248px',
            bgcolor: 'common.white',
            color: 'secondary.light',
            borderColor: 'secondary.light',
            ':hover': { opacity: '.9', borderColor: 'inherit' },
          }}
          onClick={handleAddToWish}
        >
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
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
        <ReactMarkdown>{attributes?.description}</ReactMarkdown>
      </Box>

      <WishlistPopup
        handleClose={() => setOpenWishDialog(false)}
        open={openWishDialog}
      />
    </Box>
  );
}
