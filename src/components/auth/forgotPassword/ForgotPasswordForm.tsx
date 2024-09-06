import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  DialogContentText,
} from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';

import { forgotPasswordSchema } from '@/lib/schemas/authSchemas';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import Popup from '@/components/common/Popup';

type ForgotPasswordSchemaProps = z.infer<typeof forgotPasswordSchema>;

interface APISuccessResponse {
  ok: boolean;
  message?: string;
}

interface APIErrorResponse {
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
}

const forgotPassword = async (email: string): Promise<APISuccessResponse> => {
  try {
    const response = axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/forgot-password/',
      {
        email,
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

const ForgotPasswordForm = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaProps>({
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

  const onSubmitHandler = (formData: ForgotPasswordSchemaProps) => {
    mutation.mutate(formData.email);
  };

  const handleDialogOnClose = () => {
    setOpenDialog(false);
  };

  return (
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
      <Typography variant="h1">Forgot password?</Typography>
      <Typography variant="subtitle3" sx={{ marginBottom: 4 }}>
        Don’t worry, we’ll send you reset instructions.
      </Typography>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Box>
          <InputLabel htmlFor="id-email" sx={{ mb: 1 }}>
            Email<span style={{ color: 'red', marginLeft: '5px' }}>*</span>
          </InputLabel>
          <TextField
            id="id-email"
            variant="outlined"
            placeholder="Enter your email"
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message as string}
            fullWidth
          />
        </Box>

        <Box
          maxWidth="436px"
          sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              p: 2,
              color: '#ffffff',
              bgcolor: 'secondary.light',
              fontSize: '16px',
            }}
            color="secondary"
          >
            Reset password
          </Button>
          <Link
            href="/auth/sign-in"
            style={{
              margin: 'auto',
              textDecoration: 'none',
              color: '#494949',
              fontSize: '15px',
            }}
          >
            Back to log in
          </Link>
        </Box>
      </form>
      <Popup
        open={openDialog}
        onClose={handleDialogOnClose}
        title="Verify your email!"
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
          >
            Close
          </Button>
        }
      >
        <DialogContentText variant="subtitle3">
          Check your email accont to reset your password
        </DialogContentText>
      </Popup>
    </Box>
  );
};

export default ForgotPasswordForm;