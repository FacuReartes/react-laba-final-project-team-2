'use client';
import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import ProductsContainer from '@/components/profile/ProductsContainer';
import { useSession } from 'next-auth/react';
import { useUserData } from '@/hooks/useUserData';
import { useRouter } from 'next/navigation';
import useGetProducts from '@/hooks/useGetProducts';
import { useQuery } from '@tanstack/react-query';
import heroImage from '@/images/products-hero-img.webp';

export default function Products() {
  const { data: session } = useSession();

  const token = session?.user.jwt;
  const userID = session?.user.user.id;

  const { data: userData } = useUserData(token);

  const router = useRouter();

  const { data: products } = useQuery(useGetProducts(token, userID));

  const isDesktop = useMediaQuery('(min-width: 700px)');
  // type MockUser = {
  //   totalPoints: number;
  // };

  // const mockUser: MockUser = {
  //   totalPoints: 1374,
  // };

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
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Image
          src={heroImage}
          alt="hero-img"
          width={700}
          height={isDesktop ? 262 : 132}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          priority
          placeholder="blur"
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '-35%', md: '-25%' },
            left: '54px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: { xs: '60px', md: '120px' },
              height: { xs: '60px', md: '120px' },
            }}
            src={userData?.avatar?.url}
          />
          <Box
            sx={{
              alignSelf: 'flex-end',
              ml: '26px',
              mb: '15px',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'common.black',
                fontWeight: '500',
                fontSize: { xs: '14px', md: '20px' },
              }}
            >
              {userData?.firstName} {userData?.lastName}
            </Typography>
            {/* <Typography
              color={'#5C5C5C'}
              sx={{ fontSize: { xs: '12px', md: '15px' } }}
            >
              {mockUser.totalPoints} bonus points
            </Typography> */}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 1,
          mt: '120px',
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

        <Button
          onClick={() => router.push('/profile/products/add-product')}
          variant="contained"
          disableElevation
          size="large"
          sx={{
            display: {
              xs: 'none',
              md: products?.length > 0 ? 'block' : 'none',
            },
            bgcolor: 'secondary.light',
            color: 'common.white',
            height: '40px',
            textTransform: 'capitalize',
            transition: 'opacity .2s ease',
            ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
            borderRadius: 2,
            mr: { md: '20px' },
          }}
        >
          Add product
        </Button>
      </Box>
      <ProductsContainer products={products} />
    </Box>
  );
}
