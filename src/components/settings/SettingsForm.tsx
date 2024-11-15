'use client';
import {
  Box,
  Button,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SettingsCard from './SettingsCard';
import { SettingsFormData } from '@/lib/definitions';
import {
  useInitializeForm,
  useSettingsForm,
} from '@/lib/schemas/settingsSchema';
import { useUpdateUser } from '@/hooks/profile/useUpdateUser';
import { useUploadAvatar } from '@/hooks/profile/useUploadAvatar';
import Popup from '../common/Popup';
import { useDeleteAvatar } from '@/hooks/profile/useDeleteAvatar';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import useUserQuery from '@/hooks/useUserQuery';

const SettingsForm = () => {
  const isMdUp = useMediaQuery('( min-width: 600px )');

  const session = useSession();
  const jwt = session.data?.user?.jwt;

  const { data: userData, isPending: userIsPending } = useQuery(
    useUserQuery(jwt)
  );

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

  return (
    <Box sx={{ display: {xs: 'flex', md:'block'}, justifyContent: {xs: 'center'}, width: '100%' }}>
      <Box
        sx={{
          width: { md: '436px', sm: '360px', xs: '320px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { md: '52px', xs: '24px' },
          pb: '91px',
          bgcolor: 'common.white',
          ml: {xs: 0, md: '10%', xl: '20%'}
        }}
      >
        <Typography
          variant={'h1'}
          sx={{
            alignSelf: 'flex-start',
            ml: { xs: '20px', sm: '34px', md: '29px' },
            fontSize: { md: '45px', xs: '30px' },
          }}
        >
          My Profile
        </Typography>
        <SettingsCard
          uploadAvatar={uploadAvatar}
          avatarUrl={userData?.avatar?.url}
          isPending={isPending}
          userIsPending={userIsPending}
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
        <Box sx={{ width: { md: '436px', xs: '300px', sm: '320px' } }}>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            onSubmit={handleSubmit(submitData)}
          >
            {userIsPending ? (
              <>
                <Skeleton height={56} />
                <Skeleton height={56} />
                <Skeleton height={56} />
                <Skeleton height={56} />
              </>
            ) : (
              <>
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
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{
                color: 'common.white',
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
          title="Information"
          actions={
            <Button
              fullWidth
              variant="contained"
              color="info"
              onClick={() => {
                setOpenDialog(false);
                setUploadDialog(false);
                setDeleteDialog(false);
              }}
            >
              Ok
            </Button>
          }
        >
          <Typography variant={isMdUp ? 'h6' : 'body1'}>
            {message || uploadMessage || deleteMessage}
          </Typography>
        </Popup>
      </Box>
    </Box>
  );
};

export default SettingsForm;
