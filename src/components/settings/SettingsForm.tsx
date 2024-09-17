'use client';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SettingsCard from './SettingsCard';
import { SettingsFormData } from '@/lib/definitions';
import {
  useInitializeForm,
  useSettingsForm,
} from '@/lib/schemas/settingsSchema';
import { useSession } from 'next-auth/react';
import { useUserData } from '@/hooks/useUserData';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { useUploadAvatar } from '@/hooks/useUploadAvatar';
import Popup from '../common/Popup';
import { useDeleteAvatar } from '@/hooks/useDeleteAvatar';
import { IUser } from '@/lib/next-auth';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const SettingsForm = ({ initialUserData }: { initialUserData: IUser }) => {
  const session = useSession();
  const jwt = session.data?.user.jwt;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialUserData) {
      queryClient.setQueryData(['user'], initialUserData);
    }
  }, [initialUserData, queryClient]);

  const { data: userData } = useUserData(jwt);

  const {
    mutate: updateUser,
    openDialog,
    setOpenDialog,
    message,
  } = useUpdateUser(userData?.id, jwt);

  const {
    mutate: uploadAvatar,
    avatarData,
    setOpenDialog: setUploadDialog,
    message: uploadMessage,
    openDialog: uploadOpenDialog,
    isPending,
  } = useUploadAvatar(jwt);

  const {
    mutate: deleteAvatar,
    openDialog: deleteOpenDialog,
    message: deleteMessage,
    isPending: deleteIsPending,
    setOpenDialog: setDeleteDialog,
  } = useDeleteAvatar(jwt, userData?.avatar?.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useSettingsForm(userData as SettingsFormData);

  useInitializeForm(userData as SettingsFormData, reset);

  const submitData = (data: SettingsFormData) => {
    const updatedData = { ...data };
    if (avatarData) {
      updatedData.avatar = avatarData;
    }
    updateUser(updatedData);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const getLeftMargin = () => {
    if (isSmallScreen) return '0px';
    if (isMediumScreen) return '10%';
    if (isLargeScreen) return '20%';
    return '0px';
  };

  return (
    <Box
      sx={{
        width: { md: '436px', xs: '360px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { md: '52px', xs: '24px' },
        pb: '91px',
        bgcolor: '#fff',
        ml: getLeftMargin(),
        transition: 'margin-left 0.3s ease-in-out',
      }}
    >
      <Typography
        variant={'h1'}
        sx={{
          alignSelf: 'flex-start',
          ml: { xs: '34px', md: '29px' },
          fontSize: { md: '45px', xs: '30px' },
        }}
      >
        My Profile
      </Typography>
      <SettingsCard
        uploadAvatar={uploadAvatar}
        avatarUrl={userData?.avatar?.url}
        isPending={isPending}
        deleteAvatar={deleteAvatar}
        deleteIsPending={deleteIsPending}
      />
      <Typography
        variant={'subtitle1'}
        sx={{
          mb: '48px',
          px: { xs: '20px', md: '0' },
          fontSize: { md: '15px', xs: '12px' },
        }}
      >
        Welcome back! Please enter your details to log into your account.
      </Typography>
      <Box sx={{ width: { md: '436px', xs: '320px' } }}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
          onSubmit={handleSubmit(submitData)}
        >
          <TextField
            variant="outlined"
            placeholder="Name"
            {...register('firstName')}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
          <TextField
            variant="outlined"
            placeholder="Surname"
            {...register('lastName')}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
          <TextField
            variant="outlined"
            placeholder="example@mail.com"
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            disabled
          />
          <TextField
            variant="outlined"
            placeholder="(949) 354-2574"
            {...register('phoneNumber')}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{
              color: '#fff',
              width: '152px',
              height: '40px',
              mt: '56px',
              alignSelf: 'flex-end',
            }}
            disabled={!isDirty && !avatarData}
          >
            Save changes
          </Button>
        </form>
      </Box>
      <Popup
        open={openDialog || uploadOpenDialog || deleteOpenDialog}
        onClose={() => {
          setOpenDialog(false);
          setUploadDialog(false);
          setDeleteDialog(false);
        }}
        title={message || uploadMessage || deleteMessage}
        actions={
          <Button
            variant="contained"
            color={'info'}
            onClick={() => {
              setOpenDialog(false);
              setUploadDialog(false);
              setDeleteDialog(false);
            }}
          >
            Ok
          </Button>
        }
      ></Popup>
    </Box>
  );
};

export default SettingsForm;
