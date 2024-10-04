import { SignInFormInputs } from '@/lib/definitions';
import { Checkbox, FormControlLabel } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<SignInFormInputs>;
};

export default function RememberMeInput({ register }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...register('rememberMe')}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: { md: '16px', xs: '12px' },
            },
          }}
        />
      }
      label="Remember me"
      sx={{
        '& .MuiFormControlLabel-label': {
          fontSize: { md: '16px', xs: '10px' },
          ml: '-6px',
        },
      }}
    />
  );
}
