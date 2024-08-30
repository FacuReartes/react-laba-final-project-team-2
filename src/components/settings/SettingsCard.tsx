import { Avatar, Box, Button } from '@mui/material';

const SettingsCard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '76px',
        mt: '35px',
        mb: '49px',
      }}
    >
      <Avatar
        alt="profileAvatar"
        src="/avatar.svg"
        sx={{
          width: { xs: '100px', md: '150px' },
          height: { xs: '100px', md: '150px' },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Button
          type="submit"
          variant="outlined"
          color="error"
          sx={{
            width: { xs: '117px', md: '152px' },
            height: { xs: '31px', md: '40px' },
            fontSize: { xs: '12px', md: '16px' },
          }}
        >
          Change photo
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{
            color: '#fff',
            width: { xs: '117px', md: '152px' },
            height: { xs: '31px', md: '40px' },
            fontSize: { xs: '12px', md: '16px' },
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsCard;
