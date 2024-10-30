'use client';
import { Box, List, ListItem, Typography } from '@mui/material';
import ProductCard from '../common/ProductCard';
import { useContext } from 'react';
import { ICartContext, CartContext } from '@/context/cart/CartContext';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { APIProductsType } from '@/lib/apiDataTypes';
import Loading from '../common/Loading';
import ProductsEmptyState from '../common/ProductsEmptyState';

const RecentlyViewedContainer: React.FC = () => {
  const { handleAddToCart } = useContext(CartContext) as ICartContext;

  const { productList, isLoading } = useRecentlyViewed();

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: '20px', sm: '60px' },
        mt: { xs: '20px', md: '40px' },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '30px', sm: '45px' },
          lineHeight: '52.79px',
          fontWeight: 500,
        }}
      >
        Recently Viewed
      </Typography>
      {isLoading ? (
        <Loading />
      ) : productList.length > 0 ? (
        <List
          sx={{
            my: { xs: '20px', sm: '40.8px' },
            p: 0,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
            columnGap: { xs: '16px', md: '45px', xl: '60px' },
            rowGap: { xs: '16px', md: '40px' },
          }}
        >
          {productList.map((product: APIProductsType) => (
            <ListItem
              key={product.id}
              sx={{
                p: 0,
                display: 'list-item',
                width: 'auto',
              }}
            >
              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
                upperHeight="338px"
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <ProductsEmptyState
          buttonText="Continue Shopping"
          path="/"
          text="You haven't watched any products recently."
        />
      )}
    </Box>
  );
};

export default RecentlyViewedContainer;
