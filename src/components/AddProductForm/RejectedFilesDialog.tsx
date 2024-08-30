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

export interface RejectFilesDialogProps {
  open: boolean;
  selectedValue: boolean;
  onClose: (value: boolean) => void;
}

export default function RejectFilesDialog(props: RejectFilesDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleDeleteButtonClick = (value: boolean) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
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
        Wrong file extension
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <DialogContentText variant="subtitle1" sx={{ mt: { lg: '56px', xs: '20px' } }}>
          The file extension of following files are not allowed. Please upload only files with
          allowed extension: <br />
          .png
          <br />
          .jpeg
          <br />
          .jpg
          <br />
          .gif
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 0, height: '60px', gap: '30px' }}>
        <Button
          variant="outlined"
          onClick={() => handleDeleteButtonClick(false)}
          sx={{
            width: '100%',
            height: '100%',
            m: 0,
            color: '#ffffff',
            border: 'none',
            bgcolor: 'secondary.light',
            ':hover': { bgcolor: 'secondary.main', border: 'none' },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
