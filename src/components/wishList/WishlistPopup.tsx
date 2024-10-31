import { Box, Button, Typography } from '@mui/material';
import Popup from '../common/Popup';
import SecondaryActionButton from '../auth/common/SecondaryActionButton';
import { useRouter } from 'next/navigation';

export default function WishlistPopup({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) {
  const router = useRouter();
  return (
    <Popup
      onClose={handleClose}
      open={open}
      title="Oops!"
      actions={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-end' },
            gap: 1,
          }}
        >
          <Button
            onClick={() => router.push('/auth/sign-in')}
            variant="outlined"
            sx={{
              color: 'secondary.light',
              borderColor: 'secondary.light',
              width: { xs: '90px', md: '145px' },
              height: { xs: '30px', md: '48px' },
              fontSize: '12px',
              ':hover': {
                borderColor: 'transparent',
                color: 'common.white',
                bgcolor: 'secondary.light',
              },
            }}
          >
            Sign in
          </Button>
          <SecondaryActionButton
            text="Don't have an account? "
            btnText="Sign up"
            goto="/auth/sign-up"
          />
        </Box>
      }
    >
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: '15px', md: '20px' }, color: 'grey.100' }}
      >
        It looks like you&apos;re not logged in. Please sign in to save items to
        your wishlist and easily access them later. If you don&apos;t have an
        account, creating one only takes a few seconds!
      </Typography>
    </Popup>
  );
}
