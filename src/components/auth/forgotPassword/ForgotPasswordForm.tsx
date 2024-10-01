'use client';
import { Box, Backdrop } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';

import {
  APIErrorResponse,
  APISuccessResponse,
  forgotPasswordSchema,
} from '@/lib/schemas/authSchemas';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { env } from '../../../../env';
import Loading from '@/components/common/Loading';
import EmailInput from '../common/EmailInput';
import ActionButton from '../common/ActionButton';
import SecondaryActionButton from '../common/SecondaryActionButton';
import AuthPopup from '../common/AuthPopup';
import { ForgotPasswordFormInputs } from '@/lib/definitions';
import TitleAndSubtitle from '../common/TitleAndSubtitle';

const forgotPassword = async (email: string): Promise<APISuccessResponse> => {
  try {
    const response = axios.post(`${env.BASE_URL}/auth/forgot-password/`, {
      email,
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

const ForgotPasswordForm = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation: UseMutationResult<
    APISuccessResponse,
    Error,
    string,
    unknown
  > = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setOpenDialog(true);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const onSubmitHandler = (formData: ForgotPasswordFormInputs) => {
    mutation.mutate(formData.email);
  };

  const handleDialogOnClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Backdrop open={mutation.isPending} sx={{ zIndex: 99 }}>
        <Loading color="common.white" circularColor="secondary.main" />
      </Backdrop>
      <Box
        sx={{
          m: 'auto',
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: { md: '436px', xs: '320px' },
        }}
      >
        <TitleAndSubtitle
          title="Forgot password?"
          subtitle="Don’t worry, we’ll send you reset instructions."
        />
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <EmailInput register={register} errors={errors} />

          <Box
            maxWidth="436px"
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <ActionButton
              isLoading={mutation.isPending}
              text="Reset password"
            />
            <SecondaryActionButton
              btnText="Back to login"
              goto="/auth/sign-in"
            />
          </Box>
        </form>
        <AuthPopup
          openDialog={openDialog}
          setOpenDialog={handleDialogOnClose}
          title="Verify your email!"
          btnText1="Close"
          message="Check your email account to reset your password"
        />
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
