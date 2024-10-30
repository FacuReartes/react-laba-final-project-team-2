import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import image404 from '@/images/404-img.webp';
import GoBackButton from '@/components/common/GoBackButton';

const pageText = {
  error: 'Error 404',
  paragraph: 'The page that youre looking for is missing.',
};

export default function NotFoundPage() {
  return (
    <Box>
      {/* mobile design */}
      <Box
        sx={{
          height: '100vh',
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.50',
        }}
      >
        <Box
          sx={{
            width: '100%',
            pt: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '320px',
          }}
        >
          <Typography variant="h2">{pageText.error}</Typography>
          <Typography
            sx={{
              textAlign: 'center',
              mt: '10px',
              color: 'grey.100',
            }}
          >
            {pageText.paragraph}
          </Typography>
        </Box>
        <Box>
          <Image
            src={image404}
            alt="404-img"
            width={360}
            height={460}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            placeholder="blur"
            priority
          />
        </Box>

        {/* Buttons */}

        <Box
          sx={{
            mt: 4,
            width: '320px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GoBackButton text="Go back" />
          <Link href={'/'}>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'secondary.light',
                flexGrow: 1,
                ':hover': { bgcolor: 'secondary.light' },
              }}
            >
              <Typography sx={{ color: 'common.white' }}>Home</Typography>
            </Button>
          </Link>
        </Box>
      </Box>

      {/* desktop design */}

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          overflow: 'hidden',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: '320px',
          }}
        >
          <Typography variant="h2">{pageText.error}</Typography>
          <Typography
            sx={{
              width: '450px',
              textAlign: 'center',
              mt: '10px',
              color: 'grey.100',
            }}
          >
            {pageText.paragraph}
          </Typography>
          <Box
            sx={{
              width: '320px',
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              mt: '16px',
            }}
          >
            <GoBackButton text="Go back" />
            <Link href={'/'}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'secondary.light',
                  flexGrow: 1,
                  ':hover': { bgcolor: 'secondary.light' },
                }}
              >
                <Typography sx={{ color: 'common.white' }}>Home</Typography>
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ width: '50%' }}>
          <Image
            src={image404}
            alt="404-img"
            width={960}
            height={960}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            placeholder="blur"
            priority
          />
        </Box>
      </Box>
    </Box>
  );
}
