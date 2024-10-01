'use client'
import { ResetPasswordFormData } from '@/lib/definitions';
import schema, {
  APIErrorResponse,
  ResetPasswordVariables,
} from '@/lib/schemas/resetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Backdrop } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { env } from '../../../../env';
import Loading from '@/components/common/Loading';
import PasswordInput from '../common/PasswordInput';
import ConfirmPasswordInput from '../common/ConfirmPasswordInput';
import ActionButton from '../common/ActionButton';
import SecondaryActionButton from '../common/SecondaryActionButton';
import AuthPopup from '../common/AuthPopup';
import TitleAndSubtitle from '../common/TitleAndSubtitle';

const BoxContainerStyles = {
  width: { md: '960px', xs: '360px' },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pt: { md: '208px', xs: '94px' },
  bgcolor: 'common.white',
};

const BoxInputStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  mt: '90px',
};

const ResetPasswordForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [dialogErrorMessage, setDialogErrorMessage] = useState('');
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get('code'))
  }, [])
  
  const resetPassword = async ({
    password,
    passwordConfirmation,
  }: ResetPasswordVariables) => {
    try {
      const response = await fetch(`${env.BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation,
        }),
      });
  
      if (!response.ok) {
        const apiError: APIErrorResponse = await response.json();
        throw new Error(apiError.error.message || 'Failed to send reset email');
      }
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      throw new Error('Something went wrong! Failed to send reset email');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });
  
  const mutation = useMutation<
    void,
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
      <Box sx={BoxContainerStyles}>
        <TitleAndSubtitle
          title="Reset password"
          subtitle="Please create a new password here"
        />

        <Box sx={{ width: { md: '436px', xs: '320px' } }}>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <PasswordInput register={register} errors={errors} />
            <ConfirmPasswordInput register={register} errors={errors} />

            <Box sx={BoxInputStyles}>
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
