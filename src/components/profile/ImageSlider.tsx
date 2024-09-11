import { ImageType } from '@/lib/definitions';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useImageSlider from '@/hooks/useImageSlider';
import { Fragment } from 'react';

export default function ImageSlider({ imageUrls }: { imageUrls: ImageType[] }) {
  const { currentSlide, handleCurrentSlide, handleNext, handlePrev } =
    useImageSlider(imageUrls);

  const isDesktop = useMediaQuery('(min-width: 700px)');

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
              <Fragment key={img?.id}>
                <Image
                  src={img?.attributes?.url}
                  alt={img?.attributes?.name}
                  width={588}
                  height={628}
                  style={{
                    objectFit: 'cover',
                    display: isDesktop ? 'block' : 'none',
                  }}
                />
                <Image
                  src={img?.attributes?.url}
                  alt={img?.attributes?.name}
                  width={340}
                  height={360}
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    display: isDesktop ? 'none' : 'block',
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
