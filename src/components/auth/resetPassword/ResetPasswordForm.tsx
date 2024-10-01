import { ResetPasswordFormData } from '@/lib/definitions';
import schema from '@/lib/schemas/resetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Backdrop } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { env } from '../../../../env';
import Loading from '@/components/common/Loading';
import PasswordInput from '../common/PasswordInput';
import ConfirmPasswordInput from '../common/ConfirmPasswordInput';
import ActionButton from '../common/ActionButton';
import SecondaryActionButton from '../common/SecondaryActionButton';
import AuthPopup from '../common/AuthPopup';

interface APISuccessResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface APIErrorResponse {
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
}

interface ResetPasswordVariables {
  code: string;
  password: string;
  passwordConfirmation: string;
}

const resetPassword = async ({
  code,
  password,
  passwordConfirmation,
}: ResetPasswordVariables) => {
  try {
    const response = axios.post(`${env.BASE_URL}/auth/reset-password`, {
      code,
      password,
      passwordConfirmation,
    });
    return (await response).data as APISuccessResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const apiError = error.response.data as APIErrorResponse;
      throw new Error(apiError.error.message || 'Failed to send reset email');
    } else {
      throw new Error('Something went wrong! Failed to send reset email');
    }
  }
};

const ResetPasswordForm = ({ code }: { code: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [dialogErrorMessage, setDialogErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation<
    APISuccessResponse,
    Error,
    ResetPasswordVariables
  >({
    mutationFn: resetPassword,
    onSuccess: () => {
      setOpenDialog(true);
    },
    onError: (error: Error) => {
      setDialogErrorMessage(error.message);
      setOpenErrorDialog(true);
    },
  });

  const onSubmitHandler = (formData: ResetPasswordFormData) => {
    mutation.mutate({
      password: formData.password,
      passwordConfirmation: formData.confirmPassword,
      code: code,
    });
  };

  const handleDialogOnClose = () => {
    setOpenDialog(false);
  };

  const handleErrorDialogOnClose = () => {
    setOpenErrorDialog(false);
  };

  return (
    <>
      <Backdrop open={mutation.isPending} sx={{ zIndex: 99 }}>
        <Loading color="common.white" circularColor="secondary.main" />
      </Backdrop>
      <Box
        sx={{
          width: { md: '50%', xs: '100%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { md: '288px', xs: '94px' },
          bgcolor: 'common.white',
        }}
      >
        <Typography
          variant={'h1'}
          sx={{ fontSize: { md: '45px', xs: '30px' } }}
        >
          Reset password
        </Typography>
        <Typography
          variant={'subtitle1'}
          sx={{ mb: '48px', pl: '20px', fontSize: { md: '15px', xs: '12px' } }}
        >
          Please create a new password here
        </Typography>

        <Box
          sx={{
            width: { md: '436px', xs: '320px' },
          }}
        >
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <PasswordInput register={register} errors={errors} />
            <ConfirmPasswordInput register={register} errors={errors} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                mt: '90px',
              }}
            >
              <ActionButton
                isLoading={mutation.isPending}
                text="Reset password"
              />
              <SecondaryActionButton
                btnText="Back to Login"
                goto="/auth/sign-in"
              />
            </Box>
          </form>
        </Box>
        <AuthPopup
          openDialog={openDialog}
          setOpenDialog={handleDialogOnClose}
          title="Password Changed!"
          goto1="/auth/sign-in"
          btnText1="Back to Login"
          message="Congrats, your password has been changed successfully."
        />

        <AuthPopup
          openDialog={openErrorDialog}
          setOpenDialog={handleErrorDialogOnClose}
          title="Password Reset Fail"
          btnText1="Close"
          message={dialogErrorMessage}
          btnText2="Back to Login"
          goto2="/auth/sign-in"
        />
      </Box>
    </>
  );
};

export default ResetPasswordForm;
