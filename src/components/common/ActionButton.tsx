'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

type Props = {
  isLoading?: boolean;
  text: string;
  goto?: string;
};

export default function ActionButton({ isLoading, text, goto }: Props) {
  const router = useRouter();
  return (
    <Button
      role="button"
      data-testid="action-button"
      type="submit"
      variant={text === 'View Order' ? 'outlined' : 'contained'}
      color="error"
      sx={{
        color: text === 'View Order' ? 'error.main' : 'common.white',
        width: { xs: '100%', md: '280px' },
        //width: { xs: '300px', md: '280px' },
        height: '61px',
        fontSize: { xs: '14px', md: '16px' },
      }}
      disabled={isLoading}
      onClick={() => {
        if (goto) {
          router.push(goto);
        }
      }}
    >
      {text}
    </Button>
  );
}
