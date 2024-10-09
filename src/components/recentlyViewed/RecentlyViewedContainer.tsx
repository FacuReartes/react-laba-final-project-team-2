'use client'
import { Box, Button, List, ListItem, Typography } from '@mui/material'
import ProductCard from '../home/ProductCard';
import { useContext } from 'react';
import { ICartContext, CartContext } from '@/context/CartContext';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { APIProductsType } from '@/lib/apiDataTypes';
import { useRouter } from 'next/navigation';
import Loading from '../common/Loading';

const RecentlyViewedContainer: React.FC = () => {

  const { handleAddToCart } = useContext(CartContext) as ICartContext;

  const { productList, isLoading } = useRecentlyViewed()

  const router = useRouter()

  return (
    <Box 
      sx={{ 
        width:'100%',
        px: { xs: '20px', sm: '60px' }, 
        mt: { xs: '20px', md: '40px' },
      }}
    >
      <Typography 
        sx={{ 
          fontSize: { xs: '30px', sm: '45px' }, 
          lineHeight: '52.79px', 
          fontWeight: 500 
        }}
      >
        Recently Viewed
      </Typography>
      { isLoading ? 
      <Loading/>
      : 
      <List 
        sx={{ 
          my: { xs: '20px', sm:'40.8px' }, 
          p: 0,
          display: 'flex',
          flexWrap: 'wrap', 
          columnGap: { xs: '16px', md: '60px' },
          rowGap: { xs: '16px', md: '40px' },
          justifyContent: 'space-around'
        }} 
      >
        { productList.length > 0 ? productList.map((product: APIProductsType) => (
          <ListItem 
            sx={{
              p: 0, 
              display: 'list-item', 
              width: 'auto'
            }} 
            key={product.id}
          >
            <ProductCard 
              product={product} 
              handleAddToCart={handleAddToCart}
              width='288px'
              upperHeight='338px'
            />
          </ListItem>
        )) : 
        <Box
          sx={{
            my: '50px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            px: { xs: '20px', sm: '0px' },
          }}
        >
        <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>
          You haven&apos;t watched any products recently.
        </Typography>
        <Button
          onClick={() => router.push('/')}
          variant="contained"
          disableElevation
          size="large"
          sx={{
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
        }
      </List>
    }
    </Box>
  )
}

export default RecentlyViewedContainer