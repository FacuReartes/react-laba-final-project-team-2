'use client';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import ActionButton from '../common/ActionButton';
import { usePathname } from 'next/navigation';

interface SummaryProps {
  subtotal: number;
  loading: boolean;
}

function Summary({ subtotal, loading }: SummaryProps) {
  const shipping: number = subtotal === 0 ? 0 : 20;
  const tax: number = 0;
  const fixedSubtotal: number = Number(subtotal.toFixed(2));
  const total: number = fixedSubtotal + shipping + tax;
  const session = useSession();
  const userId = session?.data?.user?.user?.id;
  const isCart = usePathname();

  return (
    <Box
      sx={{
        width: { xs: 'auto', xl: '399px' },
        ml: { xs: '0px', md: '30px', lg: '100px', xl: '166px' },
        height: { xs: 'auto', md: '0%' },
      }}
    >
      <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
      <Typography
        sx={{
          mt: { xs: '12px', md: '0px' },
          mb: { xs: '12px', md: '50px' },
          ml: { xs: '20px', sm: '125px', md: '0px' },
          fontWeight: 500,
          lineHeight: { xs: '35.19px', md: '52.79px' },
          fontSize: { xs: '30px', md: '45px' },
        }}
      >
        Summary
      </Typography>
      <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
      <Box
        sx={{
          px: { xs: '20px', sm: '125px', md: '0px' },
          mt: { xs: '32px', md: '0px' },
        }}
      >
        <Typography
          sx={{
            lineHeight: { xs: '18.77px', md: '23.46px' },
            fontSize: { xs: '16px', md: '20px' },
          }}
        >
          Do you have a promo code?
        </Typography>

        <Box
          sx={{
            mt: { xs: '32px', md: '36px' },
            mb: { xs: '28px', md: '45px' },
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {loading ? (
            <>
              <Skeleton
                sx={{ fontSize: { xs: '20px', md: '30px' }, width: '100%' }}
                variant="text"
              />
              <Skeleton
                sx={{ fontSize: { xs: '20px', md: '30px' }, width: '100%' }}
                variant="text"
              />
              <Skeleton
                sx={{ fontSize: { xs: '20px', md: '30px' }, width: '100%' }}
                variant="text"
              />
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{
                    lineHeight: { xs: '23.46px', md: '35.19px' },
                    fontSize: { xs: '20px', md: '30px' },
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    lineHeight: { xs: '23.46px', md: '35.19px' },
                    fontSize: { xs: '20px', md: '30px' },
                  }}
                >
                  ${fixedSubtotal}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{
                    lineHeight: { xs: '23.46px', md: '35.19px' },
                    fontSize: { xs: '20px', md: '30px' },
                  }}
                >
                  Shipping
                </Typography>
                <Typography
                  sx={{
                    lineHeight: { xs: '23.46px', md: '35.19px' },
                    fontSize: { xs: '20px', md: '30px' },
                  }}
                >
                  ${shipping}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{
                    lineHeight: { xs: '23.46px', md: '35.19px' },
                    fontSize: { xs: '20px', md: '30px' },
                  }}
                >
                  Tax
                </Typography>
                <Typography
                  sx={{
                    lineHeight: { xs: '23.46px', md: '35.19px' },
                    fontSize: { xs: '20px', md: '30px' },
                  }}
                >
                  ${tax}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Divider />
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', my: '19px' }}
        >
          {loading ? (
            <Skeleton
              sx={{ fontSize: { xs: '20px', md: '30px' }, width: '100%' }}
              variant="text"
            />
          ) : (
            <>
              <Typography
                sx={{
                  fontWeight: 600,
                  lineHeight: { xs: '23.46px', md: '35.19px' },
                  fontSize: { xs: '20px', md: '30px' },
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  lineHeight: { xs: '23.46px', md: '35.19px' },
                  fontSize: { xs: '20px', md: '30px' },
                }}
              >
                ${total}
              </Typography>
            </>
          )}
        </Box>

        <Divider />
        {isCart === '/cart' && (
          <ActionButton
            isLoading={loading || total === 0}
            text="Checkout"
            goto={`/cart/checkout?total=${total}&userId=${userId}`}
          />
        )}
      </Box>
    </Box>
  );
}

export default Summary;
