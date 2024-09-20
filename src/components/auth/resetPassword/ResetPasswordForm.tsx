import { ResetPasswordFormData } from '@/lib/definitions';
import schema from '@/lib/schemas/resetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  TextField,
  Typography,
  DialogContentText,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from '@/components/common/Popup';
import axios from 'axios';

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
    const response = axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/reset-password',
      {
        code,
        password,
        passwordConfirmation,
      }
    );
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
      <Typography variant={'h1'} sx={{ fontSize: { md: '45px', xs: '30px' } }}>
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
          <TextField
            id="id-password"
            label="Password *"
            variant="outlined"
            placeholder="at least 8 characters"
            sx={{ height: '48px' }}
            {...register('password')}
          />
          {errors.password && (
            <Typography color="error">{errors.password.message}</Typography>
          )}
          <TextField
            id="id-confirm-password"
            label="Confirm Password *"
            variant="outlined"
            placeholder="at least 8 characters"
            sx={{ height: '48px' }}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <Typography color="error">
              {errors.confirmPassword.message}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              mt: '90px',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ color: 'common.white', width: '100%', height: '48px' }}
            >
              Reset password
            </Button>
            <Link
              style={{
                textDecoration: 'none',
                fontWeight: '500',
              }}
              href="/sign-in"
            >
              <Typography sx={{ color: 'grey.200' }}>Back to login</Typography>
            </Link>
          </Box>
        </form>
      </Box>
      <Popup
        open={openDialog}
        onClose={handleDialogOnClose}
        title="Password Changed!"
        actions={
          <Button
            variant="outlined"
            onClick={handleDialogOnClose}
            sx={{
              width: '100%',
              height: '100%',
              m: 0,
              color: 'common.white',
              border: 'none',
              bgcolor: 'secondary.light',
              ':hover': { bgcolor: 'secondary.main', border: 'none' },
            }}
            href="/auth/sign-in"
          >
            Back to Login
          </Button>
        }
      >
        {
          <DialogContentText variant="subtitle3">
            Congrats, your password has been changed successfully.
          </DialogContentText>
        }
      </Popup>
      <Popup
        open={openErrorDialog}
        onClose={handleErrorDialogOnClose}
        title="Password Reset Fail"
        actions={
          <Button
            variant="outlined"
            onClick={handleErrorDialogOnClose}
            sx={{
              width: '100%',
              height: '100%',
              m: 0,
              color: 'common.white',
              border: 'none',
              bgcolor: 'secondary.light',
              ':hover': { bgcolor: 'secondary.main', border: 'none' },
            }}
          >
            Close
          </Button>
        }
      >
        <DialogContentText variant="subtitle3">
          {dialogErrorMessage}
        </DialogContentText>
      </Popup>
    </Box>
  );
};

export default ResetPasswordForm;
