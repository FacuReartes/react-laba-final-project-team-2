import React from 'react';
import { Box, Typography } from '@mui/material';
import { OrderType } from '@/lib/definitions';
import OrderProductsList from './OrderProductsList';
import InvoiceDownload from './InvoiceDownload';

interface Props {
  order: OrderType;
}

export default function OrderBody({ order }: Props) {
  return (
    <Box>
      <Box
        sx={{
          p: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          gap: { md: '40px', xs: '20px' },
          flexWrap: { xs: 'wrap', md: 'unset' },
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Delivery:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {`${order.delivery.address.line1},${order.delivery.address.city},${order.delivery.address.state}`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Contacts:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {`${order.delivery.name}, ${order.customer.phone}, ${order.customer.email}`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Payment:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {order.payment}
          </Typography>
        </Box>
      </Box>
      <OrderProductsList products={order.products} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '16px',
          flexDirection: order.invoicePDF ? 'row' : 'row-reverse',
        }}
      >
        {order.invoicePDF && <InvoiceDownload href={order.invoicePDF} />}
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Discount:
          </Typography>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#EB5656' }}
          >
            {order.discont}$
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
