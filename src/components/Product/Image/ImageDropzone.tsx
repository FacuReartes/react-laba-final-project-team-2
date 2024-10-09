import React, { useCallback } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface ImageDropzoneProps {
  onFileAccepted?: (acceptedFiles: File[]) => void;
  onFileRejected?: (fileRejections: FileRejection[]) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileAccepted,
  onFileRejected,
}) => {
  const { control } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (onFileAccepted) {
        onFileAccepted(acceptedFiles);
      }
      if (onFileRejected) {
        onFileRejected(fileRejections);
      }
    },
    [onFileAccepted, onFileRejected]
  );

  return (
    <Controller
      control={control}
      name={'images'}
      render={({ field: { onChange, value } }) => (
        <Dropzone
          onDrop={(acceptedFiles: File[], fileRejections: FileRejection[]) => {
            onDrop(acceptedFiles, fileRejections);
            const newFiles = [...acceptedFiles, ...(value || [])];
            onChange(newFiles);
          }}
          accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <Box
              {...getRootProps()}
              sx={{
                width: { lg: '238px', xs: '240px' },
                height: '298px',
                padding: '40px',
                border: '1px dashed',
                borderColor: 'grey.100',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                m: 0,
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography variant="subtitle1">
                  Drop the images here ...
                </Typography>
              ) : (
                <Typography variant="subtitle1">
                  Drop your image here, or select click to browse
                </Typography>
              )}
            </Box>
          )}
        </Dropzone>
      )}
    />
  );
};

export default ImageDropzone;
