import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// type Props = {}

const SignupCard = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '756px',
        height: '317px',
        backgroundImage:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, #FFFFFF 100%)',
        borderRadius: '16px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h3" sx={{ p: '57px 137px 24px 69px' }}>
        Lorem Ipsum is a really great company because the team is passionate
        about the projects they produce, the people they work with, the quality
        of the work they do.
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          right: '45px',
          top: '63px',
          width: '108px',
          height: '38px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <ArrowBackIosIcon sx={{ cursor: 'pointer' }} />
        <ArrowForwardIosIcon sx={{ cursor: 'pointer' }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Typography variant="h3" sx={{ fontWeight: '700', pl: '69px' }}>
          John Stone
        </Typography>
        <StarIcon color="error" />
        <StarIcon color="error" />
        <StarIcon color="error" />
        <StarIcon color="error" />
        <StarIcon color="error" />
      </Box>
      <Typography variant="subtitle1" sx={{ pl: '69px' }}>
        Ukraine, Chernivtsi
      </Typography>
    </Box>
  );
};

export default SignupCard;
