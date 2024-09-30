import { Avatar, Box, Button, Skeleton } from '@mui/material';
import { useState } from 'react';

type SettingsCardProps = {
  uploadAvatar: (file: File) => void;
  avatarUrl: string | undefined;
  isPending: boolean;
  deleteAvatar: () => void;
  deleteIsPending: boolean;
  userIsPending: boolean;
};

const SettingsCard: React.FC<SettingsCardProps> = ({
  uploadAvatar,
  avatarUrl,
  isPending,
  deleteAvatar,
  deleteIsPending,
  userIsPending
}) => {
  const [avatar, setAvatar] = useState<string | null>(null);

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

          if (file.type.startsWith('image/')) {
            setAvatar(avatarUrl);
          } else {
            setAvatar(null);
            console.error('File is not an image');
          }
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
      { userIsPending ? 
        <Skeleton variant='circular' 
          sx={{
            width: { xs: '100px', md: '150px' },
            height: { xs: '100px', md: '150px' },
          }}
        />
        : 
        <Avatar
          alt="profileAvatar"
          src={avatar ? avatar : avatarUrl || ''}
          sx={{
            width: { xs: '100px', md: '150px' },
            height: { xs: '100px', md: '150px' },
          }}
        />
       }
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
          disabled={isPending}
        >
          Change photo
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          sx={{
            color: 'common.white',
            width: { xs: '117px', md: '152px' },
            height: { xs: '31px', md: '40px' },
            fontSize: { xs: '12px', md: '16px' },
          }}
          onClick={deleteAvatar}
          disabled={deleteIsPending}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsCard;
