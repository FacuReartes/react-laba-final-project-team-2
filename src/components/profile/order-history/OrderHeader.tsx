import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { OrderType } from '@/lib/definitions';

interface Props {
  order: OrderType;
}

export default function OrderHeader({ order }: Props) {
  let status =
    order.status.toLocaleLowerCase() === 'succeeded'
      ? order.delivery.status.toLocaleLowerCase() === 'shipped'
        ? { icon: '/shipped.svg', label: 'Shipped', color: '#8C9196' }
        : order.delivery.status.toLocaleLowerCase() === 'received'
          ? { icon: '/received.svg', label: 'Received', color: '#3D9D41' }
          : order.delivery.status.toLocaleLowerCase() === 'canceled'
            ? { icon: '/canceled.svg', label: 'Canceled', color: '#CD3C37' }
            : {
                icon: '/waiting-payment.svg',
                label: 'Waiting',
                color: '#8C9196',
              }
      : { icon: '/waiting-payment.svg', label: 'Waiting', color: '#8C9196' };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: { md: 'unset', xs: 'wrap' },
        width: '100%',
        height: '56px',
        pr: { md: '30px', xs: '10px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: { md: '50%', xs: '100%' },
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            Nº {order.id.slice(15)}
          </Typography>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            {order.date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Products:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {order.products.reduce(
              (acc: number, product: any) => acc + product.quantity,
              0
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          width: { xs: '100%', md: '50%' },
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Summary:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {order.summary}$
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            width: '100px',
            justifyContent: 'flex-end',
          }}
        >
          {order.status !== '' && (
            <Image
              src={status.icon}
              alt={`order-${order.status}`}
              width={20}
              height={20}
            />
          )}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: status.color,
            }}
          >
            {status.label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
