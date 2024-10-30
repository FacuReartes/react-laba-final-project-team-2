import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';

export default function UserNotification({
  open,
  handleClose,
  message,
  type,
}: {
  open: boolean;
  handleClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  message: string;
  type: AlertColor & AlertPropsColorOverrides;
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
