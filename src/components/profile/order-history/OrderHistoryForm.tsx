'use client';

import { Box, Typography } from '@mui/material';
import OrderItem, { OrderType } from './OrderItem';

const OrderHistoryForm = ({ orders }: { orders: OrderType[] }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { md: '100%', xs: 'calc(100% - 40px)' },
        padding: { md: '40px 80px', xs: '20px ' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'common.black',
            fontSize: { xs: '30px', md: '45px' },
            fontWeight: '500',
          }}
        >
          Order history
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          mt: { md: '60px', xs: '30px' },
        }}
      >
        {orders.map(order => (
          <OrderItem key={`order-${order.id}`} order={order} />
        ))}
      </Box>
    </Box>
  );
};

export default OrderHistoryForm;
