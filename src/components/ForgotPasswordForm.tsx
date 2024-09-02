import { Box, Button, TextField, Typography, InputLabel } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { forgotPasswordSchema } from '@/lib/schemas/authSchemas';

type ForgotPasswordSchemaProps = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaProps>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmitHandler = (formData: ForgotPasswordSchemaProps) => {
    console.log(formData);
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
    </Box>
  );
};

export default ForgotPasswordForm;
