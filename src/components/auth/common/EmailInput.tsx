import { SingleFormInput } from '@/lib/definitions';
import { TextField } from '@mui/material';

export default function EmailInput({ register, errors }: SingleFormInput) {
  return (
    <TextField
      label="Email *"
      variant="outlined"
      placeholder="example@mail.com"
      {...register('email')}
      error={Boolean(errors.email)}
      helperText={errors.email && errors.email.message}
    />
  );
}
