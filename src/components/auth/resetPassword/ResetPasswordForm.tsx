import { ResetPasswordFormData } from '@/lib/definitions';
import schema from '@/lib/schemas/resetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
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
    details: any;
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
  } catch (error: any) {
    throw new Error(
      (error.response.data as APIErrorResponse).error.message ||
        'Failed to reset password'
    );
  }
};

const ResetPasswordForm = ({ code }: { code: string }) => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

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
        width: isDesktop ? '960px' : '360px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: isDesktop ? '288px' : '94px',
        bgcolor: '#fff',
      }}
    >
      <Typography variant={isDesktop ? 'h1' : 'h2'}>Reset password</Typography>
      <Typography
        variant={isDesktop ? 'subtitle1' : 'subtitle2'}
        sx={{ mb: '48px', pl: '20px' }}
      >
        Please create a new password here
      </Typography>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: isDesktop ? '436px' : '320px',
        }}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          id="outlined-basic"
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
          id="outlined-basic"
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
            sx={{ color: '#fff', width: '100%', height: '48px' }}
          >
            Reset password
          </Button>
          <Link
            style={{
              textDecoration: 'none',
              color: '#494949',
              fontWeight: '500',
            }}
            href="/sign-in"
          >
            Back to login
          </Link>
        </Box>
      </form>
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
              color: '#ffffff',
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
              color: '#ffffff',
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
