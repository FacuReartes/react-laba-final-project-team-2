import React, { FC } from 'react';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import Logo from '../../../../public/red-logo.svg';
import WhiteLogo from '../../../../public/white-logo.svg';
import Loading from '@/components/common/Loading';

interface AIButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const AIButton: FC<AIButtonProps> = ({ onClick, disabled }) => {
  const [logo, setLogo] = React.useState(Logo);
  return (
    <Button
      sx={{
        minWidth: '44px',
        width: '44px',
        backgroundColor: 'error.light',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '11px',
        padding: 0,
        py: '7px',
        px: '12px',
        cursor: 'pointer',
        borderRadius: '4px',
        boxShadow: 'none',
        transition: 'all 0.3s',
        overflow: 'hidden',
        '&:hover': {
          minWidth: '152px',
          px: '8px',
          background: 'linear-gradient(to right, #FE645E, #CD3C37)',
          '& .hover-text': {
            opacity: 1,
          }
        },
      }}
      onMouseEnter={() => setLogo(WhiteLogo)}
      onMouseLeave={() => setLogo(Logo)}
      onClick={onClick}
      variant="contained"
      disabled={disabled}
      role='ai-button'
    >
      {disabled ? (
        <Loading size={20} circularColor="#ee635e" message="" />
      ) : (
        <>
          <Typography
            variant="button"
            className='hover-text'
            sx={{
              color: 'common.white',
              fontSize: '12px',
              lineHeight: '14px',
              marginLeft: '8px',
              whiteSpace: 'nowrap',
              marginTop: '2px',
              opacity: 0,
              transition: 'all 0.3s',
              textDecorationLine: 'blink',
              textUnderlinePosition: '',
              position: 'relative',
              display: '',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '1px',
                backgroundColor: 'currentColor',
                transform: 'scaleX(0)',
                transition: 'all 0.3s ease-in-out',
                transformOrigin: 'left',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
              },
            }}
          >
            Use AI suggestion
          </Typography>
          <Image src={logo} alt="AI" width={20} height={20} />
        </>
      )}
    </Button>
  );
};

export default AIButton;
