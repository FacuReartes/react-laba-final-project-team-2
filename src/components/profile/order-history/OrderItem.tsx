import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderHeader from './OrderHeader';
import OrderBody from './OrderBody';

export type OrderType = {
  id: number;
  date: string;
  status: string;
  products: {
    id: number;
    size: { id: number; value: number };
    quantity: number;
  }[];
  summary: number;
  discont: number;
  delivery: {
    id: number;
    company_name: string;
    company_address: string;
    company_contact: string;
  };
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  payment: string;
};
interface Props {
  order: OrderType;
}

export default function OrderItem({ order }: Props) {
  return (
    <Accordion
      disableGutters
      sx={{
        width: '100%',
        m: 0,
        boxShadow: 'none',
        '&::before': {
          display: 'none',
        },
        outline: 'none',

        backgroundColor: 'common.white',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          m: 0,
          p: 0,
        }}
      >
        <OrderHeader order={order} />
      </AccordionSummary>
      <AccordionDetails sx={{ m: 0, p: 0, mb: '12px' }}>
        <OrderBody order={order} />
      </AccordionDetails>
    </Accordion>
  );
}
