import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export interface DeleteDialogProps {
  open: boolean;
  selectedValue: boolean;
  onClose: (value: boolean) => void;
  message?: string;
}

export default function DeleteDialog({ open, onClose, message}: DeleteDialogProps) {

  const handleClose = (value: boolean) => {
    onClose(value);
  };

  const handleDeleteButtonClick = (value: boolean) => {
    onClose(value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      PaperProps={{
        sx: {
          maxWidth: '592px',
          height: '371px',
          p: '32px',
          position: 'relative',
        },
      }}
      sx={{ bgcolor: 'rgba(243, 243, 243, 0.8)' }}
    >
      <IconButton
        onClick={() => handleDeleteButtonClick(false)}
        sx={{ position: 'absolute', top: '32px', right: '32px' }}
        aria-hidden={true}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle variant="h1" sx={{ p: 0, fontSize: { lg: '45px', xs: '30px' } }}>
        {message || 'Are you sure to delete product image?'}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <DialogContentText
          variant="subtitle1"
          sx={{ mt: { lg: '56px', xs: '30px' } }}
        >
          Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi
          massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 0, height: '60px', gap: '30px' }}>
        <Button
          variant="outlined"
          onClick={() => handleDeleteButtonClick(false)}
          sx={{
            width: '100%',
            height: '100%',
            borderColor: 'secondary.light',
            color: 'secondary.light',
            ':hover': {
              bgcolor: 'secondary.main',
              border: 'none',
              color: 'common.white',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleDeleteButtonClick(true)}
          sx={{
            width: '100%',
            height: '100%',
            m: 0,
            color: 'common.white',
            border: 'none',
            bgcolor: 'secondary.light',
            ':hover': { bgcolor: 'secondary.main', border: 'none' },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
