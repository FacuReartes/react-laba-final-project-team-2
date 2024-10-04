import { SingleFormInput } from '@/lib/definitions';
import { TextField } from '@mui/material';

export default function NameInput({ register, errors }: SingleFormInput) {
  return (
    <TextField
      label="Name *"
      variant="outlined"
      placeholder="Hayman Andrews"
      {...register('username')}
      error={Boolean(errors.username)}
      helperText={errors.username && errors.username.message}
    />
  );
}
