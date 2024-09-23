import { ImageType } from '@/lib/definitions';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useImageSlider from '@/hooks/useImageSlider';
import { Fragment } from 'react';

export default function ImageSlider({ imageUrls }: { imageUrls: ImageType[] }) {
  const {
    currentSlide,
    handleCurrentSlide,
    handleNext,
    handlePrev,
    hoverSlide,
    handleMouseMove,
    handleMouseLeave,
  } = useImageSlider(imageUrls);

  const isDesktop = useMediaQuery('(min-width: 600px)');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          flexWrap: 'wrap',
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
              cursor: 'pointer',
              border: `${index === hoverSlide ? '3px solid #F1C40F' : index === currentSlide ? '3px solid #F1C40F' : '3px solid transparent'}`,
              transition: 'border .3s ease',
            }}
            onClick={() => handleCurrentSlide(index)}
            onMouseMove={() => handleMouseMove(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: { sm: '588px' },
          height: { sm: '628px' },
        }}
      >
        {imageUrls?.map(
          (img, index) =>
            index === currentSlide && (
              <Fragment key={img?.id}>
                <Image
                  src={img?.attributes?.url}
                  alt={img?.attributes?.name}
                  width={588}
                  height={628}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: isDesktop ? 'block' : 'none',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    animation: 'fade-in 0.5s forwards',
                  }}
                />
                <Image
                  src={img?.attributes?.url}
                  alt={img?.attributes?.name}
                  width={340}
                  height={360}
                  style={{
                    width: '100%',
                    height: '360px',
                    objectFit: 'cover',
                    display: isDesktop ? 'none' : 'block',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    animation: 'fade-in 0.5s forwards',
                  }}
                />
              </Fragment>
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
