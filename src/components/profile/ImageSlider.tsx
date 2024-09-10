import { ImageType } from '@/lib/definitions';
import { Box } from '@mui/material';
import Image from 'next/image';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';

export default function ImageSlider({ imageUrls }: { imageUrls: ImageType[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function handlePrev() {
    if (currentSlide === 0) {
      setCurrentSlide(imageUrls.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  function handleNext() {
    if (currentSlide === imageUrls.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }

  function handleCurrentSlide(getCurrentIndex: number) {
    setCurrentSlide(getCurrentIndex);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '76px',
          gap: 2,
        }}
      >
        {imageUrls?.map((img, index) => (
          <Image
            src={img?.attributes?.url}
            alt={img?.attributes?.name}
            key={img?.id}
            width={76}
            height={76}
            style={{
              objectFit: 'cover',
              height: '100%',
              cursor: 'pointer',
              border: `${index === currentSlide ? '3px solid #f1c40f' : ''}`,
            }}
            onClick={() => handleCurrentSlide(index)}
          />
        ))}
      </Box>
      <Box sx={{ position: 'relative' }}>
        {imageUrls?.map(
          (img, index) =>
            index === currentSlide && (
              <Image
                key={img?.id}
                src={img?.attributes?.url}
                alt={img?.attributes?.name}
                width={588}
                height={628}
                style={{
                  maxWidth: '588px',
                  objectFit: 'cover',
                  height: '100%',
                }}
              />
            )
        )}
        <Box
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            bottom: '1%',
            right: '10%',
            cursor: 'pointer',
            ':hover': {
              opacity: '.5',
            },
          }}
        >
          <NavigateBeforeIcon />
        </Box>
        <Box
          onClick={handleNext}
          sx={{
            position: 'absolute',
            bottom: '1%',
            right: '2%',
            cursor: 'pointer',
            ':hover': {
              opacity: '.5',
            },
          }}
        >
          <NavigateNextIcon />
        </Box>
      </Box>
    </>
  );
}