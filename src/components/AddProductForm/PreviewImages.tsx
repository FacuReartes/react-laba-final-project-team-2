import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageDropzone from '../ImageDropzone';
import { FileRejection } from 'react-dropzone';
import ImageEdit from './ImageEdit';

interface Props {
  gallery: File[];
  onFileAccepted?: (acceptedFiles: File[]) => void;
  onFileRejected?: (fileRejections: FileRejection[]) => void;
  onDelete: (index: number) => void;
}

function PreviewImages({
  gallery,
  onFileAccepted,
  onFileRejected,
  onDelete,
}: Props) {
  const [tempImgUrls, setTempImgUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = gallery.map(file => URL.createObjectURL(file));
    setTempImgUrls(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [gallery]);

  return (
    <Box sx={{}}>
      <Grid container spacing={{ lg: '54px', xs: '20px' }}>
        {tempImgUrls.map((url, index) => (
          <Grid item key={`key-${index}-${url}`}>
            <ImageEdit
              src={url}
              alt={`Preview for image ${index}`}
              width={320}
              height={380}
              onDelete={() => onDelete(index)}
            />
          </Grid>
        ))}
        <Grid item>
          <ImageDropzone
            onFileAccepted={onFileAccepted}
            onFileRejected={onFileRejected}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PreviewImages;
