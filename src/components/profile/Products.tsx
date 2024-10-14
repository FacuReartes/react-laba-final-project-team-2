'use client';
import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import ProductsContainer from '@/components/profile/ProductsContainer';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import heroImage from '@/images/products-hero-img.webp';
import useGetProducts from '@/hooks/useGetProducts';
import useUserQuery from '@/hooks/useUserQuery';
import Loading from '../common/Loading';
import AddProductButton from './common/AddProductButton';

export default function Products() {
  const { data: session } = useSession();

  const token = session?.user.jwt;
  const userID = session?.user.user.id;

  const { data: userData } = useQuery(useUserQuery(token));

  const { data: products, isPending } = useQuery(useGetProducts(token, userID));

  return (
    <Box
      sx={{
        bgcolor: 'common.white',
        pb: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: {xs: '100px',sm: '150px', md: '200px', xl: '280px'} }}>
        <Image
          src={heroImage}
          alt="hero-img"
          style={{ objectFit: 'cover' }}
          priority
          fill
          placeholder="blur"
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs:'-40px' ,sm: '-50px', md: '-60px' },
            left: {xs: '20px', sm:'54px'},
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: { xs: '80px' , sm: '100px', md: '120px' },
              height: { xs: '80px', sm: '100px', md: '120px' },
            }}
            src={userData?.avatar?.url}
          />
          <Box
            sx={{
              mt: {xs: '30px', sm:'50px'},
              ml: {xs: '15px', sm: '26px'},
            }}
          >
            <Typography
              sx={{
                color: 'common.black',
                fontWeight: '500',
                fontSize: { xs: '16px', sm: '20px' },
              }}
            >
              {userData?.firstName} {userData?.lastName}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 1,
          mt: {xs: '60px', sm: '70px', md: '100px'},
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'common.black',
            fontSize: { xs: '30px', md: '45px' },
            fontWeight: '500',
            pl: { xs: '20px' },
          }}
        >
          My products
        </Typography>

        {/* Add Product Button for Desktop */}
        <AddProductButton
          display={{ xs: 'none', md: products?.length > 0 ? 'block' : 'none' }}
          dataTestId="add-product-1"
        />
      </Box>
      {isPending ? <Loading /> : <ProductsContainer products={products} />}
      <AddProductButton
        display={{ xs: products?.length > 0 ? 'block' : 'none', md: 'none' }}
        dataTestId="add-product-2"
      />
    </Box>
  );
}
