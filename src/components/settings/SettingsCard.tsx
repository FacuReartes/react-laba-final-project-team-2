import { Avatar, Box, Button } from '@mui/material';

type SettingsCardProps = {
  onAvatarChange: (avatar: string | null) => void;
  avatar: string | null;
  uploadAvatar: (file: File) => void;
};

const SettingsCard: React.FC<SettingsCardProps> = ({
  onAvatarChange,
  avatar,
  uploadAvatar,
}) => {
  const handleChangePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const avatarUrl = event.target?.result as string;
          onAvatarChange(avatarUrl);
        };
        reader.readAsDataURL(file);
        uploadAvatar(file);
      }
    };
    input.click();
  };

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
        src={avatar || '/profile-circle.svg'}
        sx={{
          width: { xs: '100px', md: '150px' },
          height: { xs: '100px', md: '150px' },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Button
          type="button"
          variant="outlined"
          color="error"
          sx={{
            width: { xs: '117px', md: '152px' },
            height: { xs: '31px', md: '40px' },
            fontSize: { xs: '12px', md: '16px' },
          }}
          onClick={handleChangePhoto}
        >
          Change photo
        </Button>
        <Button
          type="button"
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
