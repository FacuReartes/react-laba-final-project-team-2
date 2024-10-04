import { Button } from '@mui/material';

type Props = {
  isLoading: boolean;
  text: string;
};

export default function ActionButton({ isLoading, text }: Props) {
  return (
    <Button
      role="button"
      data-testid="action-button"
      type="submit"
      variant="contained"
      color="error"
      sx={{ color: 'common.white', width: '100%', height: '48px' }}
      disabled={isLoading}
    >
      {text}
    </Button>
  );
}
