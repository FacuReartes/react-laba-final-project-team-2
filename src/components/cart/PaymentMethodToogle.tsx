import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import PaymentMethodItem from './PaymentMethodItem';

interface Props {
  method: string;
  setMethod: (newValue: string) => void;
}

export default function PaymentMethodToogle({ method, setMethod }: Props) {
  const handleOnToggle = (
    event: React.MouseEvent<HTMLElement>,
    newMethod: string | null
  ) => {
    if (newMethod) {
      setMethod(newMethod);
    }
  };

  return (
    <ToggleButtonGroup
      value={method}
      exclusive
      onChange={handleOnToggle}
      aria-label="Payment Method"
      sx={{
        m: '20px 0',
        gap: '12px',
        '& .Mui-selected': {
          borderColor: 'secondary.light',
        },
        '& .MuiToggleButton-root': {
          borderRadius: '12px',
          backgroundColor: 'transparent',
        },
      }}
    >
      <PaymentMethodItem value="card" title="Card" src="/card.svg" />
      <PaymentMethodItem
        value="after-payment"
        title="After Payment"
        src="/after-payment.svg"
      />
    </ToggleButtonGroup>
  );
}
