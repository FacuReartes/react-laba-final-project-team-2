'use client';
import { useMemo } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import ProductsContainer from '@/components/profile/ProductsContainer';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import heroImage from '@/images/products-hero-img.webp';
import useGetProducts from '@/hooks/products/useGetProducts';
import useUserQuery from '@/hooks/useUserQuery';
import Loading from '../common/Loading';
import AddProductButton from './common/AddProductButton';

export default function Products() {
  const { data: session } = useSession();
  const token = useMemo(() => session?.user.jwt, [session]);
  const userID = useMemo(() => session?.user.user.id, [session]);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery(useUserQuery(token));

  const {
    data: products,
    isPending,
    isError: productsError,
  } = useQuery(useGetProducts(token, userID));

  if (userLoading || isPending) return <Loading />;
  if (userError || productsError)
    return <Typography color="error">Error loading data</Typography>;

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
      {/* Hero Image and User Info */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '100px', sm: '150px', md: '200px', xl: '280px' },
        }}
      >
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
            bottom: { xs: '-40px', sm: '-50px', md: '-60px' },
            left: { xs: '20px', sm: '54px' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: { xs: '80px', sm: '100px', md: '120px' },
              height: { xs: '80px', sm: '100px', md: '120px' },
            }}
            src={userData?.avatar?.url}
            alt={`${userData?.username}'s avatar`}
          />
          <Box
            sx={{
              mt: { xs: '30px', sm: '50px' },
              ml: { xs: '15px', sm: '26px' },
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

      {/* Products Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 1,
          mt: { xs: '60px', sm: '70px', md: '100px' },
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
        {products?.length > 0 && (
          <AddProductButton display={{ xs: 'none', md: 'block' }} />
        )}
      </Box>

      {/* Conditional Rendering of Products or Loading section */}
      {isPending ? <Loading /> : <ProductsContainer products={products} />}

      {/* Add Product Button for Mobile */}
      {products?.length > 0 && (
        <AddProductButton display={{ xs: 'block', md: 'none' }} />
      )}
    </Box>
  );
}
