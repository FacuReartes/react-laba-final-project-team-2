import { useShowPassword } from '@/hooks/common/useShowPassword';
import { SingleFormInput } from '@/lib/definitions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

export default function PasswordInput({ register, errors }: SingleFormInput) {
  const { handleClickShowPassword, showPassword } = useShowPassword();

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label="Password *"
      variant="outlined"
      placeholder="at least 8 characters"
      {...register('password')}
      error={Boolean(errors.password)}
      helperText={errors.password && errors.password.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
