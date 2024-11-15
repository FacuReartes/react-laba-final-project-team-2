'use client';
import Product from '@/components/cart/Product';
import Summary from '@/components/cart/Summary';
import {
  CartContext,
  ICartContext,
  ICartProduct,
} from '@/context/cart/CartContext';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Loading from '../common/Loading';
import ProductsEmptyState from '../common/ProductsEmptyState';

export default function Page() {
  const { cartList, loading, handleQuantity, handleDelete } = useContext(
    CartContext
  ) as ICartContext;

  const router = useRouter();

  const renderList = cartList.map((product: ICartProduct, index: number) => {
    const isLast = index === cartList.length - 1;

    return (
      <ListItem
        key={`${product.id}-${product.sizes}`}
        sx={{ p: 0, display: 'list-item' }}
      >
        <Product
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          gender={product.gender}
          sizes={product.sizes}
          handleQuantity={handleQuantity}
          quantity={product.quantity}
          handleDelete={handleDelete}
        />
        {!isLast && <Divider sx={{ display: { xs: 'none', md: 'block' } }} />}
      </ListItem>
    );
  });

  const calculateSubTotal: number = cartList.reduce(
    (acc: number, product: ICartProduct) => {
      return acc + product.price * product.quantity;
    },
    0
  );

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
          Cart
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <>
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
                <ProductsEmptyState
                  path="/"
                  buttonText="Continue Shopping"
                  text="You don't have any products in the cart."
                />
              )}
            </List>
            {cartList.length > 0 && (
              <Box
                sx={{
                  mb: '25px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={() => router.push('/')}
                  variant="contained"
                  disableElevation
                  size="large"
                  sx={{
                    textAlign: 'center',
                    bgcolor: 'secondary.light',
                    color: 'common.white',
                    height: '40px',
                    transition: 'opacity .2s ease',
                    ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
                    borderRadius: 2,
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      <Summary subtotal={calculateSubTotal} loading={loading} />
    </Box>
  );
}
