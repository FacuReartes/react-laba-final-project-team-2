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
  selectedValue?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

export default function DeleteDialog({ open, onClose, onConfirm, message }: DeleteDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const handleDeleteButtonClick = () => {
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        onClick={handleClose}
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
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 0, height: '60px', gap: '30px' }}>
        <Button
          variant="outlined"
          onClick={handleClose}
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
          onClick={handleDeleteButtonClick}
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
