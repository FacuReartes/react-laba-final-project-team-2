import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import image404 from '@/images/404-img.webp';

const pageText = {
  error: 'Error 404',
  paragraph:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modisoluta obcaecati sunt.',
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
        }}
      >
        <Box
          sx={{
            width: '100%',
            pt: '32px',
            bgcolor: 'grey.50',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2">{pageText.error}</Typography>
          <Typography
            sx={{
              width: '320px',
              textAlign: 'center',
              mt: '10px',
              color: 'grey.100',
            }}
          >
            {pageText.paragraph}
          </Typography>
        </Box>
        <Box sx={{ height: '65%' }}>
          <Image
            src={image404}
            alt="404-img"
            width={360}
            height={460}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            placeholder="blur"
            priority
          />
        </Box>

        {/* Buttons */}

        <Box
          sx={{
            height: '15%',
            width: '320px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: 'secondary.light',
              color: 'secondary.light',
              ':hover': { borderColor: 'secondary.light' },
              flexGrow: 1,
            }}
          >
            Go back
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'secondary.light',
              flexGrow: 1,
              ':hover': { bgcolor: 'secondary.light' },
            }}
          >
            <Link href={'/'} style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'common.white' }}>Home</Typography>
            </Link>
          </Button>
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
            <Button
              variant="outlined"
              sx={{
                borderColor: 'secondary.light',
                color: 'secondary.light',
                ':hover': { borderColor: 'secondary.light' },
                flexGrow: 1,
              }}
            >
              Go back
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'secondary.light',
                flexGrow: 1,
                ':hover': { bgcolor: 'secondary.light' },
              }}
            >
              <Link href={'/'} style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: 'common.white' }}>Home</Typography>
              </Link>
            </Button>
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
