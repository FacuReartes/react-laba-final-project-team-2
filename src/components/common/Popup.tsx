import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export interface PopupProps {
  title: string;
  open: boolean;
  onClose: (value: boolean) => void;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function Popup(props: PopupProps) {
  const { onClose, open, title, children, actions } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          width: '100%',
          maxwidth: { lg: '592px', xs: '256px' },
          p: '32px',
          position: 'relative',
        },
      }}
      sx={{ bgcolor: 'rgba(243, 243, 243, 0.8)' }}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: 'absolute', top: '32px', right: '32px' }}
        aria-hidden={true}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle
        variant="h1"
        sx={{
          p: 0,
          mr: { lg: '83px', xs: '38px' },
          fontSize: { lg: '45px', xs: '30px' },
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          mt: { lg: '56px', xs: '24px' },
          mb: { lg: '112px', xs: '48px' },
        }}
      >
        {children}
      </DialogContent>
      <DialogActions sx={{ p: 0, height: '60px', gap: '30px' }}>
        {actions}
      </DialogActions>
    </Dialog>
  );
}
