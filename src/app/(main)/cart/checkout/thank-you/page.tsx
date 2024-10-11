import ActionButton from '@/components/common/ActionButton';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import imageThankYou from '@/images/thank-you.webp';

type Props = {
  searchParams: {
    payment_intent: string;
  };
};

export default function Page({ searchParams }: Props) {
  const paymentIntentId = searchParams.payment_intent.slice(15);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { lg: '80px', xl: '109px' },
        px: { xs: '10px', md: '20px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', lg: 'start' },
          gap: { xs: '30px', md: '70px' },
          mt: { xs: '90px', lg: '80px' },
          width: { xs: '90%', sm: '600px', xl: '827px' },
          textAlign: { xs: 'center', md: 'none' },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '40px', lg: '80px', xl: '140px' },
              fontWeight: '900',
              lineHeight: { xs: '70px', lg: '120px', xl: '164px' },
            }}
          >
            THANK YOU
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '24px', xl: '48px' },
              lineHeight: { xs: '28px', xl: '56px' },
            }}
            variant={'h5'}
          >
            for your order{' '}
            <span
              style={{
                color: '#FE645E',
                fontStyle: 'normal',
                fontWeight: '500',
              }}
            >
              {paymentIntentId}
            </span>
          </Typography>
        </Box>
        <Typography
          sx={{
            lineHeight: { xs: '30px', xl: '40px' },
          }}
          variant="h6"
        >
          Your order has been received and is currently being processed. You
          will receive an email confirmation with your order details shortly.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '30px',
            width: '100%',
          }}
        >
          <ActionButton text="View Order" />
          <ActionButton text="Continue Shopping" goto="/" />
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', lg: 'flex' }, mt: '244px' }}>
        <Image
          src={imageThankYou}
          alt="thank you"
          width={494}
          height={450}
          placeholder="blur"
          priority
        />
      </Box>
    </Box>
  );
}
