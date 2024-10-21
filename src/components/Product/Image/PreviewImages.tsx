import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageDropzone from './ImageDropzone';
import { FileRejection } from 'react-dropzone';
import ImageEdit from './ImageEdit';

interface Props {
  gallery: (File | { id: number; attributes: { url: string } })[];
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
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  useEffect(() => {
    const urls = (gallery || []).map(file => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return file.attributes.url;
    });
    setTempImgUrls(urls);

    return () => {
      urls.forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [gallery]);

  const handleDelete = (index: number) => {
    if (deletingIndex !== null) return;

    setDeletingIndex(index);

    onDelete(index);

    setTimeout(() => {
      setDeletingIndex(null);
    }, 1000);
  };

  return (
    <Box sx={{}}>
      <Grid container spacing={{ lg: '54px', xs: '20px' }} sx={{ justifyContent: { lg: 'end', xs: 'center' }}}>
        {tempImgUrls.map((url, index) => (
          <Grid item key={`key-${index}-${url}`}>
            <ImageEdit
              src={url}
              alt={`Preview for image ${index}`}
              width={320}
              height={380}
              onDelete={() => handleDelete(index)}
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
