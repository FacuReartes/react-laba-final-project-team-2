import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import DeleteDialog from './DeleteDialog';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  onDelete: () => void;
}

const ImageEdit = ({ src, alt, width, height, onDelete }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);

  const handleDeleteImage = () => {
    setOpenDialog(true);
  };

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };

  useEffect(() => {
    if (actionDialog) {
      onDelete();
    }
  }, [actionDialog, onDelete]);

  return (
    <Box
      sx={{ width: { xs: '280px', sm: width }, height, position: 'relative' }}
      data-testid='image-hover'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image src={src ?? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} alt={alt} fill role='img' />
      {isHover && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bgcolor: 'rgba(0,0,0,0.35)',
            top: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            data-testid='image-delete'
            onClick={handleDeleteImage}
            size="large"
            sx={{
              color: 'grey.200',
              bgcolor: 'common.white',
              ':hover': { color: 'common.white', bgcolor: 'secondary.light' },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <DeleteDialog
        selectedValue={actionDialog}
        open={openDialog}
        onClose={handleDialogOnClose}
      />
    </Box>
  );
};

export default ImageEdit;
