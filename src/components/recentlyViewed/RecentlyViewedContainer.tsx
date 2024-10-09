'use client'
import { Box, List, ListItem, Typography } from "@mui/material"
import ProductCard from "../home/ProductCard";
import { useContext } from "react";
import { ICartContext, CartContext } from "@/context/CartContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { APIProductsType } from "@/lib/apiDataTypes";

const RecentlyViewedContainer: React.FC = () => {

  const { handleAddToCart } = useContext(CartContext) as ICartContext;

  const { productList } = useRecentlyViewed()

  return (
    <Box 
      sx={{ 
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
        { productList && productList.map((product: APIProductsType) => (
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
        )) }
      </List>
    </Box>
  )
}

export default RecentlyViewedContainer