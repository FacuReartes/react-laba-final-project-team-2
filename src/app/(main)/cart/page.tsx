'use client';
import Product from '@/components/cart/Product';
import Summary from '@/components/cart/Summary';
import useCart, { ICartProduct } from '@/hooks/useCart';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';

export default function Page() {
  const { cartList, handleQuantity } = useCart();

  const renderList = cartList.map((product: ICartProduct, index: number) => {
    const isLast = index === cartList.length - 1;

    return (
      <ListItem key={product.id} sx={{ p: 0, display: 'list-item' }}>
        <Product
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          gender={product.gender}
          handleQuantity={handleQuantity}
          quantity={product.quantity}
        />
        {!isLast && <Divider sx={{ display: { xs: 'none', md: 'block' } }} />}
      </ListItem>
    );
  });

  return (
    <Box
      sx={{
        pt: { xs: '0px', md: '50px' },
        px: { xs: '0px', md: '20px', lg: '50px', xl: '196px' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={{
            fontWeight: 500,
            lineHeight: { xs: '35.19px', md: '52.79px' },
            fontSize: { xs: '30px', md: '45px' },
            my: { xs: '12px', md: '0px' },
            ml: { xs: '20px', sm: '125px', md: '0px' },
          }}
        >
          Chart
        </Typography>
        <List
          sx={{
            p: 0,
            overflowY: { xs: 'hidden', md: 'auto' },
            maxHeight: { xs: 'none', md: '650px' },
            pr: { xs: '0px', md: '20px' },
          }}
        >
          {cartList.length > 0 ? (
            renderList
          ) : (
            <Box>
              <Typography>No products in the cart</Typography>
            </Box>
          )}
        </List>
      </Box>

      <Summary />
    </Box>
  );
}
