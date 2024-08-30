import React, { useCallback } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

interface ImageDropzoneProps {
  onFileAccepted?: (acceptedFiles: File[]) => void;
  onFileRejected?: (fileRejections: FileRejection[]) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onFileAccepted, onFileRejected }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      if (onFileAccepted) {
        onFileAccepted(acceptedFiles);
      }
      if (onFileRejected) {
        onFileRejected(fileRejections);
      }
    },
    [onFileAccepted, onFileRejected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        width: { lg: '238px', xs: 'calc(100% - 42px)' },
        height: '298px',
        padding: '40px',
        border: '1px dashed #5C5C5C',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        m: 0,
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="subtitle1">Drop the images here ...</Typography>
      ) : (
        <Typography variant="subtitle1">Drop your image here, or select click to browse</Typography>
      )}
    </Box>
  );
};

export default ImageDropzone;
